import React, { useState, useEffect } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import database from '@react-native-firebase/database'

const CTThanhVien = ({ navigation, route }) => {
    const nhom =route.params.nhom
    const thanhvien=route.params.value
    const tt=route.params.tt
    const [id, setid] = useState('')
    const [idNhom, setidNhom] = useState('')
    const [hoten, setHoten] = useState('')
    const [sdt, setSdt] = useState('')
    const [cmnd, setCmnd] = useState('')
    const [diachi, setDiachi] = useState('')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [trangthai, setTrangthai] = useState(true);

    var today = new Date()
    var ngay = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const [ngayvao, setngayvao] = useState(ngay)
    useEffect(() => {
        if(tt==='1'){
            setid(thanhvien.id)
            setHoten(thanhvien.hoten)
            setSdt(thanhvien.sdt)
            setCmnd(thanhvien.cmnd)
            setDiachi(thanhvien.diachi)
            setTrangthai(thanhvien.gioitinh)
            setngayvao(thanhvien.ngayvao)
            setidNhom(thanhvien.idNhom)
        }
    }, [])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setngayvao(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const Save = async () => {
        if(hoten==''){
            Alert.alert("Cảnh Báo","Vui lòng nhập họ và tên.")
            return
        }
        if(sdt==''){
            Alert.alert("Cảnh Báo","Vui lòng nhập số điện thoại.")
            return
        }
        if(cmnd==''){
            Alert.alert("Cảnh Báo","Vui lòng nhập số CMND.")
            return
        }
        if(diachi==''){
            Alert.alert("Cảnh Báo","Vui lòng nhập địa chỉ.")
            return
        }
        if(ngayvao==''){
            Alert.alert("Cảnh Báo","Vui lòng nhập ngày vào nhóm.")
            return
        }
        let chitiet = {
            hoten: hoten,
            sdt: sdt,
            cmnd: cmnd,
            gioitinh: trangthai,
            diachi: diachi,
            ngayvao: ngayvao,
            idNhom: nhom.id
        }
        try {
            console.log(tt)
            if (tt === '0') {
                await database().ref("/ThanhVienNhom").push(chitiet);
                await database().ref(`/Nhom/${nhom.id}`).update({soLuong: nhom.soLuong + 1,});
                Alert.alert("Thêm thành công.")
            }
            else {
                await database().ref(`/ThanhVienNhom/${id}`).set(chitiet);
                Alert.alert("Sửa thành công.")
            }
            navigation.navigate('QLThanhVienNhom')
        }
        catch (e) {
            Alert.alert('Err:', e)
        }
    
    }

    return (
        <ScrollView style={styles.tong1}>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Họ và tên:</Text>
                <TextInput style={styles.txtInput} placeholder={"Tên thành viên"} value={hoten} onChangeText={(value) => setHoten(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Liên lạc: </Text>
                <TextInput style={styles.txtInput} placeholder={"Số điện thoại"} value={sdt} onChangeText={(value) => setSdt(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Số CMND:</Text>
                <TextInput style={styles.txtInput} placeholder={"Số CMND"} value={cmnd} onChangeText={(value) => setCmnd(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Giới Tính: </Text>
                <CheckBox style={styles.checkbox}
                    disabled={false}
                    value={trangthai}
                    onValueChange={(newValue) => setTrangthai(newValue)}
                />
                <Text style={styles.txtTieuDeC} >Nam</Text>
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Địa chỉ:</Text>
                <TextInput style={styles.txtInput} placeholder={"Địa chỉ"} value={diachi} onChangeText={(value) => setDiachi(value)} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}>Ngày vào: </Text>
                <TextInput style={styles.txtInput} value={ngayvao} onChangeText={(value) => { setngayvao(value) }} />
            </View>
            <View style={styles.tong2}>
                <Text style={styles.txtTieuDe}></Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <TouchableOpacity style={styles.btnDate} onPress={showDatepicker}>
                    <Text style={styles.txt}>Chọn ngày</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.vbtn}>
                <TouchableOpacity style={styles.btn} onPress={Save}>
                    <Text style={styles.txt}>LƯU</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default CTThanhVien

const styles = StyleSheet.create({
    tong1: {
        flex: 1,
        backgroundColor: '#003f5c'
    },
    tong2: {
        flexDirection: 'row'
    },
    tieude: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F2D43D'
    },
    vtieude: {
        margin: 15,
        alignItems: 'center'
    },
    txtTieuDe: {
        fontSize: 20,
        padding: 10,
        margin: 10,
        textAlign: 'center',
        width: 120,
        color: '#A68524'
    },
    txtTieuDeC: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        textAlign: 'center',
        width: 120,
        color: '#A68524'
    },
    txtInput: {
        backgroundColor: '#F2CA52',
        justifyContent: 'flex-end',
        width: 250,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
        borderRadius: 25
    },
    txt: {
        fontSize: 16,
        color: '#F2F2F2'
    },
    vbtn: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#8C8C8C',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderRadius: 25,
    },
    btnDate: {
        backgroundColor: '#8C8C8C',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderRadius: 25,
    },
    checkbox: {
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        margin: 10,
    },
    txtcheckbox: {
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 25,
        margin: 10,
    }
})
