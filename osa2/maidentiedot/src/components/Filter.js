import Countries from "./Countries";
import Country from "./Country";

const Filter = ({ countries, search, setSearch }) => {
  const filteredCountries = countries.filter(function (el) {
    if (search === "") {
      return null;
    } else {
      return el.name.common.toUpperCase().includes(search.toUpperCase());
    }
  });

  if (filteredCountries.length >= 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  if (filteredCountries.length === 1) {
    console.log("filter:", filteredCountries[0]);

    return <Country filteredCountries={filteredCountries[0]} />;
  }

  return (
    <div>
      <ul>
        {filteredCountries.map((country) => (
          <Countries
            key={country.name.official}
            country={country}
            setSearch={setSearch}
          />
        ))}
      </ul>
    </div>
  );
};

export default Filter;
