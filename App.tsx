import React from 'react';
import Home from './src/screens/Home.screen';
import AuthSignup from './src/screens/AuthSignup.screen';

const isLogin = false;
function App(): React.JSX.Element {
  return <>{isLogin ? <Home /> : <AuthSignup />}</>;
}

export default App;
