import React, { useState, useEffect } from 'react';
import { Text, ScrollView, VStack, Image, Divider, Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useToast } from 'native-base';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Logo from '../assets/logo.png';
import { CardHistorico } from '../componentes/CardHistorico';
import { Titulo } from '../componentes/Titulo';



const MinhasViagens = ({ route, navigation }) => {
  const [viagens, setViagens] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [mostrarConcluidas, setMostrarConcluidas] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioAtual(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const carregarViagensSalvas = async () => {
      try {
        if (usuarioAtual) {
          const firestore = getFirestore();
          const viagensRef = collection(firestore, 'Viagens');
          const querySnapshot = await getDocs(
            query(viagensRef, where('uid', '==', usuarioAtual.uid))
          );

          const viagensData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setViagens(viagensData);

          await AsyncStorage.setItem('viagens', JSON.stringify(viagensData));
        }
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
      }
    };

    carregarViagensSalvas();
  }, [usuarioAtual]);

  const filtrarViagens = () => {
    if (mostrarConcluidas) {
      return viagens.filter((viagem) => viagem.status === 'Entregue');
    } else {
      return viagens.filter((viagem) => viagem.status === 'Em Andamento');
    }
  };



  return (
    <ScrollView flex={1} p={1} bg={'#DDECFF'} marginTop={'-5%'}>
      <VStack>
        <Image source={Logo} alt='Logo Sulmix' alignSelf={'center'} size={'210'} />
      </VStack>

      <Divider mt={'-10%'} bg={'yellow.900'} />

      <Titulo color={'#F6821F'} fontWeight={'bold'} fontSize={'xl'} mt={7}>
        Minhas Viagens:
      </Titulo>

      <Button onPress={() => setMostrarConcluidas(!mostrarConcluidas)} mt={4} bg={'#F6821F'} alignSelf={'center'} borderRadius={'lg'}>
        {mostrarConcluidas ? 'Mostrar Em Andamento' : 'Mostrar Concluídas'}
      </Button>

      {filtrarViagens().map((viagem, index) => (
        <CardHistorico
          key={index}
          nome={viagem.nome}
          transportadora={viagem.transportadora}
          data={viagem.data}
          status={viagem.status}
          foiEntregue={viagem.foiEntregue}
          horario={viagem.horario}
          placa={viagem.placa}
        />
      ))}
    </ScrollView>
  );
};
 
  

export default MinhasViagens;
