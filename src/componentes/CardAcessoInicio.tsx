import {Text, Avatar, VStack, ScrollView,Image} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';

interface CardAcessoInicio {
    nome: string,
    icone: string
}

export function CardAcessoInicio ({
    nome,
    icone
}: CardAcessoInicio) {

    return ( 
        <VStack left={'2'} w={'96%'} bg={'#B7D7FF'} borderRadius={'xl'} p={2} shadow={'5'} mt={5} borderColor={'#1E83FC'} borderWidth={'1'} top={'-24'} >

            <VStack alignItems={'center'}>         
            <Ionicons name={icone} size={33} color={'#F6821F'}  />          
            <Text
            fontWeight={'bold'}
            fontSize={'lg'}
            mb={1}
            >{nome} 
            </Text>
            </VStack>


        </VStack>
    )
}