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

interface ICategories {
  id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export default function ListCategory({ navigation }: IProps) {
  const [categories, setCategories] = useState<ICategories[]>([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get('http://localhost:3001/search/category').then(res => {
        setCategories(res.data)
      })
    });

    return unsubscribe;
  }, [navigation]);

  async function deleteCategory(id: string) {
    await axios.delete(`http://localhost:3001/manage/category/${id}`)
      .then(() => {
        if (Platform.OS === 'web') {
          alert("Categoria excluida com sucesso!!")
          navigation.navigate("ListCategory")
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
    <Text>Inventário PEPS</Text>
    <Button
      title="Criar Categoria"
      onPress={() => navigation.navigate('CreateCategory')}
    />
    <DataTable>
      <DataTable.Header>
        <DataTable.Title> Descrição</DataTable.Title>
        <DataTable.Title> Produtos</DataTable.Title>
        <DataTable.Title> Editar</DataTable.Title>
        <DataTable.Title> Excluir</DataTable.Title>
      </DataTable.Header>
      <FlatList
        data={categories}
        keyExtractor={category => category.id}
        renderItem={({ item: category }) =>
          <DataTable.Row>
            <DataTable.Cell>{category.description}</DataTable.Cell>
            <DataTable.Cell> <Button
              title="Produtos"
              onPress={() => navigation.navigate('ListProduct', {
                categoryId: category.id,
              })}
            /></DataTable.Cell>
            <DataTable.Cell><Button
              title="Editar"
              onPress={() => navigation.navigate('UpdateCategory', {
                categoryId: category.id,
                description: category.description
              })}
            /></DataTable.Cell>
            <DataTable.Cell>
              <TouchableOpacity onPress={() => deleteCategory(category.id)}>
                <Feather name="trash-2" size={25} color="#e02041" />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        }
      />
    </DataTable>
  </View>)
}

