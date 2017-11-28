import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button} from 'react-native';
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
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });

        return (
            <View style={styles.container}>
                <Text style={{color : 'white', fontSize: 25}}> Welcome to BraveID </Text>
                <Button title='btn' onPress={() => {this.incrementCount()}}> Clica aqui </Button>
                <Button title='btn' onPress={() => {this.props.increment()}}> Clica aqui </Button>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
  }
export default connect(() => { return {} }, mapDispatchToProps)(Profile);