import { useState, useEffect } from "react";
import Country from "../country/Country";
import Search from "../search/Search";
import "./country.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data);
        setFilteredCountries(data);
      });
  }, [setCountries]);

  // search countrys
  const handleSearch = (searchValue) => {
    const value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilteredCountries(newCountries);
  };
  return (
    <section>
      <h1 style={{ fontSize: "2rem" }}>List of Countries</h1>
      <Search onSearch={handleSearch} />
      <div className="countries">
        {filteredCountries.map((country, index) => (
          // console.log(country)
          <Country key={index} country={country} />
        ))}
      </div>
    </section>
  );
};

export default Countries;
