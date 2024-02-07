import React, {useEffect, useState} from "react";
import {CountryInfo as CountryInfoType} from "../../typos";
import axios from "axios";
import {COUNTRY_INFO_BY_ALPHA_URL} from "../../constants";

interface Props {
  selectedCountry: string | null;
}

const CountryInfo: React.FC<Props> = ({selectedCountry}) => {
  const [countryData, setCountryData] = useState<CountryInfoType | null>(null)

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchCountryInfoData = async () => {
      const response = await axios.get<CountryInfoType[]>(COUNTRY_INFO_BY_ALPHA_URL + `/${selectedCountry}`);
      let promises: Promise<string>[] = [];

      if (response.data[0].borders !== undefined) {
        promises = response.data[0].borders.map(async border => {
          const infoResponse = await axios.get<CountryInfoType[]>(COUNTRY_INFO_BY_ALPHA_URL + `/${border}`);
          return infoResponse.data[0].name.common
        });
      }

      const newCountryInfo = {
        ...response.data[0],
        borders: await Promise.all(promises),
      }

      setCountryData(newCountryInfo);
    };
    void fetchCountryInfoData().catch(console.error);

  }, [selectedCountry]);

  const borderCountryName = countryData && countryData.borders ? countryData.borders.map((border) => (
    <li key={border}>{border}</li>
  )) : null;

  return (
    <div>
      <h2>Country Info</h2>
      {countryData ? (
        <div>
          <h3>{countryData.name.common}</h3>
          {/*<p><strong>Capital:</strong> {countryData.capital}</p>*/}
          {/*<p><strong>Population:</strong> {countryData.population} M</p>*/}
          <h4>Borders:</h4>
          <ul>
            {borderCountryName}
          </ul>
        </div>
      ) : (
        <p>Select a country to view info</p>
      )}
    </div>
  );
};

export default CountryInfo;