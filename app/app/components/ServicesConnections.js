import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ConnectButton from './ConnectButton'
import steamIcon from '../assets/steam.png'
import battlenetIcon from '../assets/battlenet.png'
import riotIcon from '../assets/riot.png'
import {AuthSession,Constants} from 'expo'
import {braveFetch} from '../helpers/api'

class ServicesConnections extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      steamResult : null
    }
  }

  handleSteamConnectButtonPress = async () => {
    // console.log(AuthSession.getRedirectUrl(''))
    let result = await AuthSession.startAsync({
      authUrl:`http://localhost:3002/external/steam`,
      returnUrl:'exp://localhost:19000/+steam_callback'
    });
    if (result.type == 'success'){
      console.log(result.params.steamid)

      let status = await braveFetch('/updateSteamId',{
        _id : this.props.user._id,
        steam_id: result.params.steamid
      })

      status = status.json()
      
      if (status.ok){
        console.log('Steam key saved successfully')
      }
    }
    this.setState({ steamResult : result });
  };


  render () {
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        marginBottom: 50,
        backgroundColor: '#25282B',
        display: 'flex',
        justifyContent: 'space-between'
      }
    })

    return (
      <View style={styles.container}>
        {this.props.steam ? <ConnectButton title='Conectar com Steam' icon={steamIcon} onPress={this.handleSteamConnectButtonPress}/> : null}
        {this.props.battlenet ? <ConnectButton title='Conectar com BattleNet' icon={battlenetIcon} /> : null}
        {this.props.riot ? <ConnectButton title='Conectar com Riot' icon={riotIcon} /> : null}
      </View>
    )
  }
}


export default ServicesConnections
