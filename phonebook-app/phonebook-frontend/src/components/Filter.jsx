
const Filter = (props) => {

    const searchString = props.searchString
    const handleSearch = props.handleSearch

    return(
        <div>
        filter shown with
        <input value={searchString} onChange={handleSearch} />
        </div>
    )
}

export default Filter