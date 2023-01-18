import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="App">
      <p>find countries</p>
      <SearchBar search={search} setSearch={setSearch} />
      <Filter search={search} setSearch={setSearch} countries={countries} />
    </div>
  );
}

export default App;
