import React, { useState } from 'react';
import Cadastro from './Cadastro';
import Login from './Login';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <Login /> : <Cadastro />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Ir para Cadastro' : 'Ir para Login'}
      </button>
    </div>
  );
}

export default App;