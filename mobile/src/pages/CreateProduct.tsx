import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import IProps from '../interfaces/IProps';
import styles from './styles';

function CreateProduct({ navigation, route }: IProps) {
  const { categoryId} = route.params;
  const [description, setDescription] = useState("")

  async function sendForm() {
    if (!description) {
      if (Platform.OS === 'web') {
        alert("Insira a descrição da categoria!")
        return
      } else {
        Alert.alert("Erro", `Preencha a descrição`, [
          {
            text: "Ok",
            onPress: () => { },
            style: "cancel",
          },
        ]);
        return
      }
    }

    await axios.post('http://localhost:3001/manage/category', { description })
      .then(response => {
        if (Platform.OS === 'web') {
          alert("Cadastro da categoria efetuado com sucesso!!")
          navigation.navigate("ListCategory")
          return
        }

        Alert.alert(
          "Sucesso",
          "Cadastro da categoria efetuado com sucesso!!",
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

  return <ScrollView showsVerticalScrollIndicator={false} >
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          autoCapitalize="words"
          value={description}
          placeholder="Descrição da categoria"
          onChangeText={(text) => setDescription(text)}
        />

        <RectButton onPress={sendForm} style={styles.button}>
          <Text style={{ color: "#fff", fontFamily: "Lato_700Bold" }}>
            Criar categoria
              </Text>
        </RectButton>
      </View>
    </View>
  </ScrollView>;
}

export default CreateProduct;