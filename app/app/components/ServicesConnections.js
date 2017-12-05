import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ConnectButton from './ConnectButton'
import steamIcon from '../assets/steam.png'
import battlenetIcon from '../assets/battlenet.png'
import riotIcon from '../assets/riot.png'

const ServicesConnections = ({ steam, battlenet, riot }) => {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      marginBottom: 50,
      backgroundColor: '#25282B',
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
  const t = () => console.log('hey')

  return (
    <View style={styles.container}>
      { steam ? <ConnectButton title='Conectar com Steam' icon={steamIcon} onPress={t} /> : null}
      { battlenet ? <ConnectButton title='Conectar com BattleNet' icon={battlenetIcon} /> : null}
      { riot ? <ConnectButton title='Conectar com Riot' icon={riotIcon} /> : null}
    </View>

  )
}

export default ServicesConnections
