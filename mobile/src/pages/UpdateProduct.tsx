import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import IProps from '../interfaces/IProps';
import styles from './styles';


function UpdateCategory({ navigation, route }: IProps) {
  const { description: defaultDescription, productId, categoryId } = route.params;
  const [description, setDescription] = useState(`${defaultDescription}`)

  async function sendForm() {
    if (!description) {
      if (Platform.OS === 'web') {
        alert("Insira a descrição do produto!")
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

    await axios.put(`http://localhost:3001/manage/product/${productId}`, { description, categoryId })
      .then(() => {
        if (Platform.OS === 'web') {
          alert("Cadastro do produto alterado com sucesso!!")
          navigation.navigate("ListProduct", { categoryId })
          return
        }

        Alert.alert(
          "Sucesso",
          "Cadastro do produto alterado com sucesso!!",
          [
            {
              text: "",
              onPress: () => { },
            },
            { text: "OK", onPress: () => navigation.navigate("ListProduct", { categoryId }) },
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
      <TextInput
        style={styles.inputs}
        autoCapitalize="words"
        value={description}
        placeholder="Descrição do produto"
        onChangeText={(text) => setDescription(text)}
      />

      <RectButton onPress={sendForm} style={styles.button}>
        <Text style={{ color: "#fff", fontFamily: "Lato_700Bold" }}>
          Alterar produto
              </Text>
      </RectButton>
    </View>
  </ScrollView>;
}

export default UpdateCategory;