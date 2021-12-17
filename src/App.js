import Temp from './components/Temp'
import TimeDate from './components/TimeDate'
import Status from './components/Status'
import Location from './components/Location'
import {useState, useEffect} from 'react'
/* Gets data through api given a specified latitude, longitude, and api key. See
openweathermap.org/api for more info*/ 
const request="api key"

function App() {
  const [userData, setUserData] = useState([]);
  const [tempCondition, tempConditionSet] = useState("container");

  useEffect(() => {
    /* Http request via Api */
    async function fetchData(){
    const response = await fetch (request);
    const data = await response.json();
    /* Temp vars that hold specific JSON data from http request */
    /* Edits status information to start with capital letter */
    const rawstatus = data.weather[0].description;
    const substring = data.weather[0].description.substr(1, rawstatus.length-1);
    const status = data.weather[0].description[0].toUpperCase() + substring;
    /* Status editing ends */
    const location = data.name;
    const temperature = data.main.temp;
    /* Alters background-color based on temperature from JSON data */
    if (temperature >= 60) {
      tempConditionSet("container warm")
    } else if (32 < temperature < 60) {
      tempConditionSet("container fair")
    } else {
      tempConditionSet("container cold")
    }
    /* Stores data in the userData var, via state */
    setUserData([status, location, temperature]);
    }
    /* Calls fetch function every 30 minutes, to update weather */
    setInterval(fetchData(), 1800000);
  }, []);

  
  return (
      <div className={tempCondition}>
        <div className="info">
          <Status props={userData[0]}/>
          <Location props={userData[1]}/>
          <TimeDate />
          <Temp props={Math.floor(userData[2])}/>
        </div>
      </div>
  );
}

export default App;
