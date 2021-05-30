import { Feather } from "@expo/vector-icons";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Platform, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import styles from "./styles";

interface IProps {
  navigation: any
  route: any
}

interface IItens {
  id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}


export default function ListProduct({ route, navigation }: IProps) {
  const { categoryId } = route.params;

  const [category, setCategory] = useState<IItens>();
  const [products, setProducts] = useState<IItens[]>([]);

  async function populateProduct() {
    axios.get(`http://localhost:3001/search/category/${categoryId}`).then(res => {
      const productsData = res.data.products;
      const categoryData = res.data;
      delete categoryData.products
      setCategory(categoryData)
      setProducts(productsData)
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      populateProduct()
    });

    return unsubscribe;
  }, [navigation]);

  async function deleteProduct(id: string) {
    await axios.delete(`http://localhost:3001/manage/product/${id}`)
      .then(() => {
        if (Platform.OS === 'web') {
          alert("Produto excluido com sucesso!!")
          populateProduct()
          return
        }

        Alert.alert(
          "Sucesso",
          "Produto excluido com sucesso!!",
          [
            {
              text: "",
              onPress: () => { },
            },
            { text: "OK", onPress: () => populateProduct() },
          ],
          { cancelable: false }
        );
      })
      .catch(err => {
        let message = err.response.data.message || 'Não foi possivel excluir';
        if (Platform.OS === 'web') {
          alert(message)
          return
        }

        Alert.alert("Erro", `${message}`, [
          {
            text: "Ok",
            onPress: () => { },
            style: "cancel",
          },
        ]);
      })
  }

  return (<ScrollView horizontal showsVerticalScrollIndicator={false} >
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Categoria: {category?.description}</Text>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('CreateProduct', { categoryId })}
        >Criar novo produto</TouchableOpacity>

        <DataTable style={styles.table}>
          <DataTable.Header style={styles.dataHeader}>
            <DataTable.Title style={styles.dataHeaderFirstTitle}>Descrição</DataTable.Title>
            <DataTable.Title style={styles.dataHeaderTitle}>Transações</DataTable.Title>
            <DataTable.Title style={styles.dataHeaderTitle}>Editar</DataTable.Title>
            <DataTable.Title style={styles.dataHeaderTitle}>Excluir</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={products}
            keyExtractor={product => product.id}
            renderItem={({ item: product }) =>
              <DataTable.Row style={styles.dataRow}>
                <DataTable.Cell>{product.description}</DataTable.Cell>
                <DataTable.Cell style={styles.dataCel}>
                  <TouchableOpacity style={styles.optionBtn}
                    onPress={() => navigation.navigate('ListTransaction', {
                      productId: product.id,
                    })}>Transação</TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataCel}>
                  <TouchableOpacity style={styles.optionBtn}
                    onPress={() => navigation.navigate('UpdateProduct', {
                      productId: product.id,
                      description: product.description,
                      categoryId
                    })}>Editar</TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataCel}>
                  <TouchableOpacity style={styles.optionBtn}
                    onPress={() => deleteProduct(product.id)}>
                    <Feather name="trash-2" size={25} color="#d9534f" />
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            }
          />
        </DataTable>
      </View>
    </View>
  </ScrollView>)
}

