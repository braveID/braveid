import React,{ Component } from 'react'
import { StyleSheet, TouchableHighlight, Text, View, WebView, FlatList, ListRenderItem, Button, Animated } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { LinearGradient } from 'expo'


class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state = {
            result : null,
            viewOpacity : new Animated.Value(0),
            resultPressed : false
        }
    }

    componentDidMount() {
        const { viewOpacity } = this.state;
        const duration = 250
        Animated.timing(
            viewOpacity,
            {
              toValue: 1,
              duration,
            },
          ).start();
    }
    
    componentWillMount() {
    }
    
    render() {
        const { viewOpacity } = this.state;
        
        const styles = StyleSheet.create({
            container: {
                backgroundColor: 'transparent',
                zIndex: 10,
                position: 'absolute',
                width: '100%',
                height: '100%'
            },
            item: {
                width: '100%',
                fontSize: 25,
                padding: 10,
                color: 'white',
                zIndex: 0
            }
        });

        return (
            <Animated.View style={[{ opacity: viewOpacity }].concat(styles.container || [])}>
                <FlatList
                    style={{zIndex: 1, maxHeight: 'auto'}}
                    data={this.props.users}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='always'
                    renderItem={({item}) => 
                        <TouchableHighlight
                            key={item.cell}
                            style={{width:100+'%',zIndex:2}}
                            onPress={() => {
                                console.log('pressed on result')
                                this.setState({ resultPressed : true })
                                this.props.clear()
                                this.props.navigate('Profile',{ name : item.name.first, photo : item.picture.medium })
                            }}
                        >
                            <Text style={styles.item}>{item.email}</Text> 
                        </TouchableHighlight>
                    }
                />

                 <LinearGradient
                    colors={['black','rgba(0,0,0,0.5)','rgba(0,0,0,0.2)']}
                    style={{
                        position:'absolute', 
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 100+'%',
                        zIndex:0
                    }}
                >
                <View
                    onPress={(e) => {
                        e.preventDefault()
                        setTimeout(() => {
                            if (!this.state.resultPressed){
                                console.log('presed elsewhere')
                                this.props.clear()                
                            }
                        },150)
                    }}
                    onTouchStart={(e) => {
                        e.preventDefault()
                        setTimeout(() => {
                            if (!this.state.resultPressed){
                                console.log('presed elsewhere')
                                this.props.clear()                
                            }
                        },150)
                    }} 
                    style={{height:'100%',zIndex:0}}></View>
                </LinearGradient>         
            </Animated.View>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps = (state,props) => { return { users : state.userSearchResults } }, mapDispatchToProps)(SearchResults);