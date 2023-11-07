import { VStack,Text,ScrollView, Button,useToast} from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import React, { useState } from "react";
export default function AtualizarPerfil({navigation}) { 


    const [atualizarRegistro, setAtualizarRegistro] = useState({nome:"", telefone: "", transportadora: ""});
    const toast = useToast()
    
    const AlterText = (event, type) => {

        if (type === "Nome"){
            setAtualizarRegistro({ ...atualizarRegistro, nome: event });
          return;
          
        }
        setAtualizarRegistro({ ...atualizarRegistro, telefone: event });
      };

    
      const AtualizarDadosPerfil = () => {
        toast.show({
          title: " Dados Atualizados !",
          backgroundColor:"#0EDF23",
          fontSize:"xs"
      })
        console.log(atualizarRegistro)
        navigation.navigate("Tabs")
      }
    


    return(
        <ScrollView bg={'black'} flex={1} bgColor={'#DDECFF'}>

            <VStack p={'2%'} w={'95%'}  bg={'white'} borderRadius={'lg'}
                borderWidth={'2%'} borderColor={'#F6821F'} alignSelf={'center'} top={'15%'}>
                
                <Titulo
                color={'#F6821F'}
                fontSize={'lg'}
                fontWeight={'black'}
                >
                    Atualizar Perfil

                </Titulo>
                <EntradaTexto 
                label='Nome:'
                placeholder='Informe o nome'           
                />

                <EntradaTexto 
                label='Telefone:'
                placeholder='Informe o telefone'           
                />

                <EntradaTexto 
                label='Transportadora:'
                placeholder='Trasportadora'           
                />

 
                <Button
                     onPress={() => AtualizarDadosPerfil()}   
                    mt={'10%'}
                    bg={'#F6821F'}
                    borderRadius={'lg'}
                    w={'70%'}
                    alignSelf={'center'}
                    shadow={'6'}
                    mb={'6%'}
                    >
                    Atualizar Dados  
                </Button>

            </VStack>
        </ScrollView>


    )

}