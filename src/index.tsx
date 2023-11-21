
import { NativeBaseProvider, StatusBar} from 'native-base';
import { TEMAS } from './estilos/temas';
import Rotas from './routes';
import Checkin from './pages/Checkin';
import Principal from './Tabs/Principal';
import CheckinConfirmado from './pages/CheckinConfirmado';
import Coletas from './pages/Coletas';
import InformacoesCarregamento from './pages/InformacoesCarregamento';


export default function App() {
  return (

    <NativeBaseProvider theme={TEMAS}>


          <StatusBar backgroundColor={TEMAS.colors.blue[800]} />
          <Rotas/>


    </NativeBaseProvider>
  );
}

