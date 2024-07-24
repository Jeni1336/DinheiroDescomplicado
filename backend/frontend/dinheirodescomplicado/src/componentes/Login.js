import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log(response.data);
      setUser(response.data); // Define o estado do usuário
      setError(''); // Limpa qualquer mensagem de erro anterior

    } catch (error) {
      if (!error?.response) {
        setError('Erro ao acessar o servidor');
      } else if (error.response.status === 401) {
        setError('Usuário ou senha inválidos');
      } else {
        setError('Erro ao fazer login');
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    setError('');
  };

  return (
    <div className="login-form-wrap">
      {user == null ? (
        <div>
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-login">Login</button>
          </form>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Olá, {user.name}</h2>
          <button
            type="button"
            className="btn-login"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
