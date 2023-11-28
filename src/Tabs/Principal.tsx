import React, { useEffect, useState } from 'react';
import { ScrollView, VStack, Image, Divider, Button } from 'native-base';
import { CardInicio } from '../componentes/CardInicio';
import { CardAcessoInicio } from '../componentes/CardAcessoInicio';
import Logo from '../assets/logo.png';
import { TouchableOpacity } from 'react-native';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';

export default function Principal({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Função para buscar dados do usuário no Firebase
    async function buscarDadosUsuario() {
      const firestore = getFirestore(app);
      const usuarioRef = doc(firestore, 'Usuario', 'PJBoAEz23hOdkybtd1ZCxJqwNWG2');

      try {
        const snapshot = await getDoc(usuarioRef);
        if (snapshot.exists()) {
          const dadosUsuario = snapshot.data();
          setUsuario(dadosUsuario);
        } else {
          console.log('Documento não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    buscarDadosUsuario();
  }, []);




  
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
    
            <TouchableOpacity
             activeOpacity={0.6}
             > 
            <CardAcessoInicio 
            nome='Dashboards'
            icone='stats-chart'
            />
            </TouchableOpacity>

            
            <TouchableOpacity
                onPress={() => navigation.navigate('CadastroUsuarios')}
                activeOpacity={0.6}
            >
            <CardAcessoInicio 
            nome='Cadastro de usuários'
            icone='person-add'
            />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Checkin')}
                activeOpacity={0.6}
                >
            <CardAcessoInicio 
            nome='Check-in'
            icone='calendar'
            />
            </TouchableOpacity>
           
           
            <TouchableOpacity 
            onPress={() => navigation.navigate('Minhas Viagens')}
            activeOpacity={0.6}  
            >
            <CardAcessoInicio 
            nome='Minhas viagens '
            icone='ribbon'
            />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Coletas')}>
            <CardAcessoInicio      
            nome='Coletas'
            icone='archive'
            />
            </TouchableOpacity>





            <Button  onPress={() => navigation.navigate("Login")} 
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