import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import IProps from '../interfaces/IProps';
import styles from './styles';


function UpdateCategory({ navigation, route }: IProps) {
  const { description: defaultDescription, categoryId } = route.params;
  const [description, setDescription] = useState(`${defaultDescription}`)

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

    await axios.put(`http://localhost:3001/manage/category/${categoryId}`, { description })
      .then(response => {
        if (Platform.OS === 'web') {
          alert("Cadastro da categoria alterado com sucesso!!")
          navigation.navigate("ListCategory")
          return
        }

        Alert.alert(
          "Sucesso",
          "Cadastro da categoria alterado com sucesso!!",
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
      <View style={styles.createBody}>
        <TextInput
          style={styles.inputs}
          autoCapitalize="words"
          value={description}
          placeholder="Descrição da categoria"
          onChangeText={(text) => setDescription(text)}
        />

        <RectButton onPress={sendForm} style={styles.button}>
          <Text style={{ color: "#fff", fontFamily: "Lato_700Bold" }}>
            Alterar categoria
              </Text>
        </RectButton>
      </View>
    </View>
  </ScrollView>;
}

export default UpdateCategory;