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
    ScrollView
  } from "native-base";
import { Titulo } from "../../componentes/Titulo";
import { EntradaTexto } from "../../componentes/EntradaTexto";



export default function InformacoesColeta({navigation}) { 

    return(
        <ScrollView flex={1} bg={'#DDECFF'}  >
            <Titulo
                color={'#F6821F'}
                fontWeight={'bold'}
                fontSize={'lg'}
                top={'3%'}
                >
                Informações Coleta
            </Titulo>
            <VStack bg={'white'} p={'2%'} top={'6%'} w={'95%'} alignSelf={'center'} borderRadius={'lg'} borderColor={'#F6821F'} borderWidth={'2%'}>
        
            <EntradaTexto 
            label="Transportadora:"
            placeholder="Transportadora"    
            />           
             <EntradaTexto 
            label="Placa:"
            placeholder="Placa"    
            />
            <EntradaTexto 
            label="Motorista:"
            placeholder="Motorista"    
            />
            <EntradaTexto 
            label="Telefone:"
            placeholder="Telefone"    
            />
            <EntradaTexto 
            label="Data Check-in"
            placeholder="Data Check-in"    
            />
            <EntradaTexto 
            label="Status"
            placeholder="Status" 
            />

            

            <Button
            onPress={() => navigation.navigate("AtivarLocalizacao")}

            mt={'8%'}
            w={'80%'}
            alignSelf={'center'}
            borderRadius={'lg'}
            shadow={'7'}
            bgColor={"#F6821F"}
            >
            Rastrear
            </Button>
            
            
            <Button onPress={() => navigation.goBack()}
            mt={'8%'}
            mb={'22%'}
            w={'80%'}
            alignSelf={'center'}
            borderRadius={'lg'}
            shadow={'7'}
            bgColor={"#F56161"}
            >
                Voltar
            </Button>

            </VStack>


        </ScrollView>




    )
}