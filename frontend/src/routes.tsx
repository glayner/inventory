import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateCategory from './pages/CreateCategory';
import CreateProduct from './pages/CreateProduct';
import CreateTransaction from './pages/CreateTransaction';
import ListCategory from './pages/ListCategory';
import ListProduct from './pages/ListProduct';
import ListTransaction from './pages/ListTransaction';
import UpdateCategory from './pages/UpdateCategory';
import UpdateProduct from './pages/UpdateProduct';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (<NavigationContainer>{
    <Stack.Navigator initialRouteName="ListCategory">
      <Stack.Screen name="ListCategory" options={{ title: "Categorias" }} component={ListCategory} />
      <Stack.Screen name="CreateCategory" options={{ title: "Nova Categoria" }} component={CreateCategory} />
      <Stack.Screen name="UpdateCategory" options={{ title: "Editar Categoria" }} component={UpdateCategory} />
      <Stack.Screen name="ListProduct" options={{ title: "Produtos" }} component={ListProduct} />
      <Stack.Screen name="CreateProduct" options={{ title: "Novo Produto" }} component={CreateProduct} />
      <Stack.Screen name="UpdateProduct" options={{ title: "Editar Produto" }} component={UpdateProduct} />
      <Stack.Screen name="ListTransaction" options={{ title: "Transações" }} component={ListTransaction} />
      <Stack.Screen name="CreateTransaction" options={{ title: "Nova Transação" }} component={CreateTransaction} />
    </Stack.Navigator>
  }</NavigationContainer>);
}

export default Routes;