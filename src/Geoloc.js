import { useEffect, useState } from "react";
const API_key=`226b43f4743c8cf41972735df8bb8beb`


async function Geoloc() {
      await navigator.geolocation.getCurrentPosition(s);
      
      async function s(p){
        console.log(p);
        const lat=p.coords.latitude;
        const lon=p.coords.longitude;
        const API_key=`226b43f4743c8cf41972735df8bb8beb`
    
        const url =`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_key}`
        const data=await fetch(url).then((response)=> response.json()).then(data=>data);
        
        console.log("abc",data[0].name)
       return{data};
      
       
      }
    
}
export {Geoloc}