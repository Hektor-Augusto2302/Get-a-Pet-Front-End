import './PetDetails.css';
import api from '../../../utils/api';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';

const PetDetails = () => {

    const [pet, setPet] = useState({});
    const { id } = useParams();
    const { setFlashMessage } = useFlashMessage();
    const [token] = useState(localStorage.getItem('token') || "");

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

    async function schedule() {
        let msgType = "success";

        const data = await api.patch(`/pets/schedule/${pet._id}`, null, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            msgType = "error";
            return error.response.data;
        });

        setFlashMessage(data.message, msgType);
    }

    return (
        <>
            {
                pet.name && (
                    <section className='text-center'>
                        <div className='mb-4'>
                            <h1>Conhecendo o pet {pet.name}</h1>
                            <p>Marque uma visita para conhecê-lo</p>
                        </div>
                        <div className='d-flex justify-content-center mb-3 flex-wrap'>
                            {
                                pet.images.map((image, index) => (
                                    <img
                                        className='petImages'
                                        src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                                        alt={pet.name}
                                        key={index}
                                    />
                                ))
                            }
                        </div>
                        <p>
                            <span className='bold'>{pet.weight} KG</span>
                        </p>
                        <p>
                            <span className='bold'>{pet.age} Anos</span>
                        </p>
                        {token ? (
                            <button className='petDetailsContainer' onClick={schedule}>Solicitar uma visita</button>
                        ) : (
                            <p>Você precisa <Link to='/register'>criar uma conta</Link> para solicitar uma visita</p>
                        )}
                    </section>
                )
            }
        </>
    )
}

export default PetDetails