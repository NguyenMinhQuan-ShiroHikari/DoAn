import React, {useEffect, useState} from 'react'
import {View,Image,Text,ImageBackground,StyleSheet,TextInput,TouchableOpacity, Alert} 
from 'react-native'
import database from '@react-native-firebase/database'

const Login = ({navigation}) => {
    const [data, setdata] = useState([])
    const [userName, setUsername] = useState('')
    const [passWord, setPassword] = useState('')
    useEffect(() => {
        const getData = async () => {
            try {
                await database().ref("/ThanhVien")
                    .on('value', snapshot => {
                        let arr = [];
                        snapshot.forEach(element => {
                            let temp = {
                                id: element.key,
                                hoTen: element.val().hoTen,
                                soDienThoai: element.val().soDienThoai,
                                tenDangNhap: element.val().tenDangNhap,
                                matKhau: element.val().matKhau,
                                maNhom: element.val().maNhom,
                                chucVu: element.val().chucVu
                            }
                            arr.push(temp)
                        })
                        setdata(arr)
                    });
            }
            catch (e) {
                Alert.alert("Lỗi: " + e);
            }
        }
        getData();

    }, [])
    const nen = require('../img/background.jpg');
    const logo = require('../img/logo-frame.png');
    const dangnhap = ()=>{
        if(userName===''){
            Alert.alert("Tên đăng nhập trống.")
            return
        }
        if(passWord ===''){
            Alert.alert("Mật khẩu trống.")
            return
        }
        let user=data.find(value=>{
            if(value.tenDangNhap===userName && value.matKhau===passWord){
                return value;
            }   
        })
        if(user != null){
            navigation.replace('Home', {user: user})
        }
        else{
            Alert.alert("Thông tin đăng nhập không hợp lệ.")
        }

    }
    const dangky=()=>{
        navigation.navigate('Signup',{data: data})
    }
    const quenmatkhau=()=>{
        Alert.alert("Chức năng trong quá trình hoàn thiện.")
    }
    return (
        <ImageBackground source={nen} style={styles.nen}>
            <View>
                <Image source={logo} style={styles.logo} />
                <TextInput style={styles.input}
                    placeholder='Tên đăng nhập'
                    placeholderTextColor='#003f5c'
                    onChangeText={text => setUsername(text)}
                />
                <TextInput style={styles.input}
                    placeholder='Mật khẩu'
                    placeholderTextColor='#003f5c'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={quenmatkhau}>
                    <Text style={styles.forgot}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={dangnhap} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={dangky}>
                    <Text style={styles.loginText}>Đăng ký</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    nen: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        resizeMode: 'contain',
        width: 200,
        height: 200
    },
    input: {
        backgroundColor: "#0ED3DA",
        borderRadius: 25,
        height: 55,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    forgot: {
        color: "red",
        fontSize: 11
    },
    loginBtn: {
        backgroundColor: "#0D44F6",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    hinhmuc: {
        width: 75,
        height: 75
    },
    loginText:{
        color: "white"
    }
})
