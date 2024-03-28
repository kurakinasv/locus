import { Router } from 'pages';
import RootStoreProvider from 'store/RootStore/context';

import 'styles/global.scss';

const App = () => {
  return (
    <RootStoreProvider>
      <Router />
    </RootStoreProvider>
  );
};

export default App;
