import { VStack,View,Image,Divider, Button,ScrollView} from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import Logo from "../../assets/logo.png";
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from "react";

export default  function CadastroUsuarios({navigation}) {

    const [selected, setSelected] = useState([]);
        
    const data = [
        {key:'1', value:'Supermecado Tradição'},
        {key:'2', value:'FG SERRARIA'},
        {key:'3', value:'Dalla Valle'},
        {key:'4', value:'Supermercado Concari'}

    ]

    return(

        <VStack flex={1} bg={'white'} >
            <Image source={Logo} alt="Logo Sulmix" width={"70%"} height={"17%"} mt={'10%'} mb={'2%'} alignSelf={'center'}/>
            
            <Divider 
            mt={'1%'}
            bg={'black'}
            />


            <ScrollView w={'95%'} mt={'8%'} bg={'#DDECFF'} borderRadius={'lg'} p={'3%'}  borderWidth={'1'} borderColor={'#F6821F'} alignSelf={'center'}  >
            
                <Titulo
                    fontweight="bold"
                    color='#F6821F'>

                    Cadastro de Usuario 
                </Titulo>
                
                <EntradaTexto 
                label='Email:'
                placeholder='Informe o Email'        
                />

                <EntradaTexto 
                label='Nome:'
                placeholder='Informe o nome'   
                     
                />

                <SelectList 
                placeholder='Transportadora'
                searchPlaceholder='Pesquisar transportadora'
                boxStyles={{borderBlockColor: 'black', marginTop: '8%', borderColor: '#F6821F', borderBlockEndColor: '#F6821F', borderBlockStartColor:'#F6821F',backgroundColor: 'white'}}
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                onSelect={() => alert(selected)}       
                 />

                <Button
                onPress={() => navigation.navigate("Tabs")}

                mt={'7%'}
                borderRadius={'lg'}
                w={'80%'}
                alignSelf={'center'} // Botão Adicionar
                bg={'#F6821F'}
                shadow={'5'}
                >
                Adicionar 
                </Button>


                <Button
                onPress={() => navigation.goBack()}

                mt={'7%'}
                borderRadius={'lg'}
                w={'80%'}
                alignSelf={'center'} // Botão voltar 
                bg={'#F56161'}
                shadow={'5'}
                mb={'10%'}
                >
                Voltar
            </Button>

        </ScrollView>
        </VStack>

    )
} 