import styles from './Profile.module.css';
import formStyles from '../../components/form/Form.module.css';
import Input from '../../components/form/Input';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessage';
import RoundedImage from '../../components/layouts/RoundedImage/RoundedImage';

const Profile = () => {

    const [user, setUser] = useState({});
    const [preview, setPreview] = useState("");
    const [token] = useState(localStorage.getItem('token') || "");
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        });
    }, [token]);

    const onFileChange = (e) => {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] });
    };

    const handeleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    async function handeleSubmit(e) {
        e.preventDefault();

        let msgType = 'success';

        const formData = new FormData();

        await Object.keys(user).forEach((key) =>
            formData.append(key, user[key]),
        );

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response ? response.data : null;
        }).catch((err) => {
            msgType = 'error';
            return err.response ? err.response.data : 'Erro desconhecido';
        });

        setFlashMessage(data.message, msgType);
    };

    return (
        <section>
            <div className={styles.profileHeader}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage
                        src={
                            preview
                                ? URL.createObjectURL(preview)
                                : `${process.env.REACT_APP_API}/images/users/${user.image}`
                        }
                        alt={user.name}
                    />
                )}
            </div>
            <form onSubmit={handeleSubmit} className={formStyles.formContainer}>
                <Input
                    text='imagem'
                    type='file'
                    name='image'
                    handleOnChange={onFileChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handeleChange}
                    value={user.name || ""}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu E-mail"
                    handleOnChange={handeleChange}
                    value={user.email || ""}
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
                    value={user.phone || ""}
                />
                <input type="submit" value='Editar' />
            </form>
        </section>
    )
}

export default Profile