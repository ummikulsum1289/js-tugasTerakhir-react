import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const CardBuku = ({id, bukuItem, navigation, removeData}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('DetailBuku', {id : id})}>
            <View>
                <Text style={styles.title}>{bukuItem.title}</Text>
                <Text style={styles.author}>Author : {bukuItem.author}</Text>
                <Text style={styles.year}>Tahun : {bukuItem.year}</Text>
                <Text style={styles.page}>Halaman : {bukuItem.page}</Text>
            </View>
            <View style={styles.icon}>
                <FontAwesomeIcon icon={faEdit} color={'green'} size={21} onPress={() => navigation.navigate('EditBuku', {id : id})}/>
                <FontAwesomeIcon icon={faTimes} color={'red'} size={21} onPress={() => removeData(id)}/>
            </View>
        </TouchableOpacity>
    )
}

export default CardBuku

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        padding : 15,
        backgroundColor : 'white',
        borderRadius : 5,
        marginBottom : 20,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title : {
        fontWeight : 'bold',
        fontSize : 16
    },
    author : {
        fontSize : 12,
        color : 'gray'
    },
    year : {
        fontSize : 12,
        color : 'gray'
    },
    page : {
        fontSize : 12,
        color : 'gray'
    },
    icon : {
        flexDirection : 'row',
        flex : 1,
        justifyContent : 'flex-end',
        alignItems : 'center'
    }
})
