import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../../components/form/petForm/PetForm';

const AddPet = () => {

    const [token] = useState(localStorage.getItem('token' || ""));
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    async function registerPet(pet) {
        let msgType = 'success';

        const formData = new FormData();

        await Object.keys(pet).forEach((key) => {
            if (key === "images") {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append("images", pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        });

        const data = await api.post('/pets/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        }).then((response) => {
            return response ? response.data : null;
        }).catch((err) => {
            msgType = 'error';
            return err.response ? err.response.data : 'Erro desconhecido';
        });

        setFlashMessage(data.message, msgType);
        navigate('/pet/mypets')

        if(msgType === 'error') {
            navigate('/pet/add')
        }
    };

    return (
        <section className='text-center mb-1'>
            <div>
                <h1 className='mb-1'>Cadastre um Pet</h1>
                <p>Depois ele ficara disponivel para adoção</p>
            </div>
            <PetForm
                btnText='Cadastrar Pet'
                handleSubmit={registerPet}
            />
        </section>
    )
}

export default AddPet