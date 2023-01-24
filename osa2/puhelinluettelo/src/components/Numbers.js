import Person from "./Person";

const Numbers = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>

      <ul>
        {filteredPersons.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Numbers;
