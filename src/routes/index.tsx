import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Tabs from '../Tabs';


const Tab = createNativeStackNavigator();


import SplashScreen from '../pages/SplashScreen';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Checkin from '../pages/Checkin';
import Coletas from '../pages/Coletas';
import InformacoesColeta from '../pages/InformacoesColeta';
import InformacoesCarregamento from '../pages/InformacoesCarregamento';
import AtualizarPerfil from '../pages/AtualizarPerfil';
import AtivarLocalizacao from '../pages/AtivarLocalizacao';
import CadastroUsuarios from '../pages/CadastroUsuarios';
import SplashScreenCarregamento from '../pages/SplashScreenCarregamento';
import MinhasViagens from '../Tabs/MinhasViagens';

export default function Rotas() { 
    return(
        <NavigationContainer>
            <Tab.Navigator>

            <Tab.Screen 
                    name="SplashScreen" component={SplashScreen} options={{headerShown: false}}
                />

                <Tab.Screen 
                    name="Login" component={Login} options={{headerShown: false}}
                />


                <Tab.Screen 
                    name="Cadastro" component={Cadastro} options={{headerShown: false}}
                />

                <Tab.Screen 
                    name="SplashScreenCarregamento" component={SplashScreenCarregamento} options={{headerShown: false}}
                />

                <Tab.Screen 
                    name="Tabs" component={Tabs} options={{headerShown: false}}                    
                />

                <Tab.Screen 
                    name="AtualizarPerfil" component={AtualizarPerfil} options={{headerShown: false}}
                />


                <Tab.Screen 
                    name="Checkin" component={Checkin} options={{headerShown: false}}
                />


                <Tab.Screen 
                    name="MinhasViagens" component={MinhasViagens} options={{headerShown: false}}
                />
                
                <Tab.Screen 
                    name="Coletas" component={Coletas} options={{headerShown: false}}
                />

                <Tab.Screen 
                    name="AtivarLocalizacao" component={AtivarLocalizacao} options={{headerShown: false}}
                />
                          
                <Tab.Screen 
                    name="InformacoesCarregamento" component={InformacoesCarregamento} options={{headerShown: false}}
                />   

                <Tab.Screen 
                    name="InformacoesColeta" component={InformacoesColeta} options={{headerShown: false}}
                />

                <Tab.Screen 
                    name="CadastroUsuarios" component={CadastroUsuarios} options={{headerShown: false}}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}