import { Text, ITextProps } from 'native-base'
import React from 'react'


export function TituloSplashScreen ({ children, ... rest }) { 
    return (
        <Text
            fontSize = 'gigante'
            fontWeight="bold"
            
            textAlign="center"
            mt={5}
            mb={'8%'}
            {...rest}
        >   
            {children}        
        </Text>
    )
}
