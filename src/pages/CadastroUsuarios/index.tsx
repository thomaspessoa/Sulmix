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


export default function CadastroUsuarios({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmeSenha, setConfirmeSenha] = useState("");
    const [nome, setNome] = useState("");
    const [perfil, setPerfil] = useState("");
    const toast = useToast();
    const [selected, setSelected] = useState([]);
        
    const data = [
        {key:'1', value:'Administrador'},
        {key:'2', value:'Caixa'},
        {key:'3', value:'Almoxarifado'},

    ]

    const CadastroFirebase = async () => {
        if (senha !== confirmeSenha) {
            toast.show({
                title: " ( Erro ) Senhas diferentes",
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

        if (perfil === '') {
            toast.show({
                title: " ( Erro ) selecione um Perfil  ",
                backgroundColor: "#FF2222",
                fontSize: "xs"
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
  
                
            };

            const docRef = await addDoc(collection(firestore, 'Usuario'), usuarioData);
            
            navigation.navigate("Tabs");
            toast.show({
                title: "Conta Cadastrada!",
                backgroundColor: "#0EDF23",
                fontSize: "xs"
            });
        } catch (error) {
            // Handle errors
            console.error(error);



            // Display error messages to the user
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
        <KeyboardAvoidingView flex={1} p={2}  behavior='padding' keyboardVerticalOffset={2}>
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
                onSelect={() => alert(selected)}    
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
