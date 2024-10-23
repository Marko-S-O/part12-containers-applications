const PersonForm = (props) => {

    const addPerson = props.addPerson
    const handlePersonChange = props.handlePersonChange
    const handleNumberChange = props.handleNumberChange
    const newName = props.newName
    const newNumber = props.newNumber

    return(
        <div>
            <h3>Add a new</h3>
            
            <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handlePersonChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <button type="submit">add</button>
            </form>
        </div>
        
    )
}

export default PersonForm