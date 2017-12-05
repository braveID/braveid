import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const ConnectButton = ({ title, iconPath, onPress }) => {
  const styles = StyleSheet.create({
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
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require(iconPath)} style={styles.buttonImage} />
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>

  )
}

export default ConnectButton
