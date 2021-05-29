import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateCategory from './pages/CreateCategory';
import ListCategory from './pages/ListCategory';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (<NavigationContainer>{
    <Stack.Navigator initialRouteName="ListCategory">
      <Stack.Screen name="ListCategory" options={{title: "Categorias" }} component={ListCategory}/>
      <Stack.Screen name="CreateCategory" component={CreateCategory}/>
    </Stack.Navigator>
    }</NavigationContainer>);
}

export default Routes;