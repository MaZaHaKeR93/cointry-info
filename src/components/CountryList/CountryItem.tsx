import React from "react";
import {CountryInfo as CountryInfoType} from "../../typos";

interface Props {
  country: CountryInfoType;
  onClick: (alphaCode: string) => void;
}
const CountryItem: React.FC<Props> = ({country, onClick}) => {
  return (
    <li className="CountryItem" onClick={() => onClick(country.cca3)}>{country.name.common}</li>
  );
};

export default CountryItem;