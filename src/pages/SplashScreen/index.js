import React, { useEffect } from 'react';
import { View,Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Caminhao from '../../assets/Caminhao.json'; // Substitua pelo caminho correto
import { Titulo } from '../../componentes/Titulo';
import { TituloSplashScreen } from '../../componentes/TituloSplashScreen';

export default function SplashScreen({ navigation }) {

    const animacaoFinalizada = () => {
        console.log('Terminou');
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }, 2000); // Ajuste o tempo em milissegundos conforme necessário
    };

    useEffect(() => {
        return () => {
            // Limpeza ou manipulação de desmontagem do componente, se necessário
        };
    }, [navigation]);



    return (

        <View style={styles.container}>

            <TituloSplashScreen color='#F6821F' >
                Bem Vindo !
            </TituloSplashScreen>

            <LottieView
                style={styles.lottie}
                source={Caminhao}
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