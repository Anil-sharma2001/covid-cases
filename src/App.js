import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import { areArraysEqual } from "@mui/base";
import Table from './Table'
import {sortData} from "./utij"
import "leaflet/dist/leaflet.css";



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(1);
  const [countryInfo, setCountryInfo]=useState({});
  const [tableData , setTableData]=useState([]);
  const [mapCenter,setMapCenter]=useState({lat:34.80746,lng:-40.4796});
  const [mapZoom,setMapZoom]=useState(3)
   
  useEffect(() => {
    // async => send a request ,wait for it ,do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData= sortData(data)
          
          setTableData(sortedData)
          setCountries(countries);
       
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  
  const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' :
   `https://disease.sh/v3/covid-19/countries/${countryCode}`
   
   await fetch(url)
   .then((response)=>response.json())
   .then((data)=>{
     setCountry(countryCode);
     setCountryInfo(data);
    //  console.log(data.countryInfo.long)
     setMapCenter([data.countryInfo.lat,data.countryInfo.long])
     setMapZoom(4);
     console.log(mapCenter)
   })                                 

  };
  
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h2>COVID-19 TRACKER</h2>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value={1}>Worldwide</MenuItem>
              {countries.map((e) =>(
                <MenuItem value={e.value}>{e.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <div>
          <Map 
          center={mapCenter}
          zoom={mapZoom}
          ></Map>
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>live cases of country</h3>
          <Table countries={tableData}/>
          <h3>worldwide new cases</h3>
          
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
{
  /* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">option2</MenuItem>
          <MenuItem value="worldwide">option3</MenuItem>
          <MenuItem value="worldwide">yooo</MenuItem> */
}                                                                                                                                                                                                                               
