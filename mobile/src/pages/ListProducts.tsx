import { RouterConfigOptions } from '@react-navigation/routers';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  navigation: any;
  route: any;
}


export default function ListProducts({ route, navigation }: Props) {
  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Lista de produtos</Text>
  </View>)
}