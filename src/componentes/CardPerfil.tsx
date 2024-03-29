import {Text, Avatar, VStack, ScrollView,Image,Divider} from 'native-base'
import Logo from '../assets/logo.png'

interface CardProps { 
    nome: string;
    foto: string;
    transportadora: string;
    funcao: string;
    data? : string,
    noDestino: string
}


export function CardPerfil({
    nome,
    foto,
    transportadora,
    funcao,
    data,

    noDestino

}:CardProps) { 

    return (   
        <VStack left={'2'} w={'96%'} bg={'#FFC38F'} borderRadius={'xl'} p={2} shadow={'5'} top={'-40'}> 
            <VStack flexDir={'row'}>
                <Avatar size={'70'} source={{ uri: foto}} />
                <VStack pl={4} justifyContent={'center'}>
                    <Text
                    fontWeight={'bold'}
                    > {nome} </Text>
                    
                    <Text
                    fontWeight={'semibold'}
                    > {transportadora}</Text>

                    <Text
                    fontWeight={'semibold'}
                    >{funcao}</Text>
                </VStack>              
            </VStack>
        </VStack>
             
    )
}