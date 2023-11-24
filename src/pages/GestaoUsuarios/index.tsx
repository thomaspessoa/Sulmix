
/*
import React, { useState } from 'react';
import { VStack, ScrollView, Text, Input, Button, View, Image } from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import Logo from '../../assets/logo.png';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { getAuth, updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebaseConfig';
import { KeyboardAvoidingView } from 'native-base';
import { doc, getDoc } from 'firebase/firestore';

export default function GestaoUsuarios() {
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigation = useNavigation();

  const perfil = [
    { key: '1', value: 'Administrador' },
    { key: '2', value: 'Caixa' },
    { key: '3', value: 'Motorista' },
  ];

  const buscarUsuario = async () => {
    try {
      console.log('Iniciando busca do usuário');
      const usuariosRef = collection(firestore, 'Usuario');

      const q = searchInput
        ? query(usuariosRef, where('nome', '==', searchInput.trim()))
        : query(usuariosRef);

      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        const usuario = querySnapshot.docs[0].data();
        const usuarioId = querySnapshot.docs[0].id;

        const authUser = getAuth().currentUser;

        if (authUser) {
          await updateProfile(authUser, {
            displayName: usuario.nome,
          });

          const perfilSelecionado = selected.length > 0 ? selected[0].value : selected[0]?.label || '';


          if (perfilSelecionado) {
            console.log('Perfil selecionado:', perfilSelecionado);

            await updateDoc(doc(firestore, 'Usuario', usuarioId), {
              perfil: perfilSelecionado,
            });

            const updatedUsuario = (await getDoc(doc(firestore, 'Usuario', usuarioId))).data();
            console.log('Usuário Atualizado:', updatedUsuario);

            alert('Perfil do usuário atualizado com sucesso!');
          } else {
            console.log('Nenhum perfil selecionado');
            alert('Selecione um perfil antes de confirmar.');
          }
        } else {
          alert('Usuário autenticado não encontrado.');
        }
      } else {
        alert('Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  return (
    <KeyboardAvoidingView flex={1} p={4} mt={'8%'} behavior="padding" keyboardVerticalOffset={8}>
      <Image source={Logo} alt="Logo Sulmix" width={'70%'} height={'20%'} mt={'2%'} mb={'2%'} alignSelf={'center'} />

      <ScrollView bg={'#D1E5FF'} w={'100%'} p={'2%'} borderColor={'#FF7500'} borderRadius={'lg'} borderWidth={'1'}>
        <Titulo fontweight="bold" color="#F6821F">
          Gestão de usuários
        </Titulo>

        <EntradaTexto
          label="Nome do Usuario:"
          placeholder="Insira o nome do Usuario"
          value={searchInput}
          onChange={(text) => setSearchInput(text)}
        />

        <SelectList
          boxStyles={{
            borderBlockColor: 'black',
            borderColor: '#F6821F',
            borderBlockEndColor: '#F6821F',
            borderBlockStartColor: '#F6821F',
            backgroundColor: 'white',
            marginTop: 50,
          }}
          placeholder="Perfil"
          searchPlaceholder="Informe o perfil"
          setSelected={(val) => setSelected(val)}
          data={perfil}
          save="value"
          onChange={(perfilSelecionado) => {
            setSelected(perfilSelecionado);
          }}
        />

        <Button
          mt={'8%'}
          bg={'green.500'}
          mb={'4%'}
          w={'80%'}
          shadow={'3'}
          borderRadius={'lg'}
          alignSelf={'center'}
          onPress={buscarUsuario}
        >
          Confirmar
        </Button>

        <Button onPress={() => navigation.goBack()} mt={'1%'} bg={'#F56161'} borderRadius={'lg'} w={'80%'} shadow={'3'} alignSelf={'center'}>
          Voltar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
*/