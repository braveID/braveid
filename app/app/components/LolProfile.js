import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
const fetch = require('node-fetch')

const LolProfile = ({lol}) => {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      marginBottom: 50,
      backgroundColor: '#25282B',
      display: 'flex',
      justifyContent: 'space-between'
    },
    header: {
      fontSize: 60,
      fontWeight: 'bold',
      color: '#c93871',
      marginBottom: 15
    },
    subheader: {
      fontSize: 30,
      color: '#c93871',
      marginVertical: 20
    },
    basicStats: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'space-around',
      width: '100%'
    },
    profilePic: {
      width: '40%',
      height: 200,
      borderRadius: 10,
      paddingHorizontal: 15
    },
    accountInfo: {
      width: '60%',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    },

    numericContent: {
      backgroundColor: '#161616',
      paddingHorizontal: 20,
      paddingVertical: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    numericContentAccent: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 35
    },
    featuredGameNumbersAccent: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15
    },
    numericContentDescription: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      opacity: 0.7
    },
    featuredGameNumbersDescription: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
      opacity: 0.7,
      marginTop: 5
    },
    divider: {
      backgroundColor: '#c93871',
      height: 1
    },
    verticalDivider: {
      backgroundColor: '#c93871',
      width: 1,
      opacity: 0.7
    },
    nickname: {
      textAlign: 'center',
      fontSize: 20,
      color: 'white',
      opacity: 0.8
    },
    featuredGameContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10
    },
    featuredGamePic: {
      width: '40%',
      height: 50
    },
    featuredGameStats: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    },
    featuredGameNumbers: {
      display: 'flex',
      backgroundColor: '#161616',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    gameName: {
      color: 'white',
      opacity: 0.8,
      fontSize: 15
    }

  })

  function getChampionById(championId){
    var lastPlayedChampion = {};
    fetch('https://br1.api.riotgames.com/lol/static-data/v3/champions/'+championId+'?locale=pt_BR&api_key='+key)
    .then(res => res.json())
    .then(res => {
        lastPlayedChampion = res
        lastPlayedChampion.championImg = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'+res.name+'.png'
        return lastPlayedChampion;
    })};

  var lastPlayedChampion = getChampionById(lol.lastmatch.champion)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>League of Legends</Text>

      <View style={styles.basicStats}>
        <View style={styles.accountInfo}>
          <Text style={styles.nickname}>{lol.name}</Text>

          <View style={styles.numericsContentContainer}>
            <View style={styles.numericContent}>
              <Text style={styles.numericContentAccent}>{lol.ranked.wins}</Text>
              <Text style={styles.numericContentDescription}>WINS</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.numericContent}>
              <Text style={styles.numericContentAccent}>{lol.ranked.losses}</Text>
              <Text style={styles.numericContentDescription}>LOSSES</Text>
            </View>
          </View>
        </View>

      </View>

      <Text style={styles.subheader}>Rank</Text>
        <View style={styles.numericContent}>
            <Text style={styles.numericContentAccent}>{lol.ranked.tier}</Text>
        </View>
        <View style={styles.numericContent}>
            <Text style={styles.numericContentAccent}>{lol.ranked.rank}</Text>
        </View>
     
        <Image
          style={styles.profilePic}
          source={{uri: lastPlayedChampion.championImg}} />


    </View>

  )
}

export default LolProfile
