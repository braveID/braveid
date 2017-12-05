import React from 'react'
import { Text, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import ConnectButton from './ConnectButton'

const SearchResultCell = ({ steam }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginBottom: 50
    },
    content: {
    //   backgroundColor: 'magenta',
      display: 'flex',
      justifyContent: 'space-between',
      padding: 20
    },
    header: {
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 30
    },
    button: {
      backgroundColor: '#161616',
      height: 50,
      borderRadius: 100,
      marginBottom: 10,
      marginTop: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    buttonImage: {
      marginRight: 10,
      width: 30,
      height: 30
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold'

    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Integrações</Text>
      <View style={styles.content}>
        { steam ? <ConnectButton title='Conectar com Steam' iconPath='../assets/steam.png/' /> : ''}
      </View>
    </View>

  )
}

export default SearchResultCell
