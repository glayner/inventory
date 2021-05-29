import React from 'react';
import { Text, View } from 'react-native';
import IProps from '../interfaces/IProps';


export default function CreateTransaction({ navigation }: IProps) {
  return ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Criar transação</Text>
</View>)
}
