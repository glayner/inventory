import { Feather } from "@expo/vector-icons";
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Platform, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import IProduct from '../interfaces/IProduct';
import IProps from '../interfaces/IProps';
import ITransaction from '../interfaces/ITransaction';
import styles from './styles';

export default function ListTransaction({ route, navigation }: IProps) {
  const { productId } = route.params;

  const [product, setProduct] = useState<IProduct>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function pupulateTransaction() {
    axios.get(`http://localhost:3001/search/product/${productId}`).then(res => {
      const transactionsData = res.data.transactions;
      setTransactions(transactionsData)

      const productData = res.data;
      delete productData.products
      setProduct(productData)
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pupulateTransaction()
    });
    return unsubscribe;
  }, [navigation]);

  async function deleteTransaction(id: string) {
    await axios.delete(`http://localhost:3001/manage/transaction/${id}`)
      .then(() => {
        if (Platform.OS === 'web') {
          alert("Transação excluida com sucesso!!")
          pupulateTransaction()
          return
        }

        Alert.alert(
          "Sucesso",
          "Transação excluida com sucesso!!",
          [
            {
              text: "",
              onPress: () => { },
            },
            { text: "OK", onPress: () => pupulateTransaction() },
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

  return (<ScrollView horizontal>
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Produto: {product?.description}</Text>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('CreateTransaction', {
            productId
          })}
        >Criar nova transação</TouchableOpacity>

        <DataTable style={styles.table} >

          <DataTable.Row>
            <DataTable.Cell style={styles.firstTitleHeader}>Data</DataTable.Cell>
            <DataTable.Cell style={styles.titleBuySale}>Compra e venda</DataTable.Cell>
            <DataTable.Cell style={styles.titleTotal}>Total</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>

            <DataTable.Title style={styles.firstTitleHeader}> </DataTable.Title>
            <DataTable.Title style={styles.titleHeader}>QNT</DataTable.Title>
            <DataTable.Title style={styles.titleHeader}>UNT</DataTable.Title>
            <DataTable.Title style={styles.titleHeader}>TOTAL</DataTable.Title>
            <DataTable.Title style={styles.titleHeader}>QNT</DataTable.Title>
            <DataTable.Title style={styles.titleHeader}>UNT</DataTable.Title>
            <DataTable.Title style={styles.titleHeader}>TOTAL</DataTable.Title>
            <DataTable.Title style={styles.titleHeader}>Excluir</DataTable.Title>

          </DataTable.Row>



          <FlatList
            data={transactions}
            keyExtractor={transaction => transaction.id}
            renderItem={({ item: transaction, index }) => {
              let styleRow: 'saleRow' | 'buyRow'
              let styleFirstCol: 'firstSaleCol' | 'firstBuyCol'
              let styleCol: 'saleCol' | 'buyCol'
              let styleColLow: 'saleColLow' | 'buyColLow'
              let dataQnt: 'sold_qnt' | 'purchased_qnt'
              let dataUnt: 'sold_unt' | 'purchased_unt'
              let dataAmt: 'sold_amt' | 'purchased_amt'

              if (transaction.sold_qnt && transaction.sold_qnt > 0) {
                styleRow = 'saleRow'
                styleFirstCol = 'firstSaleCol'
                styleCol = 'saleCol'
                styleColLow = 'saleColLow'
                dataQnt = 'sold_qnt'
                dataUnt = 'sold_unt'
                dataAmt = 'sold_amt'
              } else {
                styleRow = 'buyRow'
                styleFirstCol = 'firstBuyCol'
                styleCol = 'buyCol'
                styleColLow = 'buyColLow'
                dataQnt = 'purchased_qnt'
                dataUnt = 'purchased_unt'
                dataAmt = 'purchased_amt'
              }

              if (index === (transactions.length - 1)) {
                return <DataTable.Row style={styles[styleRow]}>
                  <DataTable.Cell style={styles[styleFirstCol]}>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles[styleColLow]}>{transaction[dataQnt]}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles[styleCol]} >{transaction[dataUnt]}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles[styleColLow]}>{transaction[dataAmt]}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles[styleCol]}>{transaction.balance_qnt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles[styleColLow]}>{transaction.balance_unt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles[styleCol]}>{transaction.balance_amt}</DataTable.Cell>
                  <DataTable.Cell style={styles[styleColLow]}>
                    <TouchableOpacity onPress={() => deleteTransaction(transaction.id)}>
                      <Feather name="trash-2" size={25} color="#000" />
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              }

              return <DataTable.Row style={styles[styleRow]}>
                <DataTable.Cell style={styles[styleFirstCol]}>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</DataTable.Cell>
                <DataTable.Cell numeric style={styles[styleColLow]}>{transaction[dataQnt]}</DataTable.Cell>
                <DataTable.Cell numeric style={styles[styleCol]} >{transaction[dataUnt]}</DataTable.Cell>
                <DataTable.Cell numeric style={styles[styleColLow]}>{transaction[dataAmt]}</DataTable.Cell>
                <DataTable.Cell numeric style={styles[styleCol]}>{transaction.balance_qnt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles[styleColLow]}>{transaction.balance_unt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles[styleCol]}>{transaction.balance_amt}</DataTable.Cell>
                <DataTable.Cell style={styles[styleColLow]}> </DataTable.Cell>
              </DataTable.Row>
            }
            }
          />
        </DataTable>
      </View>
    </View>
  </ScrollView>
  )
}

