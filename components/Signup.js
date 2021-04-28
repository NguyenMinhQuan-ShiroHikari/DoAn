import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import database from '@react-native-firebase/database'

const Signup = ({ navigation, route }) => {
    const data=route.params.data
    const [hoTen, setHoten] = useState('')
    const [soDienThoai, setSodienthoai] = useState('')
    const [tenDangNhap, setTenDangNhap] = useState('')
    const [matKhau, setMatkhau] = useState('')
    const [nhapLaiMatKhau, setNhaplaimatkhau] = useState('')
    const dangky = async () => {
        if(hoTen === '')
        {
            Alert.alert("Họ tên không được để trống.")
            return
        }
        if(soDienThoai === '')
        {
            Alert.alert("Số điện thoại không được để trống.")
            return
        }
        if(tenDangNhap === '')
        {
            Alert.alert("Tên đăng nhập không được trống.")
            return
        }
        if(matKhau === '')
        {
            Alert.alert("Mật khẩu không được để trống.")
            return
        }
        if(nhapLaiMatKhau === '')
        {
            Alert.alert("Nhập lại mật khẩu không được để trống.")
            return
        }
        if(matKhau!=nhapLaiMatKhau){
            Alert.alert("Nhập lại mật khẩu không khớp.")
            return
        }
        let taiKhoan=data.find(value=>{
            if(value.tenDangNhap===tenDangNhap){
                return value;
            }   
        })
        if(taiKhoan!=null){
            Alert.alert("Tài khoản đã tồn tại.")
            return
        }
        let user = {
            hoTen: hoTen,
            soDienThoai: soDienThoai,
            tenDangNhap: tenDangNhap,
            matKhau: matKhau,
            chucVu: 3
        }
        try {
            await database().ref("/ThanhVien").push(user);
            Alert.alert("Đăng ký thành công.")
            navigation.navigate('Login')

        }
        catch (e) {
            Alert.alert('Loi' + e)
        }
    }
    
    return (
        <View style={styles.tong1}>
            <View style={styles.vtieude}>
                <Text style={styles.tieude}>Đăng kí thành viên</Text>
            </View>

            <View style={styles.tong2}>
                <TextInput style={styles.txtInput} placeholder={"Họ và tên"} onChangeText={(text) => { setHoten(text) }} />
            </View>
            <View style={styles.tong2}>
                <TextInput style={styles.txtInput} placeholder={"Số điện thoại"} onChangeText={(text) => { setSodienthoai(text) }} />
            </View>
            <View style={styles.tong2}>
                <TextInput style={styles.txtInput} placeholder={"Tên đăng nhập"} onChangeText={(text) => { setTenDangNhap(text) }} />
            </View>
            <View style={styles.tong2}>
                <TextInput style={styles.txtInput} placeholder={"Mật khẩu"} secureTextEntry={true} onChangeText={(text) => { setMatkhau(text) }} />
            </View>
            <View style={styles.tong2}>
                <TextInput style={styles.txtInput} placeholder={"Nhập lại mật khẩu"} secureTextEntry={true} onChangeText={(text) => { setNhaplaimatkhau(text) }} />
            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={dangky}>
                    <Text style={styles.txtbtn}>Đăng kí</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    tong1: {
        flex: 1,
        backgroundColor: '#002695'
    },
    vtieude: {
        margin: 15,
        alignItems: 'center'
    },
    tong2: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tieude: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F633FF'
    },
    txtInput: {
        backgroundColor: '#0CF9FF',
        justifyContent: 'flex-end',
        width: 300,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
        borderRadius: 25
    },
    vbtn: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#E6FF0C',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2.5,
        margin: 5,
        padding: 10,
        borderRadius: 25,
    }

})



