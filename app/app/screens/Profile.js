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
import ServicesConnections from '../components/ServicesConnections';
import LogoutButton from '../components/LogoutButton';
import { externalProfile } from '../reducers/reducers';

// header : <Text style={{ backgroundColor : 'blue', height: Constants.statusBarHeight + 50 }}> Let there be light </Text>,
 
const magenta = '#c93871'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchFieldText : ''
        }
        this.delayedSearch = debounce(this.searchUsers,350)
    }

    static navigationOptions = (props) => {
        const { params = {} } = props.navigation.state
        return {
            title : 'profile',
            gesturesEnabled : params.isSelf ? false : true,
            header : 
            <View style={{
                justifyContent:'flex-start',
                flexDirection:'row',
                marginTop:Constants.statusBarHeight - 10,
                alignItems:'center'
            }}>
                {params.isSelf ? null : <Button onPress={props.navigation.goBack} color={magenta} style={{flex:1}} title='‹ Go Back'></Button>}                        
                <SearchBar
                    ref={(search) => {params.getSearchBar ? params.getSearchBar(search) : ()=>{}}}            
                    containerStyle={{
                        justifyContent:'flex-end',
                        backgroundColor:'black',
                        flex: 1,
                    }} 
                    inputStyle={{
                        textAlign:'center',
                        color: magenta
                    }}
                    placeholder={params.username}
                    clearIcon={{ color: '#86939e', name: 'clear' }}
                    onChangeText={(text) => {
                        params.onInputChange(text)
                    }}
                />
                
            </View>,
            headerStyle: {
                backgroundColor: 'black',
            },
            headerLeft: <Button title='back' onPress={() => console.log('pressd')}></Button>,
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
        console.log('ISSO AQUI CATIORRO',this.props.navigation.state.params)
        console.log('LINKING URL',Constants.linkingUri)
        let profileId = this.props.navigation.state.params._id
        this.props.fetchProfile(profileId,this.props.isSelf)
        this.props.navigation.setParams({
            onInputChange: this.onSearchBarChange.bind(this),
            getSearchBar: this.getSearchBar.bind(this),
            isSelf: this.props.isSelf
        })          
    }
    
    componentDidMount(){
    
    }
    
    getSearchBar(bar){
        this.searchBar = bar
    }

    searchUsers(){
        if (this.state.searchFieldText != ''){
            console.log('searching for',this.state.searchFieldText)
            this.props.searchUsers(this.state.searchFieldText)
        }
    }

    onSearchBarChange(text) {
        this.setState({ searchFieldText : text })
        this.delayedSearch()
    }

    clearSearch = () => {
        this.setState({ searchFieldText : '' })
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
                

        const user = this.props.user;
    
        return (
            <View style={{flex:1}}>
                <StatusBar
                    barStyle="light-content"
                />
                { this.state.searchFieldText != '' 
                ? <SearchResults clear={this.clearSearch} search={this.state.searchFieldText}/> : null }           

                <ScrollView onTouchStart={() => {
                    this.setState({searchFieldText : ''})
                    this.searchBar ? this.searchBar.clearText() : null
                }} 
                    style={{backgroundColor: '#2c2f33',width : '100%', height: 2000, flex: 1}}
                >

                <View style={{flex:1}}>
                    <Text style={{color: 'white', alignSelf:'center'}}>{this.props.isSelf ? 'This is your Profile' : 'Not yours'}</Text>
                </View>

                    <View style={{height: 230, width: '100%'}}>
                        <Image 
                            source={{ uri: 'http://metrograph.com/uploads/films/spirited-1459547307-726x388.jpg' }}
                            style={{ width: '100%', height: 150}}                            
                        />
                        <Image 
                            source={{uri: this.props.navigation.state.params.profile_pic_url || 'http://2.bp.blogspot.com/-xJ4YrwmanWs/Vay6FcjgvfI/AAAAAAAATJU/_fidk6LhbxU/s1600/tumblr_nqox4gcyyg1r1636lo1_500.png'}} 
                            style={{ width: 120, height: 120,alignSelf: 'center', borderRadius: 60, zIndex: 10, top : -50, borderColor:'#c93871', borderWidth: 3,}}
                        />
                    </View>

                    <View style={{alignItems: 'center', width: '100%', marginBottom: 20}}>
                        <Text style={{color : 'white', fontSize: 30}}> {this.props.navigation.state.params.username} </Text>
                        <Text style={{ color: 'lightgray', fontSize: 16 }}> {this.props.navigation.state.params.real_name} </Text>                        
                    </View>

                    { user.steam ? 
                        <View style={{ width: '100%',marginTop : 20}}>
                            <Text style={{color : magenta, fontSize: 40, fontWeight: 'bold', left:10}}> Steam </Text>
                            <View style={{backgroundColor:'#36393e',height:150}}>
                                <Text> {this.state.searchFieldText} </Text>                
                            </View>
                        </View>
                        : null
                    }

                    { user.battlenet ? 
                        <View style={{ width: '100%'}}>
                            <Text style={{color : magenta, fontSize: 40, fontWeight: 'bold', left:10}}> Battle.NET </Text>
                            <View style={{backgroundColor:'#36393e',height:150}}>
                                <Text> {this.state.searchFieldText} </Text>                
                            </View>
                        </View>
                        : null
                    }


                    { user.lol ? 
                        <View style={{ width: '100%' }}>
                            <Text style={{ color: magenta, fontSize: 35, fontWeight: 'bold', left: 10 }}> League Of Legends </Text>
                            <View style={{ backgroundColor: '#36393e', height: 150 }}>
                                <Text> {this.state.searchFieldText} </Text>
                            </View>
                        </View> : null
                    }
                    
                    { this.props.isSelf ? 
                        <ServicesConnections 
                            steam={user.steam_id === undefined} 
                            battlenet={user.battlenet_id === undefined} 
                            riot={user.riot_id === undefined}
                            user={user}
                        /> : null
                    }

                    
                    { this.props.isSelf ? 
                        <LogoutButton onPress={() => this.props.logout()}/> : null 
                    }

                </ScrollView>

            </View>
        ) 
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
  }
export default connect(mapStateToProps = (state,props) => {
    let isOwner = false
    if (props.navigation.state.params._id == state.user._id){
        isOwner = true
    }
    return {
        user : isOwner ? state.ownProfile : state.externalProfile,
        self : state.user,
        isSelf : isOwner
     }}, mapDispatchToProps)(Profile);