import './App.css'
import CountryList from "./components/CountryList/CountryList";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import {useState} from "react";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const updateSelectedCountry = (alphaCode: string) => {
    setSelectedCountry(alphaCode);
  };


  return (
    <div className="container">
      <div className="CountryList">
        <CountryList onClick={updateSelectedCountry}/>
      </div>
      <div className="CountryInfo">
        <CountryInfo selectedCountry={selectedCountry} />
      </div>
    </div>
  )
}

export default App
