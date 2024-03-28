import { useState } from 'react';

import { Router } from 'pages';

import 'styles/global.scss';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthProvider value={{ isAuth, setIsAuth }}>
      <Router />
    </AuthProvider>
  );
};

export default App;
