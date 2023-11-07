import {Text, VStack, ScrollView,Divider,Button} from 'native-base'


interface CardHistoricoProps { 
    nome: string;
    foto: string;
    transportadora: string;
    data? : string,
    emAndamento: boolean,
    foiEntregue: Boolean,
    icone: string
    status: string
}

export function CardHistorico({
    nome,
    foto,
    transportadora,
    data,
    foiEntregue,
    emAndamento,
    status,
    icone

}:CardHistoricoProps) {

    return(

        <VStack left={'2'} w={'96%'} bg={foiEntregue ?  '#B0FFB8': '#FDFFB0'} borderRadius={'xl'} p={2} shadow={'5'} mt={5}> 

           <ScrollView flexDir={'row'}  >
                <VStack pl={4} justifyContent={'center'} >
                    <Text
                    pl={1}
                    fontWeight={'bold'}
                    > {nome} </Text>
                    
                    <Text
                    pl={1}
                    fontWeight={'semibold'}
                    > {transportadora}</Text>

                    <Text
                    pl={1}
                    fontWeight={'semibold'}
                    >{data}</Text>

                    <Text
                    pl={1}
                        textDecorationLine={'underline'}
                        textDecorationColor={'black'}
                        fontWeight={'semibold'}
                        >{status}</Text>

                </VStack> 
         
            </ScrollView>

            <VStack >
            <Button
                position={'absolute'}
                bottom={'6'}
                right={'5%'}
                w={'20%'}
                width={'20%'}
                bg={'#F6821F'}
                p={2}
                justifyItems={'center'}
                alignItems={'center'}
                fontWeight={'bold'}
                    >
                        Ir
                    </Button> 
                       
        </VStack>
        
        </VStack>

    )
}