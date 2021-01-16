 import React, { Component } from 'react';
 import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
 import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
 import { faPlus } from '@fortawesome/free-solid-svg-icons';
 import Firebase from '../../config/Firebase';
 import { CardBuku } from '../../components';

 
 export default class Home extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              bukus: [],
              bukusKey: []
         }
     }

     componentDidMount(){
        this.ambilData();
     }

     ambilData = () => {
        Firebase.database()
            .ref("Buku")
            .once('value', (querySnapShot) => {
              let data = querySnapShot.val() ?  querySnapShot.val() : {};
              let bukuItem = {...data};

              this.setState({
                  bukus: bukuItem,
                  bukusKey: Object.keys(bukuItem)
              })

            })
     }

    removeData = (id) => {
        Alert.alert(
            "Info",
            "Anda yakin akan menghapus data Buku ini ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  Firebase.database()
                    .ref('Buku/' + id)
                    .remove();
                    this.ambilData();
                    Alert.alert('Hapus', 'Sukses Hapus Data')
              } }
            ],
            { cancelable: false }
          );
    }
     
     render() {
         const {bukus, bukusKey} = this.state
         return (
             <View style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Kataloq Buku</Text>
                        <View style={styles.garis}/>
                    </View>

                    <View style={styles.listBuku}>
                        {bukusKey.length > 0 ? (
                            bukusKey.map((key) => (
                               <CardBuku key={key} bukuItem={bukus[key]} id={key} {...this.props} removeData={this.removeData}/>
                            ))
                        ) : (
                            <Text>Daftar Kosong</Text>
                        )}
                    </View>

                 <View style={styles.wrapperBottom}>
                 <TouchableOpacity style={styles.btnTambah} onPress={() => this.props.navigation.navigate('TambahBuku')}>
                     <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
                 </TouchableOpacity>
                 </View>
             </View>
         );
     }
 }
 
 const styles = StyleSheet.create({
     page : {
         flex : 1
     },
     header : {
        paddingHorizontal : 30,
        paddingTop : 30
     },
     title : {
       fontSize : 30,
       fontWeight : 'bold'
     },
     garis : {
        borderWidth : 1,
        marginTop : 10
     },
     listBuku : {
        paddingHorizontal : 30,
        marginTop : 20
     },
     wrapperBottom : {
         flex : 1,
         position : 'absolute',
         bottom : 0,
         right : 0,
         margin :30
     },
     btnTambah : {
        padding : 20,
        backgroundColor : 'skyblue',
        borderRadius : 30,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
     }
 });
 