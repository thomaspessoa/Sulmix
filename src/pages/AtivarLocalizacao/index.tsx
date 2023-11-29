    import { View } from 'react-native';
    import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy,
    } from 'expo-location';
    import { useState, useEffect } from "react";
    import { Button } from 'native-base';
    import { getFirestore, addDoc, collection } from 'firebase/firestore';
    import { app } from '../../config/firebaseConfig';

    export default function AtivarLocalizacao({ navigation }) {
    const [location, setLocation] = useState<LocationObject | null>(null);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
        }
    }

    useEffect(() => {
        requestLocationPermissions();
    }, []);

    useEffect(() => {
        const unsubscriber = watchPositionAsync(
        {
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        },
        (response) => {
            setLocation(response);
            // Envie a localização para o Firebase quando houver uma atualização
            enviarLocalizacaoParaFirebase(response);
        }
        );

        return () => {
        // Limpe o observador quando o componente for desmontado
        unsubscriber.remove();
        };
    }, []);

    const enviarLocalizacaoParaFirebase = async (localizacao) => {
        try {
        const db = getFirestore(app);
        const viagensCollection = collection(db, 'Viagens');

        // Adicione um novo documento com os dados da localização
        await addDoc(viagensCollection, {
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            timestamp: new Date(),
        });

        console.log('Localização enviada para o Firebase!');
        } catch (error) {
        console.error('Erro ao enviar localização para o Firebase:', error);
        }
    };

    return (
        <View style={styles.container}>
        <Button
            onPress={() => navigation.goBack()}
            mb={'3%'}
            position={'absolute'}
            p={'4%'}
            bottom={'0%'}
            width={'20%'}
            background={'#F56161'}
            borderRadius={'lg'}
        >
            Voltar
        </Button>
        </View>
    );
    }
