import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Principal from "./Principal";
import Perfil from "./Perfil";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MinhasViagens from "./MinhasViagens";

const Tab =  createBottomTabNavigator()
const screenOptions = {
    tabBarStyle: {
        backgroundColor: "#2C5D9E"
    },
    tabBarActiveTintColor: "#F6821F",
    tabBarInactiveTintColor: "#FFF"
}


const tabs = [
    {
        name: 'Inicio',
        component: Principal,
        icon:'home',      
    },    
    {
        name: 'Perfil',
        component: Perfil,
        icon:'person',      
    },
    {
        name: 'Minhas Viagens',
        component: MinhasViagens,
        icon:'ribbon',
        
    },
]


export default function Tabs() {
    return (
      <Tab.Navigator screenOptions={screenOptions}>
        {tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={tab.icon} color={color} size={size} />

              )
            }}
          />
        ))
        }
      </Tab.Navigator>
    )
  }