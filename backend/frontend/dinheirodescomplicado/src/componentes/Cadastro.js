import axios from 'axios';
import { useState } from 'react';
import './componentes/Cadastro.css';


function Cadastro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/register',
        { nome, sobrenome, email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log(response.data);
      setSuccess(true); 
      setError(''); 

    } catch (error) {
      if (!error?.response) {
        setError('Erro ao acessar o servidor');
      } else if (error.response.status === 400) {
        setError('Erro no cadastro: ' + error.response.data.message);
      } else {
        setError('Erro ao fazer cadastro');
      }
    }
  };

  return (
    <div className="cadastro-form-wrap">
      {success ? (
        <div>
          <h2>Cadastro bem-sucedido!</h2>
          <p>Faça seu login </p>
        </div>
      ) : (
        <div>
          <h2>Cadastro</h2>
          <form className="register-form" onSubmit={handleCadastro}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              required
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              required
              onChange={(e) => setSobrenome(e.target.value)}
            />
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
            <button type="submit" className="btn-register">Cadastrar</button>
          </form>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Cadastro;
