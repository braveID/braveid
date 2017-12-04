import React from 'react'
import { Text, View } from 'react-native'

const SearchResultCell = ({_id, username, realName}) => {
  return (
    <View>
      <Text>{realName}</Text>
    </View>
  )
}

export default SearchResultCell
