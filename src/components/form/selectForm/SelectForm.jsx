import './SelectForm.css';

const SelectForm = ({text, name, options, handleOnChange, value }) => {
    return (
        <div className='formSelect d-flex flex-column mb-2'>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ""}>
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectForm