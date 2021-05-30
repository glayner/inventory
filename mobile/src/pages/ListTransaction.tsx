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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get(`http://localhost:3001/search/product/${productId}`).then(res => {
        const transactionsData = res.data.transactions;
        setTransactions(transactionsData)

        const productData = res.data;
        delete productData.products
        setProduct(productData)
      })
    });
    return unsubscribe;
  }, [navigation]);

  async function deleteTransaction(id: string) {
    await axios.delete(`http://localhost:3001/manage/transaction/${id}`)
      .then(() => {
        if (Platform.OS === 'web') {
          alert("Transação excluida com sucesso!!")
          navigation.navigate("ListCategory")
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
            { text: "OK", onPress: () => navigation.navigate("ListCategory") },
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



  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Produto: {product?.description}</Text>
    <Button
      title="Criar nova transação"
      onPress={() => navigation.navigate('CreateTransaction', {
        productId
      })}
    />
    <ScrollView horizontal >
      <DataTable style={styles.table} >

        <DataTable.Row>
          <DataTable.Cell style={styles.titleHeader}>Data</DataTable.Cell>
          <DataTable.Cell style={styles.titleHeader}>Compra e venda</DataTable.Cell>
          <DataTable.Cell style={styles.titleHeader}>Total</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>

          <DataTable.Title style={styles.titleHeader}>Data</DataTable.Title>
          <DataTable.Title style={styles.titleHeader}>QNT</DataTable.Title>
          <DataTable.Title style={styles.titleHeader}>UNT</DataTable.Title>
          <DataTable.Title style={styles.titleHeader}>AMT</DataTable.Title>
          <DataTable.Title style={styles.titleHeader}>QNT</DataTable.Title>
          <DataTable.Title style={styles.titleHeader}>UNT</DataTable.Title>
          <DataTable.Title style={styles.titleHeader}>AMT</DataTable.Title>
          <DataTable.Title style={styles.titleHeader}>Excluir</DataTable.Title>

        </DataTable.Row>



        <FlatList
          data={transactions}
          keyExtractor={transaction => transaction.id}
          renderItem={({ item: transaction, index }) => {
            if (transaction.sold_qnt && transaction.sold_qnt > 0) {
              if (index === (transactions.length - 1)) {
                return <DataTable.Row style={styles.redRow}>
                  <DataTable.Cell style={styles.redCol}>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.redColLow}>{transaction.sold_qnt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.redCol} >{transaction.sold_unt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.redColLow}>{transaction.sold_amt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.redCol}>{transaction.balance_qnt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.redColLow}>{transaction.balance_unt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.redCol}>{transaction.balance_amt}</DataTable.Cell>
                  <DataTable.Cell style={styles.redColLow}>
                    <TouchableOpacity onPress={() => deleteTransaction(transaction.id)}>
                      <Feather name="trash-2" size={25} color="#000" />
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              }
              return <DataTable.Row style={styles.redRow}>
                <DataTable.Cell style={styles.redCol}>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.redColLow}>{transaction.sold_qnt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.redCol} >{transaction.sold_unt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.redColLow}>{transaction.sold_amt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.redCol}>{transaction.balance_qnt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.redColLow}>{transaction.balance_unt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.redCol}>{transaction.balance_amt}</DataTable.Cell>
                <DataTable.Cell style={styles.redColLow} > </DataTable.Cell>
              </DataTable.Row>

            } else {
              if (index === (transactions.length - 1)) {
                return <DataTable.Row style={styles.greenRow}>
                  <DataTable.Cell style={styles.greenCol}>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.greenColLow} >{transaction.purchased_qnt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.greenCol}>{transaction.purchased_unt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.greenColLow}>{transaction.purchased_amt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.greenCol}>{transaction.balance_qnt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.greenColLow}>{transaction.balance_unt}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.greenCol}>{transaction.balance_amt}</DataTable.Cell>
                  <DataTable.Cell style={styles.greenColLow}>
                    <TouchableOpacity onPress={() => deleteTransaction(transaction.id)}>
                      <Feather name="trash-2" size={25} color="#e02041" />
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              }
              return <DataTable.Row style={styles.greenRow}>
                <DataTable.Cell style={styles.greenCol}>{format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.greenColLow} >{transaction.purchased_qnt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.greenCol}>{transaction.purchased_unt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.greenColLow}>{transaction.purchased_amt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.greenCol}>{transaction.balance_qnt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.greenColLow}>{transaction.balance_unt}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.greenCol}>{transaction.balance_amt}</DataTable.Cell>
                <DataTable.Cell style={styles.greenColLow} > </DataTable.Cell>
              </DataTable.Row>
            }
          }

          }
        />
      </DataTable>
    </ScrollView>
  </View>
  )
}

