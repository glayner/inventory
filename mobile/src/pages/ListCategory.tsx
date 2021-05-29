import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';


interface IProps {
  navigation: any
  routes: any
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
  }, [])

  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Inventário PEPS</Text>
    <Button
      title="Criar Categoria"
      onPress={() => navigation.navigate('CreateCategory')}
    />
    <FlatList
      data={categories}
      keyExtractor={category => category.id}
      renderItem={({ item: category }) =>
        <View>
          <Text>{category.description}</Text>
          <Button
            title="Produtos"
            onPress={() => navigation.navigate('ListProducts')}
          />
        </View>
      }
    />
  </View>)
}

