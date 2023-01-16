import Person from "./Person";

const Numbers = ({ filteredPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>

      <ul>
        {filteredPersons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default Numbers;
