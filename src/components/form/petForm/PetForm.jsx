import { useState } from 'react';
import '../Form.css';
import Input from '../Input';
import SelectForm from '../selectForm/SelectForm';

const PetForm = ({ handleSubmit, petData, btnText }) => {
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState([]);
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

    const onFileChange = (e) => {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] });
    }

    const handleChange = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value });
    }

    const handleColor = (e) => {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
    }

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(pet);
    }

    return (
        <form onSubmit={submit} className='formContainer '>
            <div className='previewPetsImages'>
                {preview.length > 0 ?
                    preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={pet.name}
                            key={`${pet.name} + ${index}`}
                        />
                    ))
                    : pet.images && pet.images.map((image, index) => (
                        <img
                            src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.name}
                            key={`${pet.name} + ${index}`}
                        />
                    ))
                }
            </div>
            <Input
                text='Imagem do Pet'
                type='file'
                name='images'
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text='Nome do pet'
                type='text'
                name='name'
                placeholder='Digite o Nome do Pet'
                handleOnChange={handleChange}
                value={pet.name || ""}
            />
            <Input
                text='Idade do pet'
                type='text'
                name='age'
                placeholder='Digite a Idade do Pet'
                handleOnChange={handleChange}
                value={pet.age || ""}
            />
            <Input
                text='Peso do pet'
                type='text'
                name='weight'
                placeholder='Digite o Peso'
                handleOnChange={handleChange}
                value={pet.weight || ""}
            />
            <SelectForm
                name='color'
                text='Selecione a cor'
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ""}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default PetForm