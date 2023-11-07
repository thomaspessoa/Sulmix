import { View} from 'react-native';
import { Titulo } from '../../componentes/Titulo';
import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy

} from 'expo-location';
import { useState } from "react";
import React, { useEffect } from 'react';
import { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { styles } from './styles';
import { Button, VStack } from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';




export default function AtivarLocalizacao({navigation}) { 
    
    const [location, setLocation] = useState<LocationObject | null >(null);

    const mapRef = useRef<MapView>(null);

    async function requestLocationPermissions() { 
        const { granted} = await requestForegroundPermissionsAsync();

        if( granted ) { 
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        
    }
}

useEffect(() => {
    requestLocationPermissions();

},[]);


useEffect(() => {
    watchPositionAsync({
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1

    }, (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
            pitch: 70,
            
            
            center: response.coords // Camera Centralizada nas cordenadas atuais 


        })

    })

},[]);

return(
    


    <View style={styles.conteiner}>
        
        {    
            location &&    
            <MapView
                
                ref = {mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                
        >
            <Marker
            coordinate={{
                
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }}     
            />

        </MapView>


        }
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

)
}