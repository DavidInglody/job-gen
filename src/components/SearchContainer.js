import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange,clearFilters } from '../features/allJobs/allJobsSlice';
import { useState , useMemo} from 'react';
const SearchContainer = () => {
  const[localSearch, setLocalSearch] = useState("")

  const{isLoading, searchStatus, searchType, sort, sortOptions} = useSelector((store)=>store.allJobs)
  const {statusOptions, jobTypeOptions}= useSelector((store)=>store.job)
  const dispatch = useDispatch() 

  const handleSearch = (e) =>{
    const name= e.target.name
    const value = e.target.value
    dispatch(handleChange({name,value}))
  }

  const debounce = ()=>{
    let timeoutID
    return (e) =>{
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(()=>{
      dispatch(handleChange({name: e.target.name,value: e.target.value}))
      },1000)
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setLocalSearch("")
    dispatch(clearFilters())
  }

  const optimizedDebounce = useMemo(()=> debounce(),[])

  return <Wrapper>
    <form className='form'>
      <h4>search form</h4>
      <div className="form-center">
        {/* SEARCH */}
        <FormRow type="text" name="search" value={localSearch} handleChange={optimizedDebounce}/>
        {/* STATUS */}
        <FormRowSelect labelText="status" name="searchStatus" handleChange={handleSearch} value={searchStatus} list={['all', ...statusOptions]}/>
        {/* TYPE */}
        <FormRowSelect labelText="type" name="searchType" handleChange={handleSearch} value={searchType} list={['all', ...jobTypeOptions]}/>        
        {/* SORT */}
        <FormRowSelect name="sort" handleChange={handleSearch} value={sort} list={sortOptions}/>          
        <button type='submit' className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear filters</button>
      </div>
    </form>
  </Wrapper>
}

export default SearchContainer