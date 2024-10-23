
const Persons = (props) => {

  const {filteredPersons, deletePerson} = props

  if(filteredPersons.length > 0) {
    return( 
      <div>
        <h3>Numbers</h3>
        {filteredPersons.map
          (person => 
            <div key={person.id}> 
              {person.name}&nbsp; &nbsp;
              {person.number} 
              &nbsp; &nbsp;
              <button onClick={(event) => deletePerson(event, person.id, person.name)}>
                Delete
              </button>
            
            </div>
          )
        }
      </div>
    )
  } else {
    return(
      <div>
        <h3>Numbers</h3>
        <div>No numbers in database</div>
      </div>)
  }
}
  
  export default Persons