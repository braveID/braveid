import React from 'react'
import { Text, Image, View, StyleSheet, TouchableHighlight } from 'react-native'

const SearchResultCell = ({clear, navigate, user, onResultPressed}) => {
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
      fontSize: 20,
      color: 'white',
      padding: 10,
      zIndex: 2
    },
    subItem: {
      opacity: 0.7,
      color: 'white',
      fontSize: 15,
      marginRight: 10,
      width: '30%'
    },
    picture: {
      marginLeft: 15,
      width: 30,
      height: 30,
      borderRadius: 15,
      borderColor: 'white',
      borderWidth: 1
    },
    picContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  })

  return (
    <TouchableHighlight
      key={user._id}
      onPress={() => {
        onResultPressed()
        clear()
        navigate('Profile', user)
      }}>
      <View style={styles.container}>
        <View style={styles.picContainer}>
          <Image
            style={styles.picture}
            source={{uri: user.profile_pic_url}}
          />
          <Text style={styles.item}> {user.username.toLowerCase()} </Text>
        </View>
        <Text style={styles.subItem}> {user.real_name} </Text>
      </View>
    </TouchableHighlight>
  )
}

export default SearchResultCell
