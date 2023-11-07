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



export default function InformacoesCarregamento({navigation}) { 

    return(
        <ScrollView flex={1} bg={'#DDECFF'}  >
            <Titulo
                color={'#F6821F'}
                fontWeight={'bold'}
                fontSize={'lg'}
                top={'3%'}
                >
                Informações Informações Carregamento
            </Titulo>
            <VStack bg={'white'} p={'2%'} top={'6%'} w={'95%'} alignSelf={'center'} borderRadius={'lg'} borderColor={'#F6821F'} borderWidth={'2%'}>
        
            <EntradaTexto 
            label="Data Carregamento:"
            placeholder="Data Carregamento"    
            />           
             <EntradaTexto 
            label="Box:"
            placeholder="Box"    
            />
            <EntradaTexto 
            label="Cliente:"
            placeholder="Cliente"    
            />
            <EntradaTexto 
            label="Cidade:"
            placeholder="Cidade"    
            />
            <EntradaTexto 
            label="Estado"
            placeholder="Estado"    
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
            Atualizar Localização
            </Button>
            
            
            <Button onPress={() => navigation.goBack()}
            mt={'8%'}
            mb={'15%'}
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