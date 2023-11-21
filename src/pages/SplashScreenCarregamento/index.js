import React, { useEffect } from 'react';
import { View,Text } from 'react-native';
import LottieView from 'lottie-react-native';
import  Carregamento  from '../../assets/Loading.json'

import { TituloSplashScreen } from '../../componentes/TituloSplashScreen';

export default function SplashScreenCarregamento({ navigation }) {

    const animacaoFinalizada = () => {
        console.log('Terminou');
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Tabs' }],
            });
        }, 1600); // Ajuste o tempo em milissegundos conforme necessário
    };

    useEffect(() => {
        return () => {
            // Limpeza ou manipulação de desmontagem do componente, se necessário
        };
    }, [navigation]);



    return (

        <View style={styles.container}>

            <TituloSplashScreen color='#F6821F' >
            </TituloSplashScreen>

            <LottieView
                style={styles.lottie}
                source={Carregamento}
                loop={true}
                autoPlay={true}
                onAnimationFinish={animacaoFinalizada}
            />

        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    lottie: {
        width: 230, // Ajuste a largura conforme necessário
        height: 230, // Ajuste a altura conforme necessário
    },
    
};