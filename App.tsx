import React from 'react';
import AuthSignup from './src/screens/AuthSignup';
import Home from './src/screens/Home';

const isLogin = false;
function App(): React.JSX.Element {
  return <>{isLogin ? <Home /> : <AuthSignup />}</>;
}

export default App;
