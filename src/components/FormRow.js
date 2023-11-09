const FormRow = ({type,name,value, handleChange, labelText}) => {
  return <div className="form-row">
    <label className="form-label" htmlFor={name}>
        {labelText || name}
    </label>
    <input 
        type={type}
        id={name}
        name={name} 
        className="form-input"
        value={value}
        onChange={handleChange}
        />
    </div>
}
export default FormRow