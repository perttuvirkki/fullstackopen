import { useState } from "react";

const Add = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const duplicatecheck = persons.map((person) => person.name);

    if (duplicatecheck.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
    }
    setNewName("");
    console.log(duplicatecheck);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      {" "}
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
