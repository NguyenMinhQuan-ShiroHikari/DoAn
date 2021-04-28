import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import database from '@react-native-firebase/database'

const ThemNhom = ({ navigation, route }) => {
    const data=route.params.data
    const [tenNhom, settenNhom] = useState('')
    const dangky = async () => {
        if(tenNhom === '')
        {
            Alert.alert("Tên nhóm trống.")
            return
        }
        
        let taiKhoan=data.find(value=>{
            if(value.tenNhom===tenNhom){
                return value;
            }   
        })
        if(taiKhoan!=null){
            Alert.alert("Tên nhóm đã tồn tại.")
            return
        }
        let group = {
            tenNhom: tenNhom,
            soLuong: 0
        }
        try {
            await database().ref("/Nhom").push(group);
            Alert.alert("Thêm nhóm thành công.")
            navigation.navigate('Home')

        }
        catch (e) {
            Alert.alert('Loi' + e)
        }
    }
    
    return (
        <View style={styles.tong1}>
            <View style={styles.vtieude}>
                <Text style={styles.tieude}>Đăng kí thông tin nhóm</Text>
            </View>

            <View style={styles.tong2}>
                <TextInput style={styles.txtInput} placeholder={"Tên nhóm"} onChangeText={(text) => { settenNhom(text) }} />
            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={dangky}>
                    <Text style={styles.txtbtn}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ThemNhom

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



