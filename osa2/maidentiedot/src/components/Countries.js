const Countries = ({ country, setSearch }) => {
  const ChooseCountry = () => {
    setSearch(country.name.common);
  };

  return (
    <li>
      {country.name.common}
      <button onClick={ChooseCountry}>show</button>
    </li>
  );
};

export default Countries;
