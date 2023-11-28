/* eslint-disable react/prop-types */
const Country = ({ country }) => {
  const language = country.languages;
  const arr = [];
  for (const key in language) {
    arr.push(language[key]);
  }

  return (
    <div className="country__list">
      <div className="country__image">
        <h1 className="country__name">Contry: {country.name.common}</h1>
        <img
          className="country__image"
          src={country.flags.png}
          alt={country.flags.alt}
        />
      </div>
      <div className="country__content">
        <h1 className="country__capitial">Capital: {country.capital}</h1>
        <h1 className="country__region">Region: {country.region}</h1>
        <h1 className="country__language">Languages: {arr.join(", ")}</h1>
        <h1 className="country__population">
          Population: {country.population}
        </h1>
      </div>
    </div>
  );
};

export default Country;
