import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import Add from "./components/Add";
import axios from "axios";
import numberService from "./services/numberServices";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    numberService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleDelete = (id) => {
    numberService.deletePerson(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  const [filter, setFilter] = useState("");
  const filteredPersons = persons.filter(function (el) {
    return el.name.includes(filter);
  });

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Add persons={persons} setPersons={setPersons} />
      <Numbers filteredPersons={filteredPersons} handleDelete={handleDelete} />
      ...
    </div>
  );
};

export default App;
