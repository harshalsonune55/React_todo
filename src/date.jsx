import { useEffect, useState } from "react";
import Todo from "./todo.jsx";

export default function Date() {

    let[time,settime]=useState({});  
    let[Date,setDate]=useState({});    

    const URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLifG-lscjZfNzmWuqwDVBj9aVcU3Z-74eu0QrHRhn6omrApSyFKPpdn_1IPtyHLOMDIWAmGl9mVwjK51nsFC6s1qJ_yaKa0eDrC3_U_5BXgufIXdw40u5Z2SOcjYq_2AITC4qfx_rTybapW3Pe03c-bsyXuCjvjXcq6NLca5k-S7p2MIY7qphSow7Gh7Z4OrVaYVJXIlMxll6h7tT8aHtf1GtNThKdqvwOSciYPU7NgC20EZ32VwrKWFzLviba59TQmQp9867IbCOjw-MK5zykBzRq5YA&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk";
    let gettime=async()=>{
        let response= await fetch(URL);
        let Jsonres=await response.json();
        settime({hours:Jsonres.hours,minutes:Jsonres.minutes,seconds:Jsonres.seconds});
        
     }

     useEffect(()=>{
        gettime();
        const interval = setInterval(gettime, 1000); 
        return () => clearInterval(interval); 
     },[time]);

     let getDate=async()=>{
        let response= await fetch(URL);
        let Jsonres=await response.json();
        setDate({day:Jsonres.day,month:Jsonres.month,year:Jsonres.year});
        
     }
     useEffect(()=>{
        getDate();
        const interval = setInterval(getDate, 3600*24); 
        return () => clearInterval(interval); 
     },[Date]);


    return (
        <>
        <div>
            <p>{Date.day}/{Date.month}/{Date.year}</p>
            <p>{time.hours}:{time.minutes}:{time.seconds}</p>
        </div>
        </>

    );
}