import React, { useEffect, useState } from 'react';
import { ScrollView, VStack, Avatar, Text, View } from 'native-base';
import { Titulo } from '../componentes/Titulo';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, 'Usuario', user.uid);

        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const dadosUsuario = docSnap.data();
            setUsuario(dadosUsuario);
          } else {
            console.log('Documento do usuário não encontrado no Firestore');
          }
        } catch (error) {
          console.error('Erro ao obter dados do usuário no Firestore:', error);
        }
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderCampo = (label, valor) => (
    <Text fontSize={'md'} color='black' fontWeight={'semibold'} mt={3} top={'-55'}>
      <Text fontWeight="bold" color={'#F6821F'}>{label}:</Text> <Text>{valor || 'Não disponível'}</Text>
    </Text>
  );

  return (
    <ScrollView flex={1} top={'3%'}>
      <Titulo color="#F6821F" fontWeight="bold" fontSize="lg" mt={'5%'}>
        Meu Perfil
      </Titulo>

      <VStack width="100%" alignSelf="center">
        <VStack
          mt={5}
          flex={1}
          p={'13%'}
          justifyContent={'center'}
          alignSelf={'center'}
          borderRadius="lg"
          borderColor={'#F6821F'}
          background={'#D4E7FF'}
          borderWidth={'2'}
        >

          <Avatar
            size={'120'}
            source={{
              uri:
                usuario?.perfil === 'Administrador'
                  ? 'https://cdn-icons-png.flaticon.com/512/2942/2942813.png'
                  : usuario?.perfil === 'Atendimento'
                  ? 'https://img.freepik.com/vetores-premium/avatar-do-centro-de-atendimento-icone-de-avatar-ilustracao-em-vetor_106788-3430.jpg?w=2000'
                  : usuario?.foto ||
                    'https://i.pinimg.com/originals/a6/de/6d/a6de6d457bc4da659f18b435dd68992e.png',
            }}
            mt={20}
            alignSelf={'center'}
            top={'-70'}
          />

          <Titulo fontSize="lg" color="black" fontWeight="bold" top={'-55'}>
            <Text>{usuario?.nome || 'Nome do Usuário'}</Text>
          </Titulo>
          {renderCampo('Transportadora', usuario?.transportadora)}
          {renderCampo('Perfil', usuario?.perfil)}
          {renderCampo('Telefone', usuario?.telefone)}
          {renderCampo('Placa', usuario?.placa)}
          
        </VStack>
      </VStack>
    </ScrollView>
  );
}
