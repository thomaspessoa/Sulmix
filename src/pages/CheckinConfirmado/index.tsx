import {Text,VStack,Button,Box,Image,Divider} from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import Logo from '../../assets/logo.png'

export default function CheckinConfirmado() {

    return ( 

        <VStack  flex={2} bg={'#83A8D5'} justifyContent={'center'} alignItems={'center'}>
            

            <VStack p={2} bg={'#B7D7FF'} w={'90%'} height={'80%'} borderRadius={'lg'}  borderWidth={1} borderColor={'#F6821F'} shadow={'8'} >
            <Image source={Logo} alt='Logo Sulmix' width={'75%'} height={'17%'} alignSelf={'center'} mt={5}/> 
                
                <Text justifyContent={'center'} alignSelf={'center'} mt={3} fontSize={'md'} fontWeight={'bold'} textDecorationLine={'underline'}
                textDecorationColor={'black'}>
                    Seu Check-in foi realizado com sucesso 
                </Text>


                <Divider 
                    mt={5}
                    bg={'yellow.900'}
                />

                <Box justifyContent={'center'} alignItems={'center'} mt={2} >
                    <Text fontSize={'lg'} fontWeight={'normal'} mb={1}>
                        Placa:
                    </Text>

                    <Text fontSize={'lg'} fontWeight={'normal'} mb={1}>
                        Transportadora:
                    </Text>

                    <Text fontSize={'lg'} fontWeight={'normal'} mb={1}>
                        Motorista:
                    </Text>

                    <Text fontSize={'lg'} fontWeight={'normal'} mb={1}>
                        Telefone:
                    </Text>

                    <Divider 
                    mt={2}
                    bg={'yellow.900'}
                />

                    <Text alignContent={'center'} mt={4} fontSize={'xs'} fontWeight={'bold'}>
                    ENTREGUE ESTE TICKET AO RESPONSÁVEL DE EXPEDIÇÃO APÓS SER DIRECIONADO AO BOX DE CARREGAMENTO.
                    </Text>

                    <Button
                    mt={12}
                    bg={'#F6821F'}
                    w={'70%'}
                    borderRadius={'lg'}
                    borderWidth={'1'}
                    borderColor={'#FF8A00'}
                    shadow={'8'}
        

                    >

                        Finalizar
                    </Button>
               </Box>
            
            </VStack>

   


            
        </VStack>

    )
}