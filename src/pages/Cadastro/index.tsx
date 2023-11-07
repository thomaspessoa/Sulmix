import {
  Image,
  Text,
  Box,
  Button,
  ScrollView,
  useToast,
} from "native-base";

import { EntradaTexto } from "../../componentes/EntradaTexto";
import Logo from "../../assets/logo.png";
import { Titulo } from "../../componentes/Titulo";
import React, { useState } from "react";
import { secoes } from "../../utils/CadastroEntradaTexto";
import Principal from "../../Tabs/Principal";
import { EntradaTextoSenha } from "../../componentes/EntradaTextoSenha";




export default function Cadastro({ navigation }) {
  const [numSecao, setNumeroSecao] = useState(0);
  const [registro, setRegistro] = useState({email: "", senha: "", confirmeSenha: ""});
  const toast = useToast()


  const AlterText = (event, type) => {
    if (type === "Email" ){
      setRegistro({ ...registro, email: event });
      
      return;
      
    }
    setRegistro({ ...registro, senha: event });
  };




  const SubmitLogin = () => {
    if (registro.senha !== registro.confirmeSenha ){ 
      toast.show({
      title: "Erro Email ou Senha nao Conferem ! ",
      backgroundColor:"#FF2222",
      fontSize:"xs"   
  })


    }
    if (registro.email && registro.senha !== registro.confirmeSenha ){
      console.log(registro)
      navigation.navigate("Login") 
      toast.show({
        title: " Cadastro feito com Sucesso !",
        backgroundColor:"#0EDF23",
        fontSize:"xs"   
    })
    }

    else{
        toast.show({
        title: "Erro Email ou Senha nao Conferem ! ",
        backgroundColor:"#FF2222",
        fontSize:"xs"   
    })
    }
  }


  return (
    <ScrollView flex={1} p={6}>
      <Image
        source={Logo}
        alt="Logo Sulmix"
        width={"75%"}
        height={"17%"}
        alignSelf={"center"}
        mt={'12%'}
      />

      <Titulo> {secoes[numSecao].titulo} </Titulo>

      <Box justifyContent={'center'} >
      <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          onChange={AlterText}
        />

        <EntradaTextoSenha
          label="Senha:"
          placeholder="Insira uma senha"
          onChange={AlterText}
   
        />

        <EntradaTextoSenha
          label="Confirme a senha: "
          placeholder="Confirme sua senha"
          onChange={AlterText}
        />
        
      </Box>

      <Button
      onPress={() => SubmitLogin() }
        w={"80%"}
        height={"8%"}
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
        mb={50}
        alignSelf={"center"}
      >
        {" "}
        Voltar
      </Text>
    </ScrollView>
  );
}
