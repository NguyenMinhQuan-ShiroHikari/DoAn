import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image } from 'react-native'
import database from '@react-native-firebase/database'

const QLKhachThue = ({ navigation, route }) => {
    const nhom = route.params.value
    const [data, setdata] = useState([])
    const logo = require('../img/user.png')
    useEffect(() => {
        const getData = async () => {
            try {
                await database().ref("/ThanhVienNhom")
                    .on('value', snapshot => {
                        let arr = []
                        snapshot.forEach(element => {
                            let temp = {
                                id: element.key,
                                hoten: element.val().hoten,
                                sdt: element.val().sdt,
                                cmnd: element.val().cmnd,
                                gioitinh: element.val().gioitinh,
                                diachi: element.val().diachi,
                                ngayvao: element.val().ngayvao,
                                idnhom: element.val().idNhom
                            }
                            arr.push(temp)
                        })

                        let arrnhom = arr.filter((value) => {
                            return value.idnhom === nhom.id
                        })
                        setdata(arrnhom)
                    });

            }
            catch (e) {
                Alert.alert("Lỗi: " + e);
            }
        }
        getData()
    }, [])

    const them = (tt) => {
        navigation.navigate('CTThanhVien', { tt: tt, nhom: nhom })
    }
    const XoaKT = async (id) => {
        await database().ref(`/ThanhVienNhom/${id}`).remove()
        await database().ref(`/Nhom/${nhom.id}`).update({soLuong: nhom.soLuong - 1,});
    }
    const capnhat = (tt, value) => {
        navigation.navigate('CTThanhVien', { tt: tt, value: value, nhom: nhom })
    }
    const xoa = (id) => {
        try {
            Alert.alert(
                "Xóa thành viên",
                "Bạn có muốn xóa thành viên này hay không ?",
                [
                    {
                        text: "Cancel"
                    },
                    { text: "OK", onPress: () => XoaKT(id) }
                ]
            );
        }
        catch (e) {
            Alert.alert('Err: ' + e)
        }
    }
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { capnhat('1', item) }}>
                <View style={styles.vItem}>
                    <Image source={logo} style={styles.hinhmuc} />
                    <View style={styles.vItemTXT}>
                        <Text style={styles.txtmuc}>{item.hoten}</Text>
                        <Text style={styles.txtmuc}>{item.sdt}</Text>
                        <Text style={styles.txtmuc}>{item.diachi}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnitem} onPress={() => { xoa(item.id) }}>
                        <Text style={styles.txtitem}>X</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.tong1}>
            <FlatList style={styles.list}
                data={data}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={item => item.id}
            />

            <TouchableOpacity style={styles.btn} onPress={() => them('0')}>
                <Text style={styles.txtitem}>THÊM</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QLKhachThue

const styles = StyleSheet.create({
    tong1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003f5c'
    },
    tieude: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F2D43D'
    },

    list: {

    },
    listCN: {
        flexDirection: 'row'
    },
    listHT: {
        alignItems: 'flex-start'

    },
    item: {
        width: 350,
        backgroundColor: '#F2CA52',
        margin: 5,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 25
    },
    item1: {
        backgroundColor: '#F2F2F2',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 25
    },
    tenitem: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8C8C8C'
    },
    btnitem: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A68524',
        margin: 2.5,
        padding: 3.5,
        borderRadius: 50
    },
    txtitem: {
        fontSize: 16,
        color: '#F2F2F2'
    },
    txtitem1: {
        fontSize: 16,
        color: '#8C8C8C'
    },
    btn: {
        backgroundColor: '#8C8C8C',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2.5,
        margin: 5,
        padding: 10,
        borderRadius: 25
    },
    hinhmuc: {
        width: 75,
        height: 75,
        margin: 5
    },
    vItem: {
        flexDirection: 'row',
    },
    vItemTXT: {
        width: 150,
        margin: 10
    },
    txtmuc: {
        fontWeight: 'bold'
    }

})
