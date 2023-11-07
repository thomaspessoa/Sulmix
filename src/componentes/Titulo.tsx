import { Text, ITextProps } from 'native-base'
import React from 'react'


export function Titulo ({ children, ... rest }) { 
    return (
        <Text
            fontSize ='lg'
            fontWeight="bold"
            color="gray.600"
            textAlign="center"
            mt={5}
            {...rest}
        >   
            {children}        
        </Text>
    )
}
