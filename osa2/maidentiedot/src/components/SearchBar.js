const SearchBar = ({ search, setSearch }) => {
  const handleFilterChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      search: <input value={search} onChange={handleFilterChange} />
    </div>
  );
};

export default SearchBar;
