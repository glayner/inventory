import React from 'react';
import { Text, View } from 'react-native';

interface Props{
navigation: any
}

export default function CreateCategory({ navigation }: Props) {
  return ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Criar categorias</Text>
</View>)
}
