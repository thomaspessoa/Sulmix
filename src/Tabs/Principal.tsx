import React, { useEffect, useState } from 'react';
import { ScrollView, VStack, Image, Divider, Button } from 'native-base';
import { CardInicio } from '../componentes/CardInicio';
import { CardAcessoInicio } from '../componentes/CardAcessoInicio';
import Logo from '../assets/logo.png';
import { TouchableOpacity } from 'react-native';
import { getDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationAccuracy } from 'expo-location';

export default function Principal({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function buscarDadosUsuario() {
      const firestore = getFirestore(app);
      const usuarioAtual = auth.currentUser;

      if (usuarioAtual) {
        const usuarioRef = doc(firestore, 'Usuario', usuarioAtual.uid);

        try {
          const snapshot = await getDoc(usuarioRef);
          if (snapshot.exists()) {
            setUsuario(snapshot.data());
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    }

    buscarDadosUsuario();
  }, []);

  useEffect(() => {
    const enviarLocalizacaoParaFirebase = async () => {
      const firestore = getFirestore(app);
      const usuarioAtual = auth.currentUser;

      if (usuarioAtual) {
        const usuarioRef = doc(firestore, 'Usuario', usuarioAtual.uid);

        // Obter permissão de localização
        const { status } = await requestForegroundPermissionsAsync();

        if (status === 'granted') {
          // Configurar loop de atualização de localização
          const intervalId = setInterval(async () => {
            const location = await getCurrentPositionAsync({ accuracy: LocationAccuracy.High });

            // Atualizar localização no Firebase
            await updateDoc(usuarioRef, {
              localizacao: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
            });

            console.log('Localização do usuário atualizada:', location.coords.latitude, location.coords.longitude);
          }, 3600000); // Atualizar a cada 1 minuto

          // Limpar intervalo quando o componente for desmontado
          return () => clearInterval(intervalId);
        } else {  
          console.log('Permissão de localização negada');
        }
      }
    };

    enviarLocalizacaoParaFirebase();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };


  
  return (
    <ScrollView flex={1} p={1} bg={'#DDECFF'} >
      <VStack top={'-3%'}>
            <Image source={Logo} alt='Logo Sulmix' alignSelf={'center'} h={225} w={225} />
        </VStack>

            <Divider 
            mt={2}
            bg={'yellow.900'}
            top={'-8%'}
            />
    
          {usuario && usuario.perfil === 'Administrador' && (   
            <TouchableOpacity
             activeOpacity={0.6}
             > 
            <CardAcessoInicio 
            nome='Dashboards'
            icone='stats-chart'
            />
            </TouchableOpacity>
)}


            {usuario && usuario.perfil === 'Administrador' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroUsuarios')}
              activeOpacity={0.6}
            >
              <CardAcessoInicio nome='Cadastro de usuários' icone='person-add' />
            </TouchableOpacity>
          )}


          {usuario && usuario.perfil === 'Motorista' && (

          
            <TouchableOpacity
                onPress={() => navigation.navigate('Checkin')}
                activeOpacity={0.6}
                >
            <CardAcessoInicio 
            nome='Check-in'
            icone='calendar'
            />
            </TouchableOpacity>
           )}


           {usuario && usuario.perfil === 'Motorista' && (

          
            <TouchableOpacity 
            onPress={() => navigation.navigate('Minhas Viagens')}
            activeOpacity={0.6}  
            >
            <CardAcessoInicio 
            nome='Minhas viagens '
            icone='ribbon'
            />
            </TouchableOpacity>
          )}


            <Button  onPress={handleLogout}
            left={2}
            w={'96%'}
            bg={'#F56161'}
            borderRadius={'lg'}
            borderColor={'#FF0000'}
            borderWidth={'1'}
            mt={5}
            mb={8}
            shadow={'7'}

            >
                Sair 
            </Button>
        </ScrollView>
    )
}