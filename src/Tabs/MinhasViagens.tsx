import { Text,ScrollView,VStack,Box,Input,Button,Image,Divider} from 'native-base'
import { Titulo } from '../componentes/Titulo'
import Logo from '../assets/logo.png'
import { CardHistorico } from '../componentes/CardHistorico';



export default function MinhasViagens() {
    return (



        <ScrollView flex={1} p={1} bg={'#DDECFF'} marginTop={'-5%'}>
            <VStack>
            <Image source={Logo} alt='Logo Sulmix' alignSelf={'center'} size={'210'}/>
            </VStack>

            <Divider 
                mt={'-10%'}
                bg={'yellow.900'}
                />

            <Titulo
            color={'#F6821F'}
            fontWeight={'bold'}
            fontSize={'xl'}
            mt={7}>  
            Minhas Viagens:
            </Titulo>

            
            <CardHistorico 
                    nome='Thomas'
                    transportadora='Sulmix'
                    data='16/10/2023'
                    status='Entregue'
                    foiEntregue
                    />  

            <CardHistorico 
                    nome='Thomas'
                    transportadora='Sulmix'
                    data='16/10/2023'
                    status='Entregue'
                    emAndamento
                    />  
            <CardHistorico 
                    nome='Thomas'
                    transportadora='Sulmix'
                    data='16/10/2023'
                    status='Entregue'
                    foiEntregue
                    />  
            <CardHistorico 
                    nome='Thomas'
                    transportadora='Sulmix'
                    data='16/10/2023'
                    status='Entregue'
                    emAndamento
                    />  
            <CardHistorico 
                    nome='Thomas'
                    transportadora='Sulmix'
                    data='16/10/2023'
                    status='Entregue'
                    emAndamento
                    />  
            <CardHistorico 
                    nome='Thomas'
                    transportadora='Sulmix'
                    data='16/10/2023'
                    status='Entregue'
                    foiEntregue
                    />  

    </ScrollView>
    )
}