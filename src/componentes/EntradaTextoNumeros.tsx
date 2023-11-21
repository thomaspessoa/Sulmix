import { Input, FormControl } from "native-base";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  onChange?: (event, label) => void;
  value?: string;
}

export function EntradaTextoNumeros({
  label,
  placeholder,
  onChange,
}: InputProps): JSX.Element {
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
        borderColor={"#F6821F"}
        shadow={3}
        keyboardType="numeric"
        onChangeText={onChange ? (event) => onChange(event, label) : null}
      />
    </FormControl>
  );
}
