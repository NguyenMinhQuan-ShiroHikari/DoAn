import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import database from '@react-native-firebase/database';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import QLThanhVien from './components/QLThanhVien';
import QLThanhVienNhom from './components/QLThanhVienNhom';
import QLNhom from './components/QLNhom';
import AddNhom from './components/AddNhom';
import CTThanhVien from './components/CTThanhVien';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
        <Stack.Screen name="QLThanhVien" component={QLThanhVien} options={{ title: 'Danh sách quản trị viên' }}/>
        <Stack.Screen name="QLThanhVienNhom" component={QLThanhVienNhom} options={{ title: 'Danh sách thành viên'}}/>
        <Stack.Screen name="QLNhom" component={QLNhom} options={{ title: 'Danh sách nhóm' }}/>
        <Stack.Screen name="AddNhom" component={AddNhom} options={{headerShown: false}}/>
        <Stack.Screen name="CTThanhVien" component={CTThanhVien} options={{title: 'Thông tin thành viên'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;