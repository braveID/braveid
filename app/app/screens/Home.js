import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Constants, WebBrowser } from 'expo';


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            result : null
        }
    }

    static navigationOptions = {
        title: 'Welcome',
    };

    componentWillMount() {
        console.log(this.props)
    }
    
    incrementCount(){
        console.log('clicked')
        this.props.increment()
    }

    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://expo.io');
        this.setState({ result });
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
                <Button title='increment' onPress={() => {this.incrementCount()}}> Inc </Button>
                <Button title='log store' onPress={() => {console.log(store.getState())}}> Log store </Button>
                <Button title='navigate' onPress={() => {this.props.changeScreen('Profile')}}> Navigate </Button>
                <Button
                    style={styles.paragraph}
                    title="Open WebBrowser"
                    onPress={this._handlePressButtonAsync}
                />
                <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
}

export default connect(() => { return {} }, mapDispatchToProps)(Home);