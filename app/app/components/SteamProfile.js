import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'

const SteamProfile = ({steam}) => {
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

  console.log(steam)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>STEAM</Text>

      <View style={styles.basicStats}>
        <Image
          style={styles.profilePic}
          source={{uri: steam.steamInfo.avatarfull}} />

        <View style={styles.accountInfo}>
          <Text style={styles.nickname}>{steam.steamInfo.personaname}</Text>

          <View style={styles.numericsContentContainer}>
            <View style={styles.numericContent}>
              <Text style={styles.numericContentAccent}>{steam.steamInfo.numberOfHoursPlayed}</Text>
              <Text style={styles.numericContentDescription}>HORAS</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.numericContent}>
              <Text style={styles.numericContentAccent}>{steam.steamInfo.numberOfGamesOwned}</Text>
              <Text style={styles.numericContentDescription}>JOGOS</Text>
            </View>
          </View>
        </View>

      </View>

      <Text style={styles.subheader}>Jogos em Destaque</Text>

      {steam.last2weeksgames.map(game => (
        <View key={game.appid}>
          <Text style={styles.gameName}>{game.game_name.toUpperCase()}</Text>
          <View style={styles.featuredGameContainer}>
            <Image
              style={styles.featuredGamePic}
              source={{uri: game.game_photo}} />

            <View style={styles.featuredGameStats}>
              <View style={styles.featuredGameNumbers}>
                <Text style={styles.featuredGameNumbersAccent}>{game.game_2wks_hours}h</Text>
                <Text style={styles.featuredGameNumbersDescription}>2 SEMANAS</Text>
              </View>
              <View style={styles.verticalDivider} />

              <View style={styles.featuredGameNumbers}>
                <Text style={styles.featuredGameNumbersAccent}>{game.game_total_hours}h</Text>
                <Text style={styles.featuredGameNumbersDescription}>TOTAL</Text>
              </View>
            </View>
          </View>
        </View>
      ))}

    </View>

  )
}

export default SteamProfile
