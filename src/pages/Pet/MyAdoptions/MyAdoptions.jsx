import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import RoundedImage from '../../../components/layouts/RoundedImage/RoundedImage';
import styles from './MyAdoptions.module.css'

const MyAdoptions = () => {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || "");

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token]);

    return (
        <section>
            <div className={styles.petListHeader}>
                <h1>Minhas Adoções</h1>
            </div>
            <div className={styles.petListContainer}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className={styles.petListRow} key={pet._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className={styles.contacts}>
                                <p>
                                    <span className='bold'>Ligue para: {pet.user.phone}</span>
                                </p>
                                <p>
                                    <span className='bold'>Fale com: {pet.user.name}</span>
                                </p>
                            </div>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Pet já adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Ainda não há pets adotados</p>}
            </div>
        </section>
    )
}

export default MyAdoptions