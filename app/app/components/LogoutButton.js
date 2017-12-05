import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

const LoggoutButton = ({ onPress }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#202326',
      height: 50,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold'

    }
  })

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>SAIR</Text>
      </TouchableOpacity>
    </View>

  )
}

export default LoggoutButton
