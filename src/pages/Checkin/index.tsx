import {Text,Box,VStack,Input,Button,useToast} from 'native-base'
import { Titulo } from '../../componentes/Titulo'
import { EntradaTexto } from '../../componentes/EntradaTexto'
import { useState } from 'react'


export default function Checkin({navigation}) { 

    const [placa, setPlaca] = useState({ placa: ""});
    const toast = useToast()

    const AlterText = (event, type) => {
        if (type === "Placa"){
          setPlaca({ ...placa,placa: event });
          return;
          
        }
    
        setPlaca({ ...placa, placa: event });
      };


        const AcessoInfo = () => {
            if ( placa.placa ){
              console.log(placa)
              navigation.navigate("InformacoesCarregamento") 
              toast.show({
                title: "Placa Adicionada com Suceso !",
                backgroundColor:"#0EDF23",
                fontSize:"xs"   
            })
            }
        
            else{
                toast.show({
                title: "Placa Invalida ! ",
                backgroundColor:"#FF2222",
                fontSize:"xs"   
            })
            }          
          }


    return( 
        
        <VStack flex={1} justifyContent={'center'} alignItems={'center'} bg={'#DDECFF'} >


            <VStack p={2} bg={'#B7D7FF'} w={'90%'} height={'50%'} borderRadius={'lg'}  borderWidth={1} borderColor={'#F6821F'} >  
            <Box justifyContent={'flex-start'} alignItems={'flex-start'} mt={3} pl={2}>
                <Titulo
                mb={4}
                color={'#F6821F'}
                >
                Placa
                </Titulo>
                
            </Box>

            <EntradaTexto
            label="Placa:"
            placeholder="Informe somente a placa principal"
            onChange={AlterText}
            />

            <Button onPress={() => AcessoInfo()}
            mt={10}
            bg={'#F6821F'}
            w={'70%'}
            alignSelf={'center'}
            borderRadius={'lg'}
            >
                Adicionar Placa
            </Button>

            <Button onPress={() => navigation.goBack()}
            mt={4}
            bg={'#F56161'}
            w={'70%'}
            alignSelf={'center'}
            borderRadius={'lg'}>

                Voltar
            </Button>
    
            </VStack>

        </VStack>
    )
}