import axios, { AxiosRequestConfig } from 'axios';
import { format } from 'date-fns/esm';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { masking } from '../components/MaskUtil'
import IProps from '../interfaces/IProps';
import styles from './styles';
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP } from 'react-native-responsive-screen';

function CreateTransaction({ navigation, route }: IProps) {
  const { productId } = route.params;
  const [date, setDate] = useState(`${format(new Date, "dd/MM/yyyy HH:mm:ss")}`)
  const [soldQnt, setSoldQnt] = useState("0")
  const [purchasedQnt, setPurchasedQnt] = useState("0")
  const [purchasedUnt, setPurchasedUnt] = useState("00.00")
  const [isSold, setIsSold] = useState(false)

  async function setType() {
    setIsSold(!isSold)
  }

  async function sendForm() {
    const dateTimeArray = date.split(' ')
    if (!dateTimeArray[1] || dateTimeArray[1].length < 8) {
      alert('Insira a data completa')
    }
    const dateArray = dateTimeArray[0].split('/')
    const dateFormated = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${dateTimeArray[1]}-03:00`
    let messageSuccess = 'sucesso'
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: 'http://localhost:3001/transaction',
      data: {
        date: dateFormated,
        productId,
      }
    }
    const soldQntFormated = +soldQnt
    const purchasedQntFormated = +purchasedQnt
    const purchasedUntFormated = +purchasedUnt

    if (isSold && soldQntFormated > 0) {
      messageSuccess = "Cadastro da venda efetuado com sucesso!!"
      options.data.soldQnt = soldQntFormated

    } else if (!isSold && purchasedQntFormated > 0 && purchasedUntFormated > 0) {
      messageSuccess = "Cadastro da compra efetuado com sucesso!!"
      options.data.purchasedQnt = purchasedQntFormated
      options.data.purchasedUnt = purchasedUntFormated
    } else {
      if (Platform.OS === 'web') {
        alert("Preencha todos os campos!")
        return
      } else {
        Alert.alert("Erro", `Preencha todos os campos`, [
          {
            text: "Ok",
            onPress: () => { },
            style: "cancel",
          },
        ]);
        return
      }
    }

    await axios(options)
      .then(() => {
        if (Platform.OS === 'web') {
          alert(messageSuccess)
          navigation.navigate('ListTransaction', { productId })
          return
        }

        Alert.alert(
          "Sucesso",
          messageSuccess,
          [
            {
              text: "",
              onPress: () => { },
            },
            { text: "OK", onPress: () => navigation.navigate('ListTransaction', { productId }) },
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

  if (isSold) {
    return <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <TouchableOpacity style={styles.TransactionBtn} onPress={() => setType()}>
          <Feather name="arrow-down-circle" size={widthPercentageToDP("4%")} color="#77A037" /><Text style={{ fontSize: widthPercentageToDP("4%") }}>Compra</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.inputs}
          placeholder="Data da venda"
          keyboardType="number-pad"
          maxLength={19}
          onChangeText={(text) => setDate(masking(text, "99/99/9999 99:99:99"))}
          value={date}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Quantidade vendida"
          keyboardType="number-pad"
          maxLength={3}
          onChangeText={(text) => setSoldQnt(masking(text, "999"))}
          value={`${soldQnt}`}
        />

        <RectButton onPress={sendForm} style={styles.button}>
          <Text style={{ color: "#fff", fontFamily: "Lato_700Bold" }}>
            Cadastrar Venda
              </Text>
        </RectButton>
      </View>
    </ScrollView>;
  } else {
    return <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <TouchableOpacity style={styles.TransactionBtn} onPress={() => setType()}>
          <Feather name="arrow-up-circle" size={widthPercentageToDP("4%")} color="#e02041" /><Text style={{ fontSize: widthPercentageToDP("4%") }}>Venda</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.inputs}
          placeholder="Data da venda"
          keyboardType="number-pad"
          maxLength={19}
          onChangeText={(text) => setDate(masking(text, "99/99/9999 99:99:99"))}
          value={date}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Quantidade comprada"
          keyboardType="number-pad"
          maxLength={3}
          onChangeText={(text) => setPurchasedQnt(masking(text, "999"))}
          value={`${purchasedQnt}`}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Valor Unitario da compra"
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={(text) => setPurchasedUnt(masking(text, "99.99"))}
          value={`${purchasedUnt}`}
        />
        <RectButton onPress={sendForm} style={styles.button}>
          <Text style={{ color: "#fff", fontFamily: "Lato_700Bold" }}>
            Cadastrar Compra
              </Text>
        </RectButton>
      </View>
    </ScrollView>;
  }

}

export default CreateTransaction;