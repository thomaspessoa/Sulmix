import React, { useState } from 'react';
import { Input, FormControl, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChange?: (event: string, label?: string) => void;
  value?: string;
}

export function EntradaTextoSenha({
  label,
  placeholder,
  onChange,
}: InputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        onChangeText={onChange ? (event) => onChange(event, label) : undefined}
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={{ position: 'absolute', top: '50%', right: 16 }}
      >
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#000"
        />
      </TouchableOpacity>
    </FormControl>
  );
}
