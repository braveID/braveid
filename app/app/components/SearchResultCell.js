import React from 'react'
import { Text, Image, View, StyleSheet, TouchableHighlight } from 'react-native'

const SearchResultCell = ({clear, navigate, id, username, realName, onResultPressed}) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      zIndex: 2
    },
    item: {
      fontSize: 25,
      color: 'white',
      padding: 10,
      zIndex: 2
    },
    subItem: {
      opacity: 0.7,
      color: 'white',
      fontSize: 20
    }
  })

  return (
    <TouchableHighlight
      key={id}
      onPress={() => {
        onResultPressed()
        clear()
        navigate('Profile', { id, username, realName })
      }}>
      <View style={styles.container}>
        {/* <Image source={require('./assets/check.png')} /> */}
        <Text style={styles.item}> {username} </Text>
        <Text style={styles.subItem}> {realName} </Text>
      </View>
    </TouchableHighlight>
  )
}

export default SearchResultCell
