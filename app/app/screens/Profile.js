import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { navigate } from '../actions/actions';

class Profile extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title : navigation.state.params.name + "'s profile",
        headerLeft : null,
    })

    
    componentDidMount(){
        console.log(this.props)
    }


    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection : 'column'
            },
            backgroundImage: {
                flex: 1,
                resizeMode: 'cover', // or 'stretch'
            }
        });

        return (
            <View style={styles.container}>
                    <ScrollView style={{flex:1, width : '100%'}} contentContainerStyle={{ flex : 1 }}>
                    <View style={{
                        backgroundColor : 'white',
                        flex: 1,
                        flexDirection : 'row',
                        justifyContent: 'center',
                        alignItems : 'center',
                        width : '100%'
                    }}>
                        <Image 
                            source={{uri: 'http://2.bp.blogspot.com/-xJ4YrwmanWs/Vay6FcjgvfI/AAAAAAAATJU/_fidk6LhbxU/s1600/tumblr_nqox4gcyyg1r1636lo1_500.png'}} 
                            style={{ width: 120, height: 120, borderRadius: 50, zIndex: 10, top : 80, borderColor:'graye', borderWidth: 2}}
                        />
                    </View>

                    <View style={{flex: 3, marginTop: 100}}>
                        <Text style={{color : 'white', fontSize: 25}}> {this.props.navigation.state.params.name} </Text>
                        <Button title='btn' onPress={() => {this.props.increment()}}> Clica aqui </Button>
                        <Button title='Logout' onPress={() => {this.props.logout()}}></Button>
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
  }
export default connect(() => { return {} }, mapDispatchToProps)(Profile);