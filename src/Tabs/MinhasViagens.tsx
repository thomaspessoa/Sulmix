import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, VStack, Image, Divider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useToast } from 'native-base';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Logo from '../assets/logo.png';
import { CardHistorico } from '../componentes/CardHistorico';
import { Titulo } from '../componentes/Titulo';
import { addDoc } from 'firebase/firestore';


const MinhasViagens = ({ route, navigation }) => {
  const [viagens, setViagens] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);
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
          const querySnapshot = await getDocs(query(viagensRef, where('uid', '==', usuarioAtual.uid)));

          const viagensData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setViagens(viagensData);
          
          await AsyncStorage.setItem('viagens', JSON.stringify(viagensData));
        }
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
      }x
    };

    carregarViagensSalvas();
  }, [usuarioAtual]);

  const adicionarNovaViagem = useCallback(
    async (placa) => {
      try {
        const firestore = getFirestore();
        const viagensRef = collection(firestore, 'Viagens');

        const ultimaViagem = viagens.length > 0 ? viagens[viagens.length - 1] : null;

        if (ultimaViagem && ultimaViagem.status === 'Em Andamento') {
          console.error('Não é possível adicionar uma nova viagem. A última viagem ainda está em andamento.');
          return;
        }

        const novaViagem = {
          nome: 'Novo Passageiro',
          transportadora: 'Nova Transportadora',
          data: 'Nova Data',
          status: 'Em Andamento',
          foiEntregue: false,
          placa: placa,
          userId: usuarioAtual.uid,
        };

        const docRef = await addDoc(viagensRef, novaViagem);
        novaViagem.id = docRef.id;

        setViagens([...viagens, novaViagem]);

        await AsyncStorage.setItem('Viagens', JSON.stringify([...viagens, novaViagem]));

        toast.show({
          title: 'Check-in Feito com Sucesso!',
          backgroundColor: '#0EDF23',
          fontSize: 'xs',
        });
      } catch (error) {
        console.error('Erro ao adicionar viagem:', error);
      }
    },
    [viagens, usuarioAtual, toast]
  );

  return (
    <ScrollView flex={1} p={1} bg={'#DDECFF'} marginTop={'-5%'}>
      <VStack>
        <Image source={Logo} alt='Logo Sulmix' alignSelf={'center'} size={'210'} />
      </VStack>

      <Divider mt={'-10%'} bg={'yellow.900'} />

      <Titulo color={'#F6821F'} fontWeight={'bold'} fontSize={'xl'} mt={7}>
        Minhas Viagens:
      </Titulo>

      {viagens.map((viagem, index) => (
        <CardHistorico
          key={index}
          nome={viagem.nome}
          transportadora={viagem.transportadora}
          data={viagem.data}
          status={viagem.status}
          foiEntregue={viagem.foiEntregue}
          horario={viagem.horario}  // Certifique-se de que a propriedade horario existe no seu objeto viagem
          placa={viagem.placa}      // Certifique-se de que a propriedade placa existe no seu objeto viagem
        />
      ))}

    </ScrollView>
  );
};
export default MinhasViagens;