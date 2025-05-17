import {Text, View} from 'react-native';
import React from 'react';
import Home from './Src/Component/Home';
import SlapScreen from './Src/Component/SlapScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from './Src/Component/SignUp';
import SignIn from './Src/Component/SignIn';
import Otp from './Src/Component/Otp';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Entypo';
import MyAccount from './Src/Component/MyAccount';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import More from './Src/Component/More';
import {PaperProvider} from 'react-native-paper';
import ProfileUpdate from './Src/Component/ProfileUpdate';
import ChangePassword from './Src/Component/ChangePassword';
import EmailOtp from './Src/Component/EmailOtp';
import NewPassword from './Src/Component/NewPassword';
import AboutUs from './Src/Component/AboutUs';
import PrivacyPolicy from './Src/Component/PrivacyPolicy';
import BookingDetails from './Src/Component/BookingDetails';
import CoinsDetails from './Src/Component/CoinsDetails';
import TermsCondition from './Src/Component/TermsCondition';
import Disclaimer from './Src/Component/Disclaimer';
import Paymentpage from './Src/Component/Paymentpage';
import Help from './Src/Component/Help';
import ReferralScreen from './Src/Component/ReferralScreen';
import Pay from './Src/Component/Pay';
import EarnedBonusPoint from './Src/Component/EarnedBonusPoint';
import Imagezoom from './Src/Component/Imagezoom';
import SpasssSc from './Src/Component/SplashScreen';
// import PaymentDetails from './Src/Component/Paymentdetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

const MyStack = () => {
  return (
    <Stack.Navigator independent={true}>
      <Stack.Screen
        name="SlapScreen"
        options={{headerShown: false}}
        component={SpasssSc}
      />
      <Stack.Screen
        name="SlapScreen2"
        options={{headerShown: false}}
        component={SlapScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignUp}
      />
      <Stack.Screen
        name="SignIn"
        options={{headerShown: false}}
        component={SignIn}
      />
      <Stack.Screen
        name="ReferralScreen"
        options={{headerShown: false}}
        component={ReferralScreen}
      />
      <Stack.Screen
        name="EarnedBonusPoint"
        options={{headerShown: true}}
        component={EarnedBonusPoint}
      />
      <Stack.Screen name="Pay" options={{headerShown: true}} component={Pay} />
      <Stack.Screen
        name="ProfileUpdate"
        options={{headerShown: false}}
        component={ProfileUpdate}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{headerShown: false}}
        component={ChangePassword}
      />
      <Stack.Screen name="Otp" options={{headerShown: false}} component={Otp} />
      <Stack.Screen
        name="EmailOtp"
        options={{headerShown: false}}
        component={EmailOtp}
      />
      <Stack.Screen
        name="NewPassword"
        options={{headerShown: false}}
        component={NewPassword}
      />
      <Stack.Screen
        name="AboutUs"
        options={{
          headerShown: true,
          headerTintColor: '#f3d25b',
          headerStyle: {
            backgroundColor: '#fff',
          },
          title: 'About us',
        }}
        component={AboutUs}
      />
      <Stack.Screen
        name="BookingDetails"
        options={{
          headerShown: true,
          headerTintColor: '#f3d25b',
          headerStyle: {
            backgroundColor: '#fff',
          },
          title: 'Purchase History',
        }}
        component={BookingDetails}
      />
      <Stack.Screen
        name="CoinDetails"
        options={{
          headerShown: true,
          headerTintColor: '#f3d25b',
          headerStyle: {
            backgroundColor: '#fff',
          },
          title: 'Withdraw History',
        }}
        component={CoinsDetails}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        options={{
          headerShown: true,
          headerTintColor: '#f3d25b',
          headerStyle: {
            backgroundColor: '#fff',
          },
          title: 'Privacy Policy',
        }}
        component={PrivacyPolicy}
      />
      <Stack.Screen
        name="Paymentpage"
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#f3d25b',
          },
        }}
        component={Paymentpage}
      />
      <Stack.Screen
        name="TermsCondition"
        options={{
          headerShown: true,
          headerTintColor: '#f3d25b',
          headerStyle: {
            backgroundColor: '#fff',
          },
          title: 'Terms & Condition',
        }}
        component={TermsCondition}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: true,
          headerTintColor: '#f3d25b', // Text color for back button and title
          headerStyle: {
            backgroundColor: '#fff', // Background color of header
          },
          headerTitleStyle: {
            color: '#f3d25b', // Color of the title text
          },
          title: 'Contact Support', // Title text
        }}
      />

      <Stack.Screen
        name="Disclaimer"
        options={{
          headerShown: true,
          headerTintColor: '#f3d25b',
          headerStyle: {
            backgroundColor: '#fff',
          },
          title: 'Disclaimer',
        }}
        component={Disclaimer}
      />
      <Stack.Screen
        name="Imagezoom"
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#f3d25b',
          },
        }}
        component={Imagezoom}
      />
      <Stack.Screen
        name="Home1"
        options={{headerShown: false}}
        component={BottomTab}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: '#feac03',
          tabBarInactiveTintColor: '#f3d25b',
          tabBarStyle: {
            backgroundColor: 'black',
            borderColor: '#080808',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            // fontWeight: '800',
            fontFamily: 'Poppins-ExtraBoldItalic',
          },

          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={25} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          tabBarActiveTintColor: '#feac03',
          tabBarInactiveTintColor: '#f3d25b',
          tabBarStyle: {backgroundColor: 'black', borderColor: 'black'},
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={25} />
          ),
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: 'Poppins-ExtraBoldItalic',
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarActiveTintColor: '#feac03',
          tabBarInactiveTintColor: '#f3d25b',
          tabBarStyle: {backgroundColor: '#080808', borderColor: '#080808'},
          tabBarIcon: ({color, size}) => (
            <Feather name="more-horizontal" color={color} size={25} />
          ),
          headerShown: true,
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#f3d25b',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: 'Poppins-ExtraBoldItalic',
          },
        }}
      />
    </Tab.Navigator>
  );
};
