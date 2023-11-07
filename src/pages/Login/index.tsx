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
  KeyboardAvoidingView

} from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import { Botao } from "../../componentes/Botão";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Logo from "../../assets/logo.png";
import { Titulo } from "../../componentes/Titulo";
import { useEffect, useState } from "react";
import { EntradaTextoSenha } from "../../componentes/EntradaTextoSenha";
import { auth } from "../../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup} from "@firebase/auth";


export default function Login({ navigation }) {

  const [email,setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorLogin, setErrorLogning] = useState("");

    const loginFirebase = () => {

    }



  /*
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
    
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, photoURL} = result.user;

      if(!displayName || !photoURL)
      throw new Error("Nome ou Foto em vazio");

      setUser({
          id: uid,
          nome: displayName,
          foto: photoURL,
      });

  }



  function signUp(){

    auth.creatUserWithEmailAndPassword(email,senha).then(userCredential => {
      console.log('user: ', userCredential);
    }).catch(error => {
      if(error.code === 'auth/invalid-email'){
        console.log('Email invalido  ');
      }

      if(error.code === 'auth/email-already-in-use'){
        console.log('Email já existe ');
      }
      
    });
  }
*/
// __________________________________________________________________________________________________

/*
  const [login, setLogin] = useState({ email: "", senha: "" });
  const toast = useToast()


  const AlterText = (event, type) => {
    if (type === "Email"){
      setLogin({ ...login, email: event });
      return;
      
    }

    setLogin({ ...login, senha: event });
  };
  
  
  const LoginAcesso = () => {
    if ( login.email && login.senha ){
      console.log(login)
     navigation.navigate("Tabs") 
      toast.show({
        title: " Login Realizado !",
       backgroundColor:"#0EDF23",
        fontSize:"xs"   
    })
   }

    else{
        toast.show({
        title: "Email o  u senha Invalido ! ",
        backgroundColor:"#FF2222",
        fontSize:"xs"   
    })
}
  }

*/
//__________________________________________________________________________________________________


// Tela Login Sulmix 
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  flex={1} alignItems={"center"} justifyContent={"center"} p={6} >
    
      <Image source={Logo} alt="Logo Sulmix" width={"75%"} height={"17%"} />
      
      <Titulo> Faça o login em sua conta </Titulo>
      <Box>
        
        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          onChange={(text) => setEmail(text)}
          value={email}
          //onChange={AlterText}
        />
        <EntradaTextoSenha
          secureTextEntry={true}
          label="Senha"
          placeholder="Insira sua senha"
          onChange={(text) => setSenha(text)}
          value={senha}
         // onChange={AlterText}
        />
      </Box>

      <Button
        //onPress={handleGoogleSignIn}

        //onPress={() => LoginAcesso()}
        w={"80%"}
        height={"8%"}
        bgColor={"#F6821F"}
        mt={10}
        borderRadius={"lg"}
        shadow={"7"}

      >
        Entrar
      </Button>

      <Link mt={3} >Esqueceu sua senha?</Link>
      <Box w={"100%"} flexDirection={"row"} justifyContent={"center"} mt={10}>
        <Text fontWeight={"semibold"}>Ainda não tem conta ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text
            color={"#F6821F"}
            fontWeight={"bold"}
            textDecorationLine={"underline"}
            textDecorationColor={"#F6821F"}
          >
            {" "}
            Faça seu Cadastro!
          </Text>
        </TouchableOpacity>
      </Box>
      </KeyboardAvoidingView>
    
  );
}
