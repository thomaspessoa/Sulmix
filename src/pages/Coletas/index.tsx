import {VStack,ScrollView,Text, Input, Button} from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { TextInput } from 'react-native';
import { EntradaTexto } from '../../componentes/EntradaTexto';

export default function Coletas({navigation}) {
    return(
            <ScrollView  flex={1}  bg={'#DDECFF'}>

                <VStack bg={'white'} pl={'2%'} p={'3%'} alignSelf={'center'} borderRadius={'lg'} flex={1} mt={'14%'} w={'90%'} borderColor={'#F6821F'} borderWidth={'2'} >
                    <Titulo 
                    color={'#F6821F'}
                    fontweight={'bold'}
                    >

                        Coletas
                    </Titulo>

                    <EntradaTexto
                    label='Transportadora:'
                    placeholder='Informe a transportadora'                    
                    />                    
                    
                    <EntradaTexto
                    label='Placa:'
                    placeholder='Informe a placa'                    
                    />

                    <EntradaTexto
                    label='Data Solicitação:'
                    placeholder='Informe a data de solicitação'                    
                    />


                    <EntradaTexto
                    label='Status:'
                    placeholder='Informe o Status'                    
                    />

                    <Button onPress={() => navigation.navigate("InformacoesColeta")}
                    mt={'8%'}
                    w={'70%'}   
                    alignSelf={'center'}        
                    bg={'#F6821F'}  
                    mb={'4%'}   
                    borderRadius={'lg'}    
                    >

                        Avançar
                    </Button>



                </VStack>

            <Button  onPress={() => navigation.goBack()} 
                w={'70%'}
                bg={'#F56161'}
                borderRadius={'lg'}
                borderColor={'#FF0000'}
                borderWidth={'1'}
                alignSelf={'center'}
                mt={'6%'}
                mb={'5%'}
                shadow={'7'}
                > 
                Sair 
                </Button>
            </ScrollView>

    )
}