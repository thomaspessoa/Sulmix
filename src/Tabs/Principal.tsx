import React, { useEffect, useState } from 'react';
import { ScrollView, VStack, Image, Divider, Button } from 'native-base';
import { CardInicio } from '../componentes/CardInicio';
import { CardAcessoInicio } from '../componentes/CardAcessoInicio';
import Logo from '../assets/logo.png';
import { TouchableOpacity } from 'react-native';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';

export default function Principal({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Função para buscar dados do usuário no Firebase
    async function buscarDadosUsuario() {
      const firestore = getFirestore(app);

      // Obtenha o usuário atualmente autenticado
      const usuarioAtual = auth.currentUser;

      // Verifique se há um usuário autenticado antes de continuar
      if (usuarioAtual) {
        const usuarioRef = doc(firestore, 'Usuario', usuarioAtual.uid);

        try {
          const snapshot = await getDoc(usuarioRef);
          if (snapshot.exists()) {
            const dadosUsuario = snapshot.data();
            console.log('Dados do usuário:', dadosUsuario);
            setUsuario(dadosUsuario);
          } else {
            console.log('Documento não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        console.log('Nenhum usuário autenticado');
      }
    }

    buscarDadosUsuario();
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