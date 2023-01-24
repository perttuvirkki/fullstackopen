const Person = ({ person, handleDelete }) => {
  const handleClick = () => {
    handleDelete(person.id);
  };

  return (
    <li>
      {person.name}&nbsp;
      {person.number}&nbsp;
      <button onClick={handleClick}>delete</button>
    </li>
  );
};

export default Person;
