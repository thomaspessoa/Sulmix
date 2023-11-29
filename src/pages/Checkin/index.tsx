import { Text, Box, VStack, Input, Button, useToast } from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { app, auth } from '../../config/firebaseConfig';
import { KeyboardAvoidingView } from 'native-base';
import { Platform, ScrollView } from 'react-native';
import { format } from 'date-fns';




export default function Checkin({ navigation }) {
  const [placa, setPlaca] = useState({ placa: '' });
  const toast = useToast();

  const AlterText = (event, type) => {
    setPlaca({ ...placa, placa: event });
  };

  const salvarViagem = async (usuario) => {
    try {
      const firestore = getFirestore();
      const colecaoViagens = collection(firestore, 'Viagens');
  
      // Verifica se o usuário já possui uma viagem em andamento
      const viagemAtualSnapshot = await getDocs(
        query(
          colecaoViagens,
          where('uid', '==', usuario.uid),
          where('status', '==', 'Em Andamento')
        )
      );
  
      if (viagemAtualSnapshot.size === 0) {
        // Usuário não possui uma viagem em andamento, pode adicionar uma nova
        const querySnapshot = await getDocs(query(colecaoViagens, where('placa', '==', placa.placa)));
  
        if (querySnapshot.size === 0) {
          // Placa não existe, pode adicionar uma nova viagem
          const dataAtual = new Date();
          const dadosViagem = {
            placa: placa.placa,
            nome: usuario.nome ? usuario.nome.stringValue || '' : '',
            status: 'Em Andamento',
            transportadora: usuario.transportadora ? usuario.transportadora.stringValue || '' : '',
            data: format(dataAtual, 'dd/MM/yyyy'),
            horario: format(dataAtual, 'HH:mm:ss'),
            uid: usuario.uid,
          };
  
          const novaViagemRef = await addDoc(colecaoViagens, dadosViagem);
  
          console.log('Viagem adicionada com sucesso:', novaViagemRef.id);
  
          toast.show({
            title: 'Check-in Feito com Sucesso!',
            backgroundColor: '#0EDF23',
            fontSize: 'xs',
          });
  
          // Execute outras ações ou navegação conforme necessário
          try {
            await navigation.navigate("Minhas Viagens");
          } catch (error) {
            console.error('Erro ao navegar:', error);
          }
        } else {
          // Placa já existe, verificar status da última viagem
          const ultimaViagem = querySnapshot.docs[0].data();
  
          if (ultimaViagem.status === 'Entregue') {
            // Status da última viagem é "Entregue", permitir criar uma nova viagem
            const dataAtual = new Date();
            const dadosViagem = {
              placa: placa.placa,
              nome: usuario.nome ? usuario.nome.stringValue || '' : '',
              status: 'Em Andamento',
              transportadora: usuario.transportadora ? usuario.transportadora.stringValue || '' : '',
              data: format(dataAtual, 'dd/MM/yyyy'),
              horario: format(dataAtual, 'HH:mm:ss'),
              uid: usuario.uid,
            };
  
            const novaViagemRef = await addDoc(colecaoViagens, dadosViagem);
  
            console.log('Viagem adicionada com sucesso:', novaViagemRef.id);
  
            toast.show({
              title: 'Check-in Feito com Sucesso!',
              backgroundColor: '#0EDF23',
              fontSize: 'xs',
            });
  
            // Execute outras ações ou navegação conforme necessário
            try {
              await navigation.navigate("Minhas Viagens");
            } catch (error) {
              console.error('Erro ao navegar:', error);
            }
          } else {
            // Placa já existe e a última viagem não está "Entregue"
            toast.show({
              title: 'Erro ao adicionar nova viagem',
              description: 'Você já possui uma viagem registrada com essa placa. Aguarde ou finalize a viagem existente.',
              backgroundColor: '#FF2222',
              fontSize: 'xs',
            });
          }
        }
      } else {
        // Usuário já possui uma viagem em andamento, exiba uma mensagem apropriada
        toast.show({
          title: 'Erro ao adicionar nova viagem',
          description: 'Você já possui uma viagem em andamento. Finalize-a antes de adicionar uma nova.',
          backgroundColor: '#FF2222',
          fontSize: 'xs',
        });
      }
    } catch (error) {
      console.error('Erro ao salvar viagem no Firebase:', error);
    }
  };
  
  
  const AcessoInfo = async () => {
    if (placa.placa) {
      const usuarioAtual = auth.currentUser;

      if (usuarioAtual) {
        const firestore = getFirestore();
        const docRef = doc(firestore, 'Usuario', usuarioAtual.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dadosUsuario = docSnap._document.data.value.mapValue.fields;

          if (dadosUsuario.placa.stringValue === placa.placa) {
            salvarViagem({
              ...dadosUsuario,
              uid: usuarioAtual.uid,
            });
          } else {
            toast.show({
              title: 'Placa inválida',
              backgroundColor: '#FF2222',
              fontSize: 'xs',
            });
          }
        } else {
          console.log('Documento do usuário não encontrado no Firestore');
        }
      } else {
        console.log('Usuário não autenticado');
      }
    } else {
      toast.show({
        title: 'Informe a Placa!',
        backgroundColor: '#FF2222',
        fontSize: 'xs',
      });
    }
  };



  return (
    <KeyboardAvoidingView
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView width={'90%'} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <VStack p={2} bg={'#B7D7FF'} borderRadius={'lg'} borderWidth={1} borderColor={'#F6821F'}>
          <Box justifyContent={'flex-start'} alignItems={'flex-start'} mt={3} pl={2}>
            <Titulo mb={4} color={'#F6821F'}>
              Placa
            </Titulo>
          </Box>

          <EntradaTexto
            label="Placa:"
            placeholder="Informe somente a placa principal"
            onChange={AlterText}
          />

          <Button onPress={() => AcessoInfo()} mt={10} bg={'#F6821F'} w={'70%'} alignSelf={'center'} borderRadius={'lg'}>
            Adicionar Placa
          </Button>

          <Button onPress={() => navigation.goBack()} mt={4} bg={'#F56161'} w={'70%'} alignSelf={'center'} borderRadius={'lg'} mb={'7%'}>
            Voltar
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}