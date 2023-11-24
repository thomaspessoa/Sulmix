import { Text, VStack, ScrollView, Divider, Button } from 'native-base';

interface CardHistoricoProps {
  nome: string;
  foto: string;
  transportadora: string;
  data?: string;
  foiEntregue: boolean;
  emAndamento: boolean;
  status: string;
  icone: string;
  horario: string;
  placa: string;
}

export function CardHistorico({
  nome,
  foto,
  transportadora,
  data,
  foiEntregue,
  emAndamento,
  status,
  icone,
  horario,
  placa,
}: CardHistoricoProps) {

  const backgroundColor = foiEntregue ? '#B0FFB8' : status === 'Entregue' ? '#B0FFB8' : '#FDFFB0';

  return (
    <VStack left={'2'} w={'96%'} bg={backgroundColor} borderRadius={'xl'} p={2} shadow={'5'} mt={5}>
      <ScrollView flexDir={'row'}>
        <VStack pl={4} justifyContent={'center'}>
  
          <Text pl={1} fontWeight={'bold'} mb={1} mt={0.5}>
            Testando: <Text fontWeight={'semibold'}>{nome}</Text>
          </Text>
  
          <Text pl={1} fontWeight={'bold'} mb={1}>
            Transportadora: <Text fontWeight={'semibold'}>{transportadora}</Text>
          </Text>
  
          <Text pl={1} fontWeight={'bold'} mb={1}>
            Data: <Text fontWeight={'semibold'}>{data}</Text>
          </Text>
  
          <Text pl={1} fontWeight={'bold'} mb={1}>
            Horário: <Text fontWeight={'semibold'}>{horario}</Text>
          </Text>
  
          <Text
            pl={1}
            textDecorationLine={'underline'}
            textDecorationColor={'black'}
            fontWeight={'bold'}
            mb={1}
          >
            Status: <Text fontWeight={'semibold'}>{status}</Text>
          </Text>
  
          {emAndamento ? (
            <Text pl={1} fontWeight={'bold'} mb={1}>
              Placa: <Text fontWeight={'semibold'}>{placa}</Text>
            </Text>
          ) : null}
        </VStack>
      </ScrollView>
    </VStack>
  );
}