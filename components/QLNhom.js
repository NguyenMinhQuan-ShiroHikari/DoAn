import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import database from '@react-native-firebase/database'

const QLPhong = ({ navigation }) => {
    const [data, setdata] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                await database().ref("/Nhom")
                    .on('value', snapshot => {
                        let arr = [];
                        snapshot.forEach(element => {
                            let temp = {
                                id: element.key,
                                tenNhom: element.val().tenNhom,
                                soLuong: element.val().soLuong
                            }
                            arr.push(temp)
                        })
                        setdata(arr)
                    });
            }
            catch (e) {
                Alert.alert("Lỗi:",e);
            }
        }
        getData();
    }, []);

    const them = () => {
        navigation.navigate('AddNhom', {data: data})
    }
    const XoaNhom = async (id) => {
        await database().ref(`/Nhom/${id}`).remove()
    }
    const DSThanhVienNhom = (value) => {
        navigation.navigate("QLThanhVienNhom", {value: value})
    }
    const xoa = (id) => {
        try {
            Alert.alert(
                "Xác nhận xóa nhóm?",
                "Bạn có muốn xóa nhóm này hay không ?",
                [
                    {
                        text: "Cancel"
                    },
                    { text: "OK", onPress: () => XoaNhom(id) }
                ]
            );
        }
        catch (e) {
            Alert.alert('Err:',e)
        }
    }
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => DSThanhVienNhom(item)}>
                <Text style={styles.tenitem}>{item.tenNhom}</Text>
                <View style={styles.listCN}>
                <TouchableOpacity style={styles.btnitem}>
                    <Text style={styles.txtitem}>Số lượng: {item.soLuong}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnitem} onPress={() => DSThanhVienNhom(item)}>
                    <Text style={styles.txtitem}>Chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnitem} onPress={() => xoa(item.id)}>
                    <Text style={styles.txtitem}>Xóa</Text>
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
            <TouchableOpacity style={styles.btn} onPress={() => them()}>
                <Text style={styles.txtitem}>Thêm nhóm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QLPhong

const styles = StyleSheet.create({
    tong1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003f5c'
    },
    tieude:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F2D43D'  
    },
    
    list:{
        
    },
    listCN:{
        flexDirection: 'row'
    },
    listHT:{
        alignItems: 'flex-start'

    },
    item:{
        backgroundColor:'#F2CA52',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 25
    },
    item1:{
        backgroundColor:'#F2F2F2',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 25
    },
    tenitem:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8C8C8C'
    },
    btnitem:{
        width: 100,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#A68524',
        margin: 2.5,
        padding: 3.5,
        borderRadius: 25
    },
    txtitem:{
        fontSize: 16,
        color: '#F2F2F2'
    },
    txtitem1:{
        fontSize: 16,
        color: '#8C8C8C'
    },
    btn:{
        backgroundColor: '#8C8C8C',
        width: 200,
        justifyContent:'center',
        alignItems: 'center',
        margin: 2.5,
        margin: 5,
        padding: 10,
        borderRadius: 25
    },

})

