import { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import Add from "./components/Add";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

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
