import { Input, FormControl } from "native-base";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  onChange?: (event, label) => void;
  value?: string;
}

export function EntradaTextoSenha({
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
        p={'3%'}
        borderRadius="lg"
        bgColor="gray.100"
        borderColor={"#F6821F"}
        shadow={3}
        onChangeText={onChange ? (event) => onChange(event, label) : null}
        secureTextEntry={true}
      />
    </FormControl>
  );
}
