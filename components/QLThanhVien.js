import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import database from '@react-native-firebase/database'

const QLThanhVien = ({ navigation }) => {
    const [data, setdata] = useState([])
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
                Alert.alert("Lỗi:",e);
            }
        }
        getData();
    }, []);
    const XoaThanhVien = async (id) => {
        await database().ref(`/ThanhVien/${id}`).remove()
    }
    const chitiet = (id) => {
        let thongtin=data.find(value=>{
            if(value.id===id){
                return value;
            }   
        })
        if(thongtin.chucVu === 1)
        {
            Alert.alert("Trưởng ban quản trị")
        }
        else    if(thongtin.chucVu === 2)
        {
            Alert.alert("Phó ban quản trị")
        }
        else
        {
            Alert.alert("Thành viên ban quản trị")
        }
    }
    const xoa = (id) => {
        try {
            Alert.alert(
                "Xác nhận xóa thành viên!!!",
                "Bạn có muốn xóa quản trị viên này?",
                [
                    {
                        text: "Cancel"
                    },
                    { text: "OK", onPress: () => XoaThanhVien(id) }
                ]
            );
        }
        catch (e) {
            Alert.alert('Err:',e)
        }
    }
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item1} onPress={() => chitiet(item.id)}>
                <Text style={styles.tenitem}>{item.hoTen}</Text>
                <Text style={styles.tenitem}>{item.soDienThoai}</Text>
                <View style={styles.listCN}>
                <TouchableOpacity style={styles.btnitem} onPress={() => xoa(item.id)}>
                    <Text style={styles.txtitem}>Xóa </Text>
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
        </View>
    )
}

export default QLThanhVien

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

