import { useState, useEffect } from "react";
import Country from "../country/Country";
import Search from "../search/Search";
import "./country.css";
import spinner from "../../../assets/Spinner.gif";

const Countries = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const url = "https://restcountries.com/v3.1/all";

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

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
        {error && <h2>{error.message}</h2>}
        {isLoading && (
          <img
            style={{ textAlign: "center", marginInline: "auto" }}
            src={spinner}
            alt="this is spinner"
          />
        )}
        {filteredCountries.map((country, index) => (
          <Country key={index} country={country} />
        ))}
      </div>
    </section>
  );
};

export default Countries;
