import {useContext, useState} from 'react';
import Input from '../../../components/form/Input';
import '../../../components/form/Form.css';
import { Link } from 'react-router-dom';
import {Context} from '../../../context/UserContext';

const Register = () => {
    const [user, setUser] = useState({});
    const {register} = useContext(Context);

    const handeleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handeleSubmit = (e) => {
        e.preventDefault();

        register(user);
    };

    return (
        <section className='formContainer'>
            <h1>Registrar</h1>
            <form onSubmit={handeleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handeleChange}
                />
                <Input
                    text="E-mail"
                    type="text"
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
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua Senha"
                    handleOnChange={handeleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu Telefone"
                    handleOnChange={handeleChange}
                />
                <input type="submit" value="cadastrar" />
            </form>
            <p>
                Já tem conta <Link to='/login'>Clique aqui</Link>
            </p>
        </section>
    )
}

export default Register