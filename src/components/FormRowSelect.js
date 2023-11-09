const FormRowSelect = ({labelText, name, value, handleChange, list}) => {
  return <div className="form-row">
        <label className='form-label' htmlFor={name}>
        {labelText || name}
        </label>
        <select name={name} id={name} value={value} onChange={handleChange} className='form-select'>
        {list.map((status, index)=>{
            return <option key={index} value={status}>
            {status}
            </option>
        })}
        </select>
    </div>
}
export default FormRowSelect