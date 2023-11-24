import { Text,ScrollView,Box,Button, VStack,Image,Divider,Alert} from 'native-base'
import { CardInicio } from '../componentes/CardInicio'
import { CardAcessoInicio } from '../componentes/CardAcessoInicio'
import Logo from '../assets/logo.png'
import { TouchableOpacity } from 'react-native';

export default function Principal({navigation}){
    

    
    function PrincipalScreen() {
    }
    return(
        
        <ScrollView flex={1} p={1} bg={'#DDECFF'} marginTop={'-8%'}>    
        
            <VStack>
            <Image source={Logo} alt='Logo Sulmix' alignSelf={'center'} size={'190'}/>
            </VStack>
            
            <CardInicio 
            nome='Nome'
            transportadora='Transportadora'
            funcao='Motorista'
            foto='https://i.pinimg.com/originals/a6/de/6d/a6de6d457bc4da659f18b435dd68992e.png'
            />

            <Divider 
            mt={4}
            bg={'yellow.900'}
            top={'-30'}
            />
    
            <TouchableOpacity
             activeOpacity={0.6}
             > 
            <CardAcessoInicio 
            nome='Dashboards'
            icone='stats-chart'
            />
            </TouchableOpacity>

            
            <TouchableOpacity
                onPress={() => navigation.navigate('CadastroUsuarios')}
                activeOpacity={0.6}
            >
            <CardAcessoInicio 
            nome='Cadastro de usuários'
            icone='person-add'
            />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Checkin')}
                activeOpacity={0.6}
                >
            <CardAcessoInicio 
            nome='Check-in'
            icone='calendar'
            />
            </TouchableOpacity>
           
           
            <TouchableOpacity 
            onPress={() => navigation.navigate('Minhas Viagens')}
            activeOpacity={0.6}  
            >
            <CardAcessoInicio 
            nome='Minhas viagens '
            icone='ribbon'
            />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Coletas')}>
            <CardAcessoInicio      
            nome='Coletas'
            icone='archive'
            />
            </TouchableOpacity>





            <Button  onPress={() => navigation.navigate("Login")} 
            left={2}
            w={'96%'}
            bg={'#F56161'}
            borderRadius={'lg'}
            borderColor={'#FF0000'}
            borderWidth={'1'}
            mt={5}
            mb={8}
            shadow={'7'}

            >
                Sair 
            </Button>
        </ScrollView>
    )
}