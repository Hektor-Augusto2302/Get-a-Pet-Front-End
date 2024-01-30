import styles from './SelectForm.module.css';

const SelectForm = ({text, name, options, handleOnChange, value }) => {
    return (
        <div className={styles.formSelect}>
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