import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import'./Home.css';

const Home = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        api.get('/pets/').then((response) => {
            setPets(response.data.pets)
        })
    }, [])

    return (
        <section>
            <div className='mb-3 text-center'>
                <h1>Adote um Pet</h1>
                <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            </div>
            <div className='d-flex justify-content-flex-start flex-wrap'>
                {
                    pets.length > 0 &&
                    pets.map((pet) => (
                        <div className='petCard d-flex flex-column align-items-center'>
                            <div 
                                style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}} 
                                className='petCardImage'
                            >
                                
                            </div>
                            <h3>{pet.name}</h3>
                            <p className='bold'>Peso: {pet.weight}</p>
                            {
                                pet.available ? (
                                    <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
                                ) : (
                                    <p className='adoptedText'>Adotado</p>
                                )
                            }
                        </div>
                    ))
                }
                {
                    pets.length === 0 && (
                        <p>Não há pets cadastrados no momento!</p>
                    )
                }
            </div>
        </section>
    )
}

export default Home