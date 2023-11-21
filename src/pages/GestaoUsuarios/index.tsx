import {VStack,ScrollView,Text, Input, Button,View,Image} from 'native-base';
import { Titulo } from '../../componentes/Titulo';
import { TextInput } from 'react-native';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import Logo from "../../assets/logo.png";
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from "react";

export default function GestaoUsuarios({navigation}) {


        const [selected, setSelected] = useState([]);
        
        const data = [
            {key:'1', value:'Administrador'},
            {key:'2', value:'Caixa'},
            {key:'3', value:'Motorista'},

        ]
    return(


        
        <View flex={1} p={2} bg={'white'} top={'-1%'}>
            
            <Image source={Logo} alt="Logo Sulmix" width={"70%"} height={"17%"} mt={'5%'} mb={'2%'} alignSelf={'center'} />



            <ScrollView bg={'#D1E5FF'} w={'100%'} p={'2%'} borderColor={'#FF7500'} borderRadius={'lg'} borderWidth={'1'}>
            
                    <Titulo
                    fontweight="bold"
                    color='#F6821F'            
                    >
                    Gestão de usuários
                    </Titulo>
        
                    <EntradaTexto
                    label="Nome ou email do usuário:"               // Recebendo o nome do usuario 
                    placeholder="Insira nome ou email do usuário"
                />

                    <Button
                    mt={'7%'}
                    bg={'#F6821F'}
                    mb={'7%'}
                    w={'60%'}
                    shadow={'3'}
                    borderRadius={'lg'}
                    alignSelf={'center'}
                    >
                        Buscar
                    </Button>

                    


                    <SelectList 
                    boxStyles={{borderBlockColor: 'black', borderColor: '#F6821F', borderBlockEndColor: '#F6821F', borderBlockStartColor:'#F6821F', backgroundColor: 'white'}}
                    placeholder='Perfil'
                    searchPlaceholder='Informe o perfil'
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    onSelect={() => alert(selected)} 
                    
        />

                

                    <Button
                        mt={'7%'}   
                        bg={'green.500'}
                        mb={'4%'}   
                        w={'70%'}
                        shadow={'3'}
                        borderRadius={'lg'}
                        alignSelf={'center'}
                    >
                        Confirmar
                    </Button>


                    <Button
                        onPress={() => navigation.goBack()}
                        mt={'1%'}
                        bg={'#F56161'}
                        borderRadius={'lg'}
                        w={'70%'}
                        shadow={'3'}
                        alignSelf={'center'}
                        mb={'5%'}
                    >
                        Voltar
                    </Button>

            </ScrollView>


        </View>

    )
    }