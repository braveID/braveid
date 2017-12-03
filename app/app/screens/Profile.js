import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button, Image, ScrollView, StatusBar, Modal } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { navigate } from '../actions/actions';
import { Constants } from 'expo'
import { SearchBar } from 'react-native-elements'
import { debounce } from 'lodash'
import { AuthSession } from 'expo';

import SearchResults from '../components/SearchResults';

// header : <Text style={{ backgroundColor : 'blue', height: Constants.statusBarHeight + 50 }}> Let there be light </Text>,
 
const magenta = '#c93871'
class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSearchModal : false,
            profileSearchField : ''
        }
        this.delayedSearch = debounce(this.searchUsers,350)

    }

    static navigationOptions = (props) => {
        const { params = {} } = props.navigation.state
        return {
            title : 'profile',
            header : 
                <SearchBar
                    ref={(search) => {params.getSearchBar ? params.getSearchBar(search) : ()=>{}}}            
                    containerStyle={{
                        justifyContent:'flex-end',
                        marginTop:Constants.statusBarHeight - 5,
                        backgroundColor:'black'
                    }} 
                    inputStyle={{
                        textAlign:'center',
                        color: magenta
                    }}
                    placeholder={params.name}
                    clearIcon={{ color: '#86939e', name: 'clear' }}
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
        this.props.navigation.setParams({ 
            onInputChange : this.onSearchBarChange.bind(this),
            getSearchBar : this.getSearchBar.bind(this)
        })          
    }
    
    getSearchBar(bar){
        console.log('got the bar',bar)
        this.searchBar = bar
    }

    searchUsers(){
        if (this.state.profileSearchField != ''){
            this.props.searchUsers(this.state.profileSearchField)            
        }
    }

    onSearchBarChange(text) {
        this.setState({ profileSearchField : text })
        this.delayedSearch()
    }

    clearSearch = () => {
        this.setState({ profileSearchField : '' })
        this.searchBar.clearText()
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#2c2f33',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection : 'column',
                height: 2000
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
            <View style={{flex:1}}>
                <StatusBar
                    barStyle="light-content"
                />
                { this.state.profileSearchField != '' 
                ? <SearchResults clear={this.clearSearch} search={this.state.profileSearchField}/> : null }           

                <ScrollView onTouchStart={() => {
                    this.setState({profileSearchField : ''})
                    this.searchBar ? this.searchBar.clearText() : null
                }} 
                    style={{backgroundColor: '#2c2f33',width : '100%', height: 2000, flex: 1}}
                >

                    <View style={{height: 230, width: '100%'}}>
                        <Image 
                            source={{ uri: 'http://metrograph.com/uploads/films/spirited-1459547307-726x388.jpg' }}
                            style={{ width: '100%', height: 150}}                            
                        />
                        <Image 
                            source={{uri: 'http://2.bp.blogspot.com/-xJ4YrwmanWs/Vay6FcjgvfI/AAAAAAAATJU/_fidk6LhbxU/s1600/tumblr_nqox4gcyyg1r1636lo1_500.png'}} 
                            style={{ width: 120, height: 120,alignSelf: 'center', borderRadius: 60, zIndex: 10, top : -50, borderColor:'#c93871', borderWidth: 3,}}
                        />
                    </View>

                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Text style={{color : 'white', fontSize: 30}}> {this.props.navigation.state.params.name} </Text>
                    </View>

                    <View style={{ width: '100%'}}>
                        <Text style={{color : magenta, fontSize: 40, fontWeight: 'bold', left:10}}> Steam </Text>
                        <View style={{backgroundColor:'#36393e',height:150}}>
                            <Button title='LOGIN TO STEAM'></Button>
                            <Text> {this.state.profileSearchField} </Text>                
                        </View>
                    </View>

                    <View style={{ width: '100%'}}>
                        <Text style={{color : magenta, fontSize: 40, fontWeight: 'bold', left:10}}> Battle.NET </Text>
                        <View style={{backgroundColor:'#36393e',height:150}}>
                            <Text> {this.state.profileSearchField} </Text>                
                        </View>
                    </View>

                    <View style={{ width: '100%'}}>
                        <Text style={{color : magenta, fontSize: 35, fontWeight: 'bold', left:10}}> League Of Legends </Text>
                        <View style={{backgroundColor:'#36393e',height:150}}>
                            <Text> {this.state.profileSearchField} </Text>                
                        </View>
                    </View>
                    <Button title='Logout' onPress={() => {this.props.logout()}}></Button>

                </ScrollView>

            </View>
        )

            
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
  }
export default connect(mapStateToProps = (state,props) => { return {user : state.user} }, mapDispatchToProps)(Profile);