import Home from './screens/Home'
import Profile from './screens/Profile'
import Login from './screens/Login'

import { mapNavigationStateParamsToProps } from 'react-navigation'

export default Routes = {
  Login : { screen : Login },
  Home : { screen: Home },
  Profile : { screen: Profile }
}