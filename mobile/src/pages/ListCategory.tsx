import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
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
    axios.get('http://localhost:3001/search/category').then(res => {
      setCategories(res.data)
    })
  })

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
        <DataTable.Title> Editar Categoria</DataTable.Title>
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
          </DataTable.Row>
        }
      />
    </DataTable>
  </View>)
}

