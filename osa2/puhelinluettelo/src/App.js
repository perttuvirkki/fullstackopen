import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import Add from "./components/Add";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [filter, setFilter] = useState("");
  const filteredPersons = persons.filter(function (el) {
    return el.name.includes(filter);
  });

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Add persons={persons} setPersons={setPersons} />
      <Numbers filteredPersons={filteredPersons} />
      ...
    </div>
  );
};

export default App;
