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

interface ICategories {
  id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export default function ListCategory({ navigation }: IProps) {
  const [categories, setCategories] = useState<ICategories[]>([])

  async function populateCategory() {
    axios.get('http://localhost:3001/search/category').then(res => {
      setCategories(res.data)
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      populateCategory()
    });

    return unsubscribe;
  }, [navigation]);

  async function deleteCategory(id: string) {
    await axios.delete(`http://localhost:3001/manage/category/${id}`)
      .then(() => {
        if (Platform.OS === 'web') {
          alert("Categoria excluida com sucesso!!")
          populateCategory()
          return
        }

        Alert.alert(
          "Sucesso",
          "Categoria excluida com sucesso!!",
          [
            {
              text: "",
              onPress: () => { },
            },
            { text: "OK", onPress: () => populateCategory() },
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

  return (<ScrollView horizontal showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <View style={styles.body}>

        <Text style={styles.title}>Inventário PEPS</Text>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('CreateCategory')}
        >Criar Categoria</TouchableOpacity>

        <DataTable style={styles.table}>
          <DataTable.Header style={styles.dataHeader}>
            <DataTable.Title style={styles.dataHeaderFirstTitle}>Descrição</DataTable.Title>
            <DataTable.Title style={styles.dataHeaderTitle}>Produtos</DataTable.Title>
            <DataTable.Title style={styles.dataHeaderTitle}>Editar</DataTable.Title>
            <DataTable.Title style={styles.dataHeaderTitle}>Excluir</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={categories}
            keyExtractor={category => category.id}
            renderItem={({ item: category }) =>
              <DataTable.Row style={styles.dataRow}>
                <DataTable.Cell style={styles.dataFirsCel}>{category.description}</DataTable.Cell>
                <DataTable.Cell style={styles.dataCel}>
                  <TouchableOpacity style={styles.optionBtn}
                    onPress={() => navigation.navigate('ListProduct', {
                      categoryId: category.id,
                    })}>Produtos</TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataCel}>
                  <TouchableOpacity style={styles.optionBtn}
                    onPress={() => navigation.navigate('UpdateCategory', {
                      categoryId: category.id,
                      description: category.description
                    })}>Editar</TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataCel}>
                  <TouchableOpacity style={styles.optionBtn}
                    onPress={() => deleteCategory(category.id)}>
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

