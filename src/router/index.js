import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import TambahBuku from '../pages/TambahBuku';
import DetailBuku from '../pages/DetailBuku';
import EditBuku from '../pages/EditBuku';

const Stack = createStackNavigator();

const Router = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="TambahBuku" component={TambahBuku} options={{title : 'Tambah Buku Baru'}}/>
        <Stack.Screen name="DetailBuku" component={DetailBuku} options={{title : 'Detail Informasi Buku'}}/>
        <Stack.Screen name="EditBuku" component={EditBuku} options={{title : 'Edit Data Buku'}}/>
      </Stack.Navigator>
    );
}

export default Router
