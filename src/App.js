import { useEffect, useState, useRef } from "react";
import { RiSearchLine } from 'react-icons/ri';

function App() {
  const [location, Setlocation] = useState('');
  const [data, ssetdata] = useState({});
  const searchbuttonRef = useRef();

  async function search() {
    const API_key = `226b43f4743c8cf41972735df8bb8beb`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}&units=metric`;
    const datac = await fetch(url).then(response => response.json()).then(datac => ssetdata(datac));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        navigator.geolocation.getCurrentPosition(s, n);

        async function s(p) {
          const lat = p.coords.latitude;
          const lon = p.coords.longitude;
          const API_key = `226b43f4743c8cf41972735df8bb8beb`;

          const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_key}`;
          await fetch(url)
            .then((response) => response.json())
            .then((data) => data[0].name)
            .then((ll) => {
              Setlocation(ll);
              searchbuttonRef.current.click();
            });
        }

        function n(error) {
          alert("Location Access Denied. Enter Manually.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  function entercheck(event) {
    console.log("enter pressed");
    if (event && event.key === "Enter") {
      search();
    }
  }

  const iconurl = data?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    : '';

  return (
    <div className="bg-gradient-to-r from-black via-gray-500 to to-black items-center">
      <div className="flex flex-col h-screen justify-center items-center font-bold">
        <div className="h-screen w-full p-5 sm:p-10 md:w-[800px] md:rounded md:mx-auto md:my-10 lg:w-[1000px] justify-center mt-[100px] items-center">
          <div className="flex  w-full justify-center">
            <input
              className="mb-2 p-2 rounded-md text-gray-800 w-[500px]"
              type="text"
              placeholder="Enter City Name"
              onChange={event => Setlocation(event.target.value)}
              onKeyPress={entercheck}
            />
            <button
              type="submit"
              ref={searchbuttonRef}
              className=" hover:bg-slate-600 duration-500 text-white rounded-md p-2 font-semibold text-xl ml-4"
              onClick={search}
            >
              <RiSearchLine className="search-icon" />
            </button>
          </div>
          <div className="flex flex-col w-full my-5 items-center">
            <h1 className="text-3xl md:text-5xl text-white font-semibold text-center mb-2">{data.name}</h1>
            {data.main ? <h2 className="text-4xl md:text-5xl text-white font-semibold mb-2">{data.main.temp.toFixed()}°C</h2> : null}
            {iconurl && <img src={iconurl} className="h-16 md:h-24" alt="Weather Icon" />}
          </div>
          {data.name !== undefined && (
            <div className="grid grid-cols-2 gap-3 w-full text-white">
              <div className="feels flex py-3 mx-3 bg-slate-600 text-white rounded justify-center text-sm md:text-[17.5px] items-center hover:text-xl duration-500">
                <p>Feels Like</p>
                {data.main ? <p className='bold mx-5'>{data.main.feels_like.toFixed()}°C</p> : null}
              </div>
              <div className="temp max flex py-3 mx-3 bg-slate-600 text-white rounded justify-center hover:text-xl duration-500 text-sm md:text-[17.5px] items-center">
                <p>Max temp</p>
                {data.main ? <p className='bold mx-5'>{data.main.temp_max}°C</p> : null}
              </div>
              <div className="temp min flex py-3 mx-3 bg-slate-600 text-white rounded justify-center hover:text-xl duration-500 text-sm md:text-[17.5px] items-center">
                <p>Min temp</p>
                {data.main ? <p className='bold mx-5'>{data.main.temp_min}°C</p> : null}
              </div>
              <div className="humidity flex py-3 mx-3 bg-slate-600 text-white rounded justify-center hover:text-xl duration-500 text-sm md:text-[17.5px] items-center">
                <p>Humidity</p>
                {data.main ? <p className='bold mx-5'>{data.main.humidity}%</p> : null}
              </div>
              <div className="wind flex py-3 mx-3 bg-slate-600 text-white rounded justify-center hover:text-xl duration-500 text-sm md:text-[17.5px] items-center">
                <p>Wind Speed</p>
                {data.wind ? <p className='bold mx-5'>{data.wind.speed.toFixed()} KPH</p> : null}
              </div>
              <div className="Pressure flex py-3 px-5 mx-3 bg-slate-600 text-white rounded justify-center hover:text-xl duration-500 text-sm md:text-[17.5px] items-center ">
                <p className="pl-5">Air pressure</p>
                {data.wind ? <p className='bold mx-5 '>{data.main.pressure}hPa</p> : null}
              </div>
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
