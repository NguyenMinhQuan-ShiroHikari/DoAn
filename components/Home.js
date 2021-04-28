import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'

const Home = ({navigation, route}) => {
    const USER= route.params.user
    const logo = require('../img/manga.png')
    const thanhvien = require('../img/member.png')
    const nhom = require('../img/group.jpg')
    var today = new Date()
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const Thoat=()=>{
        Alert.alert(
            "Xác nhận đăng xuất!",
            "Bạn có muốn đăng xuất?",
            [
                {
                    text: "Cancel"
                },
                { text: "OK", onPress: () => navigation.replace('Login')}
            ]
        );
        
    }
    return (
        <View style={styles.tong}>
                <Image source={logo} style={styles.logo}/>
                <View style={{marginTop: 25}}>
                    <View style={styles.row}>
                        <View style={styles.muc}>
                            <TouchableOpacity onPress={() => { navigation.navigate("QLNhom") }} style={styles.muc}>
                                <Image source={nhom} style={styles.hinhmuc} />
                                <Text style={styles.txtmuc}>Nhóm</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.muc}>

                            <TouchableOpacity onPress={() => { navigation.navigate("QLThanhVien") }} style={styles.muc}>
                                <Image source={thanhvien} style={styles.hinhmuc} />
                                <Text style={styles.txtmuc}>Thành viên quản trị</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{height: 180}}></View>
                <TouchableOpacity style={styles.btnThoat} onPress={Thoat}>
                    <Text>Đăng xuất tài khoản</Text>
                </TouchableOpacity>
                <Text style={styles.txtmuc}>Thông tin quản trị viên </Text>
                <Text style={styles.txtmuc}>Họ và tên: {USER.hoTen}</Text>
                <Text style={styles.txtmuc}>Số điện thoại: {USER.soDienThoai}</Text>
                <Text style={styles.txtmuc}>Hôm nay: {date}</Text>  
            </View>
    )
}

export default Home

const styles = StyleSheet.create({
    tong: {
        flex: 1,
        backgroundColor: '#003f5c',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 250,
        resizeMode: 'stretch'
        
    },
    row: {
        flexDirection: 'row'
    },
    muc: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    hinhmuc: {
        width: 75,
        height: 75
    },
    txtmuc: {
        color: '#fff'
    },
    btnThoat:{
            backgroundColor: '#8C8C8C',
            width: 350,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            padding: 10,
            borderRadius: 25,
    }
})

