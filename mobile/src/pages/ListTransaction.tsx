import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import IProduct from '../interfaces/IProduct';
import IProps from '../interfaces/IProps';
import ITransaction from '../interfaces/ITransaction';

export default function ListTransaction({ route, navigation }: IProps) {
  const { productId } = route.params;

  const [product, setProduct] = useState<IProduct>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);


  useEffect(() => {
    axios.get(`http://localhost:3001/search/product/${productId}`).then(res => {
      const transactionsData = res.data.transactions;
      setTransactions(transactionsData)

      const productData = res.data;
      delete productData.products
      setProduct(productData)
    })
  }, [])

  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Produtos {product?.description}</Text>
    
    <Button
      title="Criar nova transação"
      onPress={() => navigation.navigate('CreateTransaction',{
        productId
      })}
    />
    <DataTable>
    <DataTable.Header>
      <DataTable.Title > Data</DataTable.Title>
      <DataTable.Title numeric>
        Qnt compra
      </DataTable.Title>
      <DataTable.Title numeric>
        Unt compra
      </DataTable.Title>
      <DataTable.Title numeric>
        Amt compra
      </DataTable.Title>
      <DataTable.Title numeric>
        Qnt venda
      </DataTable.Title>
      <DataTable.Title numeric>
        Unt venda
      </DataTable.Title>
      <DataTable.Title numeric>
        Amt venda
      </DataTable.Title>
      <DataTable.Title numeric>
        Qnt saldo
      </DataTable.Title>
      <DataTable.Title numeric>
        Unt saldo
      </DataTable.Title>
      <DataTable.Title numeric>
        Amt saldo
      </DataTable.Title>
    </DataTable.Header>
    <FlatList
      data={transactions}
      keyExtractor={transaction => transaction.id}
      renderItem={({ item: transaction }) =>
      <DataTable.Row>
      <DataTable.Cell>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.purchased_qnt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.purchased_unt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.purchased_amt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.sold_qnt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.sold_unt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.sold_amt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.balance_qnt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.balance_unt}</DataTable.Cell>
      <DataTable.Cell numeric>{transaction.balance_amt}</DataTable.Cell>
    </DataTable.Row>  
      }
    />
    </DataTable>
  </View>)
}

