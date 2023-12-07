import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useToast } from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { VStack, Button } from 'native-base';
import { getDocs, collection } from 'firebase/firestore';
import { app } from '../../config/firebaseConfig';
import { SelectList } from 'react-native-dropdown-select-list';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';
import { EntradaTextoNumeros } from '../../componentes/EntradaTextoNumeros';

const formatarTelefone = (input) => {
  // Remove todos os não dígitos
  const cleaned = input.replace(/\D/g, '');

  if (cleaned.length <= 11) {
    let formattedNumber = `(${cleaned.slice(0, 2)})`;

    if (cleaned.length > 2) {
      formattedNumber += `-${cleaned.slice(2, 3)}`;

      if (cleaned.length > 3) {
        formattedNumber += `-${cleaned.slice(3, 7)}`;

        if (cleaned.length > 7) {
          formattedNumber += `-${cleaned.slice(7, 11)}`;
        }
      }
    }

    return formattedNumber;
  }

  // Se houver mais de 11 dígitos, retorna apenas os primeiros 11
  return cleaned.slice(0, 11);
};

const handleNotification = async () => {
  try {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();

      if (newStatus !== 'granted') {
        Alert.alert('Você não permitiu notificações!');
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Token:', token);

    const user = auth.currentUser;
    const userRef = doc(getFirestore(), 'Usuario', user.uid);
    await setDoc(userRef, { expoPushToken: token }, { merge: true });

    console.log('Token adicionado à coleção do usuário com sucesso!');
    console.log('Agendando notificação...');
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Sulmix',
        body: 'Houve uma alteração em sua Viagem',
        sound: 'default',
      },
      trigger: {
        seconds: 5,
      },
    });

    console.log('Notificação agendada com sucesso!');
  } catch (error) {
    console.error('Erro ao lidar com notificação:', error);
  }
};

export default function AtualizarPerfil({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [transportadora, setTransportadora] = useState('');
  const toast = useToast();
  const [transportadoras, setTransportadoras] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [placa, setPlaca] = useState('');
  const [perfil, setPerfil] = useState('Motorista');
  const [token, setToken] = useState([]);

  const AtualizarDadosPerfil = async () => {
    
    try {
      const user = auth.currentUser;

      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'Transportadora'));
      setTransportadoras(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(transportadoras);

      if (nome.trim() === '' || telefone.trim() === '' || transportadora.trim() === '') {
        toast.show({
          title: 'Por favor, preencha todos os campos.',
          backgroundColor: '#FF0000',
          fontSize: 'xs',
        });
        return;
      }

      // Obtenha o token ExpoPushToken
      let token;
      try {
        token = await Notifications.getExpoPushTokenAsync();
        console.log('Token:', token);
      } catch (error) {
        console.error('Erro ao obter o token de notificação:', error);
      }

      // Verifique se o token foi obtido com sucesso antes de prosseguir
      if (!token) {
        toast.show({
          title: 'Erro ao obter o token de notificação.',
          backgroundColor: '#FF0000',
          fontSize: 'xs',
        });
        return;
      }

      const userRef = doc(getFirestore(), 'Usuario', user.uid);
      await setDoc(userRef, {
        nome,
        telefone,
        transportadora,
        placa,
        perfil,
        token,
      });

      await updateProfile(auth.currentUser, {
        displayName: nome,
      });

      toast.show({
        title: 'Dados Atualizados!',
        backgroundColor: '#0EDF23',
        fontSize: 'xs',
      });

      navigation.navigate('Tabs');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.message);
      toast.show({
        title: 'Erro ao atualizar os dados!',
        backgroundColor: '#FF0000',
        fontSize: 'xs',
      });
    }
  };

  useEffect(() => {
    async function fetchTransportadoras() {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, 'Transportadora'));
        setTransportadoras(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Erro ao buscar transportadoras:', error.message);
      }
    }

    fetchTransportadoras();
  }, []);

  useEffect(() => {
    setData(transportadoras.map(({ id, NomeTransportadora }) => ({ key: id, value: NomeTransportadora })));
  }, [transportadoras]);

  return (
    <KeyboardAvoidingView bg={'black'} flex={1} bgColor={'#DDECFF'} behavior='height' keyboardVerticalOffset={20}>
      <ScrollView>
        <VStack p={'2%'} w={'95%'} bg={'white'} borderRadius={'lg'} borderWidth={'2%'} borderColor={'#F6821F'} alignSelf={'center'} top={'15%'}>
          <Titulo color={'#F6821F'} fontSize={'lg'} fontWeight={'black'}>
            Atualizar Perfil
          </Titulo>
          <EntradaTexto label='Nome:' placeholder='Informe o nome' onChange={(text) => setNome(text)} value={nome} />
          <EntradaTextoNumeros
            label='Telefone:'
            placeholder='Informe o telefone'
            onChange={(text) => setTelefone(formatarTelefone(text))}
            value={telefone}
          />
          <EntradaTexto label='Placa:' placeholder='Informe a placa' onChange={(text) => setPlaca(text)} value={placa} />
          <SelectList
            boxStyles={{
              marginTop: '8%',
              borderBlockColor: 'black',
              borderColor: '#F6821F',
              borderBlockEndColor: '#F6821F',
              borderBlockStartColor: '#F6821F',
              backgroundColor: 'white',
            }}
            placeholder='Transportadora'
            searchPlaceholder='Informe o perfil'
            setSelected={(val) => setTransportadora(val)}
            data={data}
            save='value'
            onSelect={() => alert(transportadora)}
            // Ajustes para garantir que o SelectList ocupe a tela inteira
            flex={1}
  
          />
          <Button onPress={AtualizarDadosPerfil} mt={'10%'} bg={'#F6821F'} borderRadius={'lg'} w={'70%'} alignSelf={'center'} shadow={'6'} mb={'6%'}>
            Atualizar Dados
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
