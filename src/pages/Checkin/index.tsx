import { Text, Box, VStack, Input, Button, useToast } from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app, auth } from '../../config/firebaseConfig';
import { KeyboardAvoidingView } from 'native-base';
import { Platform, TouchableOpacity } from "react-native";
import { ScrollView } from 'native-base';



export default function Checkin({ navigation }) {
  const [placa, setPlaca] = useState({ placa: "" });
  const toast = useToast();

  const AlterText = (event, type) => {
    setPlaca({ ...placa, placa: event });
  };

  const AcessoInfo = async () => {
    
    if (placa.placa) {
      try {
        const usuarioAtual = auth.currentUser;

        if (usuarioAtual) {
          const firestore = getFirestore();
          const docRef = doc(firestore, 'Usuario', usuarioAtual.uid);
          const docSnap = await getDoc(docRef);


          if (docSnap.exists()) {
            const dadosUsuario = docSnap._document.data.value.mapValue.fields;
            
            console.log(dadosUsuario.placa.stringValue)
            console.log(placa.placa)


            if (dadosUsuario.placa.stringValue === placa.placa) {
              // Placa válida
              //console.log(placa);
              navigation.navigate("InformacoesCarregamento");
              toast.show({
                title: "Check-in Feito com Sucesso !",
                backgroundColor: "#0EDF23",
                fontSize: "xs"
              });  
              
              


            } else {
              // Placa inválida
              toast.show({
                title: "Placa inválida  ",
                backgroundColor: "#FF2222",
                fontSize: "xs"
              });
            }



          } else {
            console.log("Documento do usuário não encontrado no Firestore");
          }



        } else {
          console.log("Usuário não autenticado");
        }



      } catch (error) {
        console.error("Erro ao verificar placa no Firebase:", error);
      }





    } else {
      toast.show({
        title: "Informe a Placa!",
        backgroundColor: "#FF2222",
        fontSize: "xs"
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
        <VStack p={2} bg={'#B7D7FF'}  borderRadius={'lg'} borderWidth={1} borderColor={'#F6821F'}>
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

          <Button
            onPress={() => AcessoInfo()}
            mt={10}
            bg={'#F6821F'}
            w={'70%'}
            alignSelf={'center'}
            borderRadius={'lg'}
          >
            Adicionar Placa
          </Button>

          <Button
            onPress={() => navigation.goBack()}
            mt={4}
            bg={'#F56161'}
            w={'70%'}
            alignSelf={'center'}
            borderRadius={'lg'}
          >
            Voltar
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}