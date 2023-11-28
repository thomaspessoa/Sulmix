import React from 'react';
import { Input, FormControl } from 'native-base';

const EntradaTextoNumeros = ({ label, placeholder, onChange, value }) => {
  const handleChange = (text) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');

    // Verifica se há mais de 2 caracteres, insere o parêntese e o hífen
    const formattedValue =
      cleaned.length > 2
        ? `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6, 12)}`
        : cleaned;

    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <FormControl mt={3}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        placeholder={placeholder}
        size="lg"
        w="100%"
        p={'4%'}
        borderRadius="lg"
        bgColor="gray.100"
        borderColor={'#F6821F'}
        shadow={3}
        keyboardType="numeric"
        onChangeText={handleChange}
        value={value}
      />
    </FormControl>
  );
};

export { EntradaTextoNumeros };
