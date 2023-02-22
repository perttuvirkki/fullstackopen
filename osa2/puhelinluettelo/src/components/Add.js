import { useState } from "react";
import numberService from "../services/numberServices";

const Add = ({ persons, setPersons, setMessage, setErrorMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const duplicatecheck = persons.map((person) => person.name);
    const person = persons.find((p) => p.name === newName);
    const changedNumber = { ...person, number: newNumber };

    if (duplicatecheck.includes(newName)) {
      if (
        window.confirm(
          `${newName} already added to phonebook, replace the old number with a new one?`
        )
      ) {
        numberService.update(person.id, changedNumber).then((updatePerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : updatePerson))
          );
          setMessage(
            `Updated ${person.name} number to ${changedNumber.number}`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      numberService
        .create(nameObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${nameObject.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("frontend: ", error.response.data.error);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
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
