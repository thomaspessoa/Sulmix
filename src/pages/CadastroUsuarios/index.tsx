import React, { useState } from 'react';
import { VStack, Image, Divider, Button, ScrollView, KeyboardAvoidingView, Center } from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { EntradaTextoSenha } from '../../componentes/EntradaTextoSenha';
import Logo from "../../assets/logo.png";
import { Toast, useToast } from 'native-base';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebaseConfig';
import { SelectList } from 'react-native-dropdown-select-list';
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

export default function CadastroUsuarios({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [nome, setNome] = useState("");
  const [perfil, setPerfil] = useState(null);
  const toast = useToast();
  const [telefone, setTelefone] = useState('');

  const data = [
    { key: '1', value: 'Administrador' },
    { key: '2', value: 'Caixa' },
    { key: '3', value: 'Atendimento' },
  ];

  const CadastroFirebase = async () => {
    if (senha !== confirmeSenha) {
      toast.show({
        title: "( Erro ) Senhas diferentes",
        backgroundColor: "#FF2222",
        fontSize: "xs"
      });
      return;
    }

    if (nome === '') {
      toast.show({
        title: "( Erro ) Insira algum nome  ",
        backgroundColor: "#FF2222",
        fontSize: "xs"
      });
      return;
    }

    if (email === '') {
      toast.show({
        title: "( Erro ) Email Vazio  ",
        backgroundColor: "#FF2222",
        fontSize: "xs"
      });
      return;
    }

    if (perfil === null) {
      toast.show({
        title: "( Erro ) Selecione um Perfil  ",
        backgroundColor: "#FF2222",
        fontSize: "xs"
      });
      return;
    }

    if (!telefone || telefone.replace(/\D/g, '').length !== 11) {
      toast.show({
        title: "( Erro ) Número de telefone inválido",
        backgroundColor: "#FF2222",
        fontSize: "xs",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const usuarioData = {
        nome: nome,
        email: email,
        perfil: perfil,
        telefone: telefone,
      };

      const docRef = await addDoc(collection(firestore, 'Usuario'), usuarioData);

      navigation.navigate("Tabs");
      toast.show({
        title: "Conta Cadastrada!",
        backgroundColor: "#0EDF23",
        fontSize: "xs"
      });
    } catch (error) {
      console.error(error);

      if (error.code === 'auth/invalid-email') {
        toast.show({
          title: "Email inválido!",
          backgroundColor: "#FF2222",
          fontSize: "xs"
        });
      } else if (error.code === 'auth/email-already-in-use') {
        toast.show({
          title: "Já existe uma conta com o endereço de email fornecido!",
          backgroundColor: "#FF2222",
          fontSize: "xs"
        });
      } else if (error.code === 'auth/weak-password') {
        toast.show({
          title: "Senha muito fraca!",
          backgroundColor: "#FF2222",
          fontSize: "xs"
        });
      }
    }
  };


  return (
    <KeyboardAvoidingView flex={1} p={2} behavior='padding' keyboardVerticalOffset={2}>
      <ScrollView w={'95%'} mt={'8%'} bg={'#DDECFF'} borderRadius={'lg'} p={'3%'} borderWidth={'1'} borderColor={'#F6821F'} alignSelf={'center'}>
        <Center>
          <Image source={Logo} alt="Logo Sulmix" width={'80%'} height={'120px'} mt={'1%'} mb={'2%'} />
        </Center>

        <Divider mt={'1%'} bg={'black'} />

        <Titulo fontweight="bold" color='#F6821F'>
          Cadastro de Usuário
        </Titulo>

        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          onChange={(text) => setEmail(text)}
          value={email}
        />

        <EntradaTexto
          label="Nome"
          placeholder="Insira o nome"
          onChange={(text) => setNome(text)}
          value={nome}
        />

        <EntradaTextoNumeros 
                label='Telefone:'
                placeholder='Informe o telefone'
                onChange={(text) => setTelefone(formatarTelefone(text))}
                value={telefone} 
              />

        <EntradaTextoSenha
          secureTextEntry={true}
          label="Senha"
          placeholder="Insira sua senha"
          onChange={(text) => setSenha(text)}
          value={senha}
        />

        <EntradaTextoSenha
          secureTextEntry={true}
          label="Confirmar Senha:"
          placeholder="Confirme sua senha "
          onChange={(text) => setConfirmeSenha(text)}
          value={confirmeSenha}
        />

        <SelectList
          boxStyles={{
            marginTop: '8%',
            borderBlockColor: 'black',
            borderColor: '#F6821F',
            borderBlockEndColor: '#F6821F',
            borderBlockStartColor: '#F6821F',
            backgroundColor: 'white',
          }}
          placeholder='Selecione o Perfil'
          searchPlaceholder='Pesquisa perfil'
          setSelected={(val) => setPerfil(val)}
          data={data}
          save="value"
          onSelect={() => alert(perfil)}
        />

        <Button
          onPress={CadastroFirebase}
          mt={'7%'}
          borderRadius={'lg'}
          w={'80%'}
          alignSelf={'center'}
          bg={'#F6821F'}
          shadow={'5'}
        >
          Adicionar
        </Button>

        <Button
          onPress={() => navigation.goBack()}
          mt={'7%'}
          borderRadius={'lg'}
          w={'80%'}
          alignSelf={'center'}
          bg={'#F56161'}
          shadow={'5'}
          mb={'16%'}
        >
          Voltar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
