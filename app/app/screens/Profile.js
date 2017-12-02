import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button, Image} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

class Profile extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        title: 'Profile',
    };

    incrementCount(){
        console.log('clicked')
        this.props.increment()
    }
    
    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'gray'
            },
        });

        return (
            <View style={styles.container}>
                <Image
                style={{width: '100%', height: 250}}
                source={{uri: 'https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.0-9/18555919_1067727893326960_7326719183969809569_n.png?oh=0ddf8c0d6565bfb2640ad73a9350ada1&oe=5A9A47E3'}}
                />
                <Image
                style={{width: 128, height: 128, borderRadius: 64, bottom: 189}}
                source={{uri: 'https://img00.deviantart.net/eee3/i/2017/168/3/4/discord__app__avatar_rev1_by_nodeviantarthere-dbd2tp9.png'}}
                />
                <Text style={{color : 'white', fontSize: 25,}}> Coltshot </Text>
                <Button title='All Day' onPress={() => {this.incrementCount()}}></Button>
                <Button title='All Night' onPress={() => {this.props.increment()}}></Button>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
  }
export default connect(() => { return {} }, mapDispatchToProps)(Profile);