import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Firebase from '../../config/Firebase'

export default class DetailBuku extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             buku : {}
        }
    }

    componentDidMount(){
        Firebase.database()
            .ref('Buku/' + this.props.route.params.id)
            .once('value', (querySnapShot) => {
              let data = querySnapShot.val() ?  querySnapShot.val() : {};
              let bukuItem = {...data};

              this.setState({
                  buku: bukuItem
              })

            })
     }
    
    render() {
        const {buku} = this.state;
        return (
            <View style={styles.pages}>
                <Text>Judul Buku : </Text>
                <Text style={styles.text}>{buku.title}</Text>
                <Text>Author : </Text>
                <Text style={styles.text}>{buku.author}</Text>
                <Text>No. ISBN : </Text>
                <Text style={styles.text}>{buku.isbn}</Text>
                <Text>Nama Publisher : </Text>
                <Text style={styles.text}>{buku.publisher}</Text>
                <Text>Tahun : </Text>
                <Text style={styles.text}>{buku.year}</Text>
                <Text>Halaman Buku : </Text>
                <Text style={styles.text}>{buku.page}</Text>
                <Text>Deskripsi Buku : </Text>
                <Text style={styles.text}>{buku.deskripsi}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages : {
        padding : 20,
        margin : 30,
        backgroundColor : 'white',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text : {
        fontSize : 16,
        fontWeight : 'bold',
        marginBottom : 10
    }
})
