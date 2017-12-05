import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

const ConnectButton = ({ title, icon, onPress }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#000',
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
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={icon} style={styles.buttonImage} />
        <Text style={styles.buttonText}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>

  )
}

export default ConnectButton
