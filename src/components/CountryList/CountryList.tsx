import {CountryInfo as CountryInfoType} from "../../typos";
import CountryItem from "./CountryItem";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {COUNTRY_LIST_URL} from "../../constants";

interface Props {
  onClick: (alphaCode: string) => void
}

const CountryList: React.FC<Props> = ({onClick}) => {
  const [countries, setCountries] = useState<CountryInfoType[]>([]);

  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<CountryInfoType[]>(COUNTRY_LIST_URL);
    setCountries(countriesResponse.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData])


  return (
    <ul>
      {countries.map((countryItem) => (
          <CountryItem key={countryItem.cca3} country={countryItem} onClick={onClick} />
      ))}
    </ul>
  );
};

export default CountryList;