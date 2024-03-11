import { useContext, useState } from 'react';
import Input from '../../../components/form/Input';
import '../../../components/form/Form.css';
import { Context } from '../../../context/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({});
    const {login} = useContext(Context);

    const handeleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handeleSubmit = (e) => {
        e.preventDefault();

        login(user);
    }

    return (
        <section className='formContainer'>
            <h1>Login</h1>
            <form onSubmit={handeleSubmit}>
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu E-mail"
                    handleOnChange={handeleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua Senha"
                    handleOnChange={handeleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Se ainda não tem conta <Link to='/register'>Clique aqui</Link>
            </p>
        </section>
    )
}

export default Login