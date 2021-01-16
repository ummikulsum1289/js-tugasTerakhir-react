import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { InputData } from '../../components';
import Firebase from '../../config/Firebase';

export default class EditBuku extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            author: '',
            isbn: '',
            publisher: '',
            year: '',
            page: '',
            deskripsi: '',
        };
    }

    componentDidMount(){
        Firebase.database()
            .ref('Buku/' + this.props.route.params.id)
            .once('value', (querySnapShot) => {
              let data = querySnapShot.val() ?  querySnapShot.val() : {};
              let bukuItem = {...data};

              this.setState({
                  title : bukuItem.title,
                  author : bukuItem.author,
                  isbn : bukuItem.isbn,
                  publisher : bukuItem.publisher,
                  year : bukuItem.year,
                  page : bukuItem.page,
                  deskripsi : bukuItem.deskripsi
              })

            })
     }

    onChangeText = (namaState, value) => {
        this.setState({
            [namaState] : value,
        });
    }

    onSubmit = () => {
        if(this.state.title && this.state.author && this.state.isbn && this.state.publisher && this.state.year && this.state.page && this.state.deskripsi){
            const bukuReferensi = Firebase.database().ref('Buku/' + this.props.route.params.id);
            const buku = {
                title : this.state.title,
                author : this.state.author,
                isbn : this.state.isbn,
                publisher : this.state.publisher,
                year : this.state.year,
                page : this.state.page,
                deskripsi : this.state.deskripsi
            }

            bukuReferensi
                .update(buku)
                .then((data) => {
                    Alert.alert('Succes', 'Data berhasil terupdate');
                    this.props.navigation.replace('Home');
                })
                .catch((error) => {
                    console.log("Error : ", error);
                })
            
        }else{
            Alert.alert('Error', 'Data ada yang masih kosong');
        }
    };
    


    render() {
        return (
            <View style={styles.pages}>
                <InputData label="Judul Buku" placeholder="Masukkan Nama Buku" onChangeText={this.onChangeText} value={this.state.title} namaState="title"/>
                <InputData label="Author" placeholder="Masukkan Nama Author" onChangeText={this.onChangeText} value={this.state.author} namaState="author"/>
                <InputData label="No ISBN" placeholder="Masukkan ISBN Akun" keyboardType="number-pad" onChangeText={this.onChangeText} value={this.state.isbn} namaState="isbn"/>
                <InputData label="Nama Publisher" placeholder="Masukkan Nama Publisher" onChangeText={this.onChangeText} value={this.state.publisher} namaState="publisher"/>
                <InputData label="Tahun" placeholder="Masukkan Tahun Publis" keyboardType="number-pad" onChangeText={this.onChangeText} value={this.state.year} namaState="year"/>
                <InputData label="Pages" placeholder="Masukkan Jumlah Halaman" keyboardType="number-pad" onChangeText={this.onChangeText} value={this.state.page} namaState="page"/>
                <InputData label="Deskripsi Buku" placeholder="Masukkan Deskripsi Buku" isTextArea={true} onChangeText={this.onChangeText} value={this.state.deskripsi} namaState="deskripsi"/>
                <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                    <Text style={styles.textTombol}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pages :{
        flex : 1,
        padding : 15
    },
    tombol :{
        backgroundColor: 'black',
        padding : 10,
        borderRadius : 5,
        marginTop : 10
    },
    textTombol :{
        color: 'white',
        fontWeight : 'bold',
        textAlign : 'center',
        fontSize : 16
    }
    
});
 