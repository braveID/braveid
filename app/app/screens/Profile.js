import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button, Image, ScrollView, StatusBar, Modal } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { navigate } from '../actions/actions';
import { Constants } from 'expo'
import { SearchBar } from 'react-native-elements'
// import { debounce } from 'lodash'

// header : <Text style={{ backgroundColor : 'blue', height: Constants.statusBarHeight + 50 }}> Let there be light </Text>,
 
const magenta = '#c93871'
class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSearchModal : false,
            profileSearchField : ''
        }

    }

    static navigationOptions = (props) => {
        console.log('=================',props)
        const { params = {} } = props.navigation.state
        return {
            title : 'profile',
            header : 
                <SearchBar 
                    containerStyle={{
                        justifyContent:'flex-end',
                        marginTop:Constants.statusBarHeight,
                        backgroundColor:'black'
                    }} 
                    inputStyle={{
                        textAlign:'center'
                    }}
                    placeholder={params.name}
                    onChangeText={(text) => {
                        params.onInputChange(text)
                    }}
                />,
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTitleStyle: {
                color: magenta
            },
            tintColor: magenta,
            titleStyle: {
            color: 'black'
            }
        }
    }
    

    componentWillMount(){
        let profileId = this.props.navigation.state.params
    }
    
    componentDidMount(){
        this.props.navigation.setParams({ onInputChange : this.onSearchBarChange.bind(this)});                
    }

    onSearchBarChange(text) {
        this.setState({ profileSearchField : text })
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#2c2f33',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection : 'column'
            },
            backgroundImage: {
                flex: 1,
                resizeMode: 'cover', // or 'stretch'
            }
        });

        const searchModal = () => {
            if (this.state.showSearchModal) {
                return (
                    <Modal 
                        visible={this.state.showSearchModal} 
                    >
                        <Text> im a simple man </Text>
                    </Modal>
                )
            } else return null                   
        }

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                    <ScrollView style={{flex:1, width : '100%'}} contentContainerStyle={{ flex : 1 }}>
                    <View style={{
                        backgroundColor : '#99aab5',
                        flex: 1,
                        flexDirection : 'row',
                        justifyContent: 'center',
                        alignItems : 'center',
                        width : '100%'
                    }}>
                        <Image 
                            source={{uri: 'http://2.bp.blogspot.com/-xJ4YrwmanWs/Vay6FcjgvfI/AAAAAAAATJU/_fidk6LhbxU/s1600/tumblr_nqox4gcyyg1r1636lo1_500.png'}} 
                            style={{ width: 120, height: 120, borderRadius: 60, zIndex: 10, top : 80, borderColor:'#c93871', borderWidth: 5,}}
                        />
                    </View>

                    <View style={{flex: 1, top: 70, alignItems:'center'}}>
                        <Text style={{color : 'white', fontSize: 30}}> {this.props.navigation.state.params.name} </Text>
                        <Button title='btn' onPress={() => {
                            this.props.navigation.setParams({ onInputChange : this.onSearchBarChange.bind(this), name : 'fred'});        
                        }}>
                        </Button>
                        <Text> {this.state.profileSearchField} </Text>
                        <Button title='Logout' onPress={() => {this.props.logout()}}></Button>
                    </View>

                    <View style={{flex: 1, alignItems:'center'}}>
                        <Text style={{color : 'white', fontSize: 30}}> {this.props.navigation.state.params.name} </Text>
                        <Button title='btn' onPress={() => {
                            this.props.navigation.setParams({ onInputChange : this.onSearchBarChange.bind(this), name : 'fred'});        
                        }}>
                        </Button>
                        <Text> {this.state.profileSearchField} </Text>
                        <Button title='Logout' onPress={() => {this.props.logout()}}></Button>
                    </View>

                </ScrollView>
                {searchModal()}

            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
  }
export default connect(mapStateToProps = (state,props) => { return {user : state.user } }, mapDispatchToProps)(Profile);