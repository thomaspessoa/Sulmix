
import { NativeBaseProvider, StatusBar} from 'native-base';
import { TEMAS } from './estilos/temas';
import Rotas from './routes';
//import { AutenticacaoProvider } from './context/AutenticacaoContext';

export default function App() {
  return (

    <NativeBaseProvider theme={TEMAS}>


          <StatusBar backgroundColor={TEMAS.colors.blue[800]} />
          
            <Rotas/>


    </NativeBaseProvider>
  );
}

