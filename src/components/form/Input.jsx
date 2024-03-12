import'./Input.css';

const Input = ({ type, text, name, placeholder, handleOnChange, value, multiple }) => {
    return (
        <div className='d-flex flex-column mb-2'>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                {...(multiple ? {multiple} : "")}
            />
        </div>
    )
}

export default Input