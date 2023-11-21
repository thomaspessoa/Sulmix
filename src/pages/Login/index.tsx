import {
  VStack,
  Image,
  Center,
  Text,
  Box,
  FormControl,
  Input,
  Button,
  Link,
  useToast,
  KeyboardAvoidingView,
  View,
  ScrollView

} from "native-base";
import { Platform, TextInput, TouchableOpacity } from "react-native";
import { Botao } from "../../componentes/Botão";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Logo from "../../assets/logo.png";
import { Titulo } from "../../componentes/Titulo";
import { useEffect, useState } from "react";
import { EntradaTextoSenha } from "../../componentes/EntradaTextoSenha";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { getFirestore } from 'firebase/firestore';
import { getDoc,doc } from 'firebase/firestore';
import { app} from '../../config/firebaseConfig'
import SplashScreenCarregamento from "../SplashScreenCarregamento";

export default function Login({ navigation }) {
  const [email,setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const toast = useToast()
  const [loginSuccess, setLoginSuccess] = useState(false);
  const db = getFirestore(app);
  const [user, setUser] = useState();
  const [cep, setCep] = useState('');
  const [pesCep, setPescep] = useState({});

    const loginFirebase= async () => {


    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        // Verifique se o usuário atualizou o perfil
        if (user.displayName) {
          // O usuário já atualizou o perfil, navegue até a página de abas (Tabs)
          setLoginSuccess(true);
          navigation.navigate('SplashScreenCarregamento');
  
          toast.show({
            title: 'Login Realizado!',
            backgroundColor: '#0EDF23',
            fontSize: 'xs',
          });
          
        } else {
          // O usuário ainda não atualizou o perfil, navegue até a página de atualização do perfil
          setLoginSuccess(true);
          navigation.navigate('AtualizarPerfil');
  
          toast.show({
            title: 'Login Realizado! Por favor, atualize seu perfil.',
            backgroundColor: '#0EDF23',
            fontSize: 'xs',
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        if (errorCode === 'auth/invalid-email') {
          console.log('Email inválido');
          toast.show({
            title: 'Email inválido!',
            backgroundColor: '#FF2222',
            fontSize: 'xs',
          });
        }
  
        if (errorCode === 'auth/invalid-login-credentials') {
          console.log('Senha incorreta');
          toast.show({
            title: 'Senha incorreta. Tente novamente!',
            backgroundColor: '#FF2222',
            fontSize: 'xs',
          });
        }
  
        console.log(errorMessage);
      });
  };

// Tela Login Sulmix 
  
return (
  <KeyboardAvoidingView 
    flex={1}
    p={6} 
    justifyContent={'center'} 
    alignItems={'center'} 
    behavior='padding' 
    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Ajuste para iOS
  >
    <ScrollView width={'100%'} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Image source={Logo} alt="Logo Sulmix" width={"70%"} height={"20%"} alignSelf={'center'}/>
      <Titulo> Faça o login em sua conta </Titulo>
      <Box>
        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          onChange={(text) => setEmail(text)}
          value={email}
        />
        <EntradaTextoSenha
          secureTextEntry={true}
          label="Senha"
          placeholder="Insira sua senha"
          onChange={(text) => setSenha(text)}
          value={senha}
        />
 
      </Box>

       
<TouchableOpacity
  onPress={loginFirebase}
  style={{
    width: "100%",
    height: '8.25%',
    backgroundColor: "#F6821F",
    marginTop: '10%',
    borderRadius: 10,
    shadowOpacity: 0.43,
    alignSelf: 'center',
    justifyContent: 'center',  
    alignItems: 'center',  
  }}
>
  <Text style={{ color: 'white'}}>Entrar</Text>
</TouchableOpacity>
      
      <Box w={"100%"} flexDirection={"row"} justifyContent={"center"} mt={8}>
        <Text fontWeight={"semibold"}>Ainda não tem conta ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text
            
            color={"#F6821F"}
            fontWeight={"bold"}
            textDecorationLine={"underline"}  
            textDecorationColor={"#F6821F"}
            mb={'50%'}
          >
        
            Faça seu Cadastro!
          </Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  </KeyboardAvoidingView>
);
} 