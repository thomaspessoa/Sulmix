import { Text, Avatar, VStack, Image } from 'native-base'
import Logo from '../assets/logo.png'
import { useEffect, useState } from "react";
import { getFirestore } from 'firebase/firestore';
import { app } from '../config/firebaseConfig'

interface CardProps {
    nome: string;
    foto: string;
    transportadora: string;
    funcao: string;
    perfil: string;
}

export function CardInicio({
    nome,
    foto,
    transportadora,
    funcao,
    perfil
}: CardProps) {
    
    // Função para obter a imagem com base no perfil
    function obterImagemPerfil() {
        switch (perfil) {
            case 'Administrador':
                return require('../assets/AdmImagem.png');
            case 'Almoxarifado':
                return require('../assets/AlmoImagem.png');
            case 'Motorista':
                return require('../assets/motorista.png'); 
        }
    }

    return (
        <VStack left={'2'} w={'96%'} bg={'#FFC38F'} borderRadius={'xl'} p={2} shadow={'5'} top={'-40'}>
            <VStack flexDir={'row'}>
                <VStack pl={2} justifyContent={'center'} >
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
            <Image source={obterImagemPerfil()} alt={`Imagem de ${perfil}`} />
        </VStack>
    )
}
