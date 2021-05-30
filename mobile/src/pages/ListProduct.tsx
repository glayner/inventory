import { Feather } from "@expo/vector-icons";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Platform, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get(`http://localhost:3001/search/category/${categoryId}`).then(res => {
        const productsData = res.data.products;
        const categoryData = res.data;
        delete categoryData.products
        setCategory(categoryData)
        setProducts(productsData)
      })
    });

    return unsubscribe;
  }, [navigation]);

  async function deleteProduct(id: string) {
    await axios.delete(`http://localhost:3001/manage/product/${id}`)
      .then(() => {
        if (Platform.OS === 'web') {
          alert("Produto excluido com sucesso!!")
          navigation.navigate("ListCategory")
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
            { text: "OK", onPress: () => navigation.navigate("ListCategory") },
          ],
          { cancelable: false }
        );
      })
      .catch(err => {
        let message = err.response.data.message;
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

  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Categoria: {category?.description}</Text>
    <Button
      title="Criar novo produto"
      onPress={() => navigation.navigate('CreateProduct', { categoryId })}
    />

    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Descrição</DataTable.Title>
        <DataTable.Title>Transações</DataTable.Title>
        <DataTable.Title>Editar</DataTable.Title>
        <DataTable.Title>Excluir</DataTable.Title>
      </DataTable.Header>
      <FlatList
        data={products}
        keyExtractor={product => product.id}
        renderItem={({ item: product }) =>
          <DataTable.Row>
            <DataTable.Cell>{product.description}</DataTable.Cell>
            <DataTable.Cell><Button
              title="Transações"
              onPress={() => navigation.navigate('ListTransaction', {
                productId: product.id,
              })}
            /></DataTable.Cell>
            <DataTable.Cell><Button
              title="Editar"
              onPress={() => navigation.navigate('UpdateProduct', {
                productId: product.id,
                description: product.description,
                categoryId
              })}
            /></DataTable.Cell>

            <DataTable.Cell>
              <TouchableOpacity onPress={() => deleteProduct(product.id)}>
                <Feather name="trash-2" size={25} color="#e02041" />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        }
      />
    </DataTable>

  </View>)
}

