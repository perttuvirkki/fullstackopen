const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Filter</h2>
      filter: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
