import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
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
    axios.get(`http://localhost:3001/search/category/${categoryId}`).then(res => {
      const productsData = res.data.products;
      const categoryData = res.data;
      delete categoryData.products
      setCategory(categoryData)
      setProducts(productsData)
    })
  })

  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Produtos {category?.description}</Text>
    <Button
      title="Criar novo produto"
      onPress={() => navigation.navigate('CreateProduct')}
    />
    <DataTable>
      <DataTable.Header>
        <DataTable.Title> Descrição</DataTable.Title>
        <DataTable.Title> Transações</DataTable.Title>
        <DataTable.Title> Editar Produto</DataTable.Title>
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
          </DataTable.Row>

        }
      />
    </DataTable>
  </View>)
}

