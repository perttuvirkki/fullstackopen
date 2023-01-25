import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import Add from "./components/Add";
import numberService from "./services/numberServices";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    numberService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
    console.log("persons modified");
  }, []);

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Do you want to delete ${id} ?`)) {
      numberService
        .deletePerson(id)
        .then(() => {
          setErrorMessage(`${person.name} removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setErrorMessage(`${person.name} was already removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    } else {
      return;
    }
  };

  const [filter, setFilter] = useState("");
  const filteredPersons = persons.filter(function (el) {
    return el.name.toUpperCase().includes(filter.toUpperCase());
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification errorMessage={errorMessage} message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <Add
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
      />
      <Numbers filteredPersons={filteredPersons} handleDelete={handleDelete} />
      ...
    </div>
  );
};

export default App;
