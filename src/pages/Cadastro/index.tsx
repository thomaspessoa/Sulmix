import {
  Image,
  Text,
  Box,
  Button,
  ScrollView,
  useToast,
  View,
} from "native-base";

import { EntradaTexto } from "../../componentes/EntradaTexto";
import Logo from "../../assets/logo.png";
import { Titulo } from "../../componentes/Titulo";
import React, { useState } from "react";
import { secoes } from "../../utils/CadastroEntradaTexto";
import Principal from "../../Tabs/Principal";
import { EntradaTextoSenha } from "../../componentes/EntradaTextoSenha";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { TextInput, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet } from "react-native/Libraries/StyleSheet/StyleSheet";
import { KeyboardAvoidingView } from "native-base";

export default function Cadastro({ navigation }) {
  // const [numSecao, setNumeroSecao] = useState(0);
  // const [registro, setRegistro] = useState({email: "", senha: "", confirmeSenha: ""});


  const [email,setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const toast = useToast()

    
  const CadastroFirebase = () => {

    if (senha !== confirmeSenha) {
      toast.show({
        title: "Senhas diferentes",
        backgroundColor: "#FF2222",
        fontSize: "xs"
      });
      return; // Retorna antes de chamar createUserWithEmailAndPassword se as senhas são diferentes
    }

    createUserWithEmailAndPassword  (auth, email, senha)
    .then((userCredential) => {
      if ( email && senha ){ 
        navigation.navigate("Login")
        toast.show({
          title: " Conta Cadastrada !",
         backgroundColor:"#0EDF23",
          fontSize:"xs"
        })
  
     }      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      if(error.code === 'auth/invalid-email'){
        console.log('Email invalido  ');
        toast.show({
          title: "Email invalido ! ",
          backgroundColor:"#FF2222",
          fontSize:"xs"   
        })
      }
      
      if(error.code === 'auth/email-already-in-use'){
        console.log(' Já existi uma conta com o endereço de email fornecido');
          toast.show({
          title: "Já existi uma conta com o endereço de email fornecido ! ",
          backgroundColor:"#FF2222",
          fontSize:"xs"   
          });
      }

      if(error.code === 'auth/weak-password'){
        console.log(' Senha muito Fraca');
          toast.show({
          title: "Senha muito Fraca  ",
          backgroundColor:"#FF2222",
          fontSize:"xs"   
          });
      }


      console.log(errorMessage)
    });
    }


  return (
    
    <KeyboardAvoidingView flex={1} p={6} mt={'10%'}  behavior='padding' keyboardVerticalOffset={8}>
      <ScrollView width={'100%'}>
      <Image
        source={Logo}
        alt="Logo Sulmix"
        width={"70%"}
        height={"17%"}
        alignSelf={"center"}
        mt={'4%'}
      />

      <Box justifyContent={'center'}>

      <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          onChange={(text) => setEmail(text)}
          value={email}
       
        />

        <EntradaTextoSenha
          label="Senha:"
          placeholder="Insira uma senha"
          onChange={(text) => setSenha(text)}
          value={senha}
   
        /> 

        <EntradaTextoSenha
          label="Confirme a senha: "
          placeholder="Confirme sua senha"
          onChange={(text) => setConfirmeSenha(text)}
          value={confirmeSenha}
        />

   

      </Box>

      <Button
      onPress={() => CadastroFirebase() }
        w={"100%"}
        height={"10%"}
        bgColor={"#F6821F"}
        mt={10}
        borderRadius={"lg"}
        shadow={"7"}
        alignSelf={"center"}
      >
        Registrar
      </Button>

      <Text
        onPress={() => navigation.goBack()}
        mt={5}
        fontSize={"md"}
        color={"#F6821F"}
        fontWeight={"bold"}
        textDecorationLine={"underline"}
        textDecorationColor={"#F6821F"}
        mb={'40%'}
        alignSelf={"center"}
      >
        {" "}
        Voltar
      </Text>
      </ScrollView>
    </KeyboardAvoidingView>
     
  );
}


