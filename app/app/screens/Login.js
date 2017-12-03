import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button} from 'react-native';
import { connect, MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'


class Profile extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        title: 'Login',
    };

    incrementCount(){
        console.log('clicked')
        this.props.increment()
    }
    
    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });

        return (
            <View style={styles.container}>
                <Text style={{color : 'white', fontSize: 25}}> Welcome to BraveID - Login </Text>
                <Button title='btn' onPress={() => {this.incrementCount()}}> Clica aqui </Button>
                <Button title='NAVIGATE' onPress={() => {this.props.navigate('Home',{ id : 'EAE'})}}></Button>
                <Button title='LOGIN' onPress={() => { 
                    this.props.setUser({ name : 'seila', id : 1221 })
                    this.props.navigate('Profile',{ name : 'seila', id: 1221 })
                }}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
}

export default connect(() => { return {} }, mapDispatchToProps)(Profile);