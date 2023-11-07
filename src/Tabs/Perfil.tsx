import { VStack,Text,ScrollView,Avatar,Divider, Box,Button,Center} from 'native-base'
import { Titulo } from '../componentes/Titulo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Botao } from '../componentes/Botão'

export default function Perfil(){   
    return(
        
        <ScrollView flex={1} top={'3%'}>
        
            <Titulo color='#F6821F' fontWeight="bold" fontSize ='lg'  mt={'3%'}  >Meu Perfil</Titulo>
    
            <VStack>

            
                <VStack mt={5} flex={1} p={16} justifyContent={'center'} alignSelf={'center'}  borderRadius="lg" borderColor={'#F6821F'} background={'#B7D7FF'}
                borderStyle={'-moz-initial'}
                borderWidth={'2'}
  
                >      
                <Box>
                <Avatar size={'120'} source={{ uri: "https://i.pinimg.com/originals/a6/de/6d/a6de6d457bc4da659f18b435dd68992e.png"}} mt={20}
                alignSelf={'center'} top={'-70'}/>
                </Box>
            
                




                
                <Titulo
                fontSize='lg'
                color='black'
                fontWeight="bold"
                top={'-55'}
                >Thomás Soares Pessoa</Titulo>


                <Text
                fontSize={'md'}
                alignSelf={'center'}
                color='black'
                fontWeight={'semibold'}
                mt={3}
                top={'-55'}

                >Transportadora</Text>

                <Text 
                    fontSize={'md'}
                    alignSelf={'center'}
                    color='black'
                    fontWeight={'semibold'}
                    top={'-55'}
                    >Motorista</Text>


                <Text
                    fontSize={'md'}
                    alignSelf={'center'}
                    color='black'
                    fontWeight={'semibold'}
                    top={'-55'}
                        > 036.204.610-74</Text>
                
                <Text
                    fontSize={'md'}
                    alignSelf={'center'}
                    color='black'
                    fontWeight={'semibold'}
                    top={'-55'}>

                    (55)-999096533
                </Text>

                

                </VStack>
            </VStack>
        
        </ScrollView>
    )
}
