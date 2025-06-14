import {useEffect,useReducer,useState,useRef} from "react";
import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from "./todoContext.jsx"; 
import Date from "./date.jsx";
export default function Todo(){



//date and time
// definig the state variable uaing the Use state that deflects the time in the todo app

    let[time,settime]=useState({});  
    let[Date_,setDate_]=useState({});    

    const URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLifG-lscjZfNzmWuqwDVBj9aVcU3Z-74eu0QrHRhn6omrApSyFKPpdn_1IPtyHLOMDIWAmGl9mVwjK51nsFC6s1qJ_yaKa0eDrC3_U_5BXgufIXdw40u5Z2SOcjYq_2AITC4qfx_rTybapW3Pe03c-bsyXuCjvjXcq6NLca5k-S7p2MIY7qphSow7Gh7Z4OrVaYVJXIlMxll6h7tT8aHtf1GtNThKdqvwOSciYPU7NgC20EZ32VwrKWFzLviba59TQmQp9867IbCOjw-MK5zykBzRq5YA&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk";
    let gettime=async()=>{
        let response= await fetch(URL);
        let Jsonres=await response.json();
        settime({hours:Jsonres.hours,minutes:Jsonres.minutes,seconds:Jsonres.seconds});
        
     }

     let getDate=async()=>{
        let response= await fetch(URL);
        let Jsonres=await response.json();
        setDate_({day:Jsonres.day,month:Jsonres.month,year:Jsonres.year});
        
     }
    
// using the useEffect to render the time initially for the first time
     useEffect(() => {
        gettime();
        const interval = setInterval(gettime, 100); //fetchig the current time using the above API
        return () => clearInterval(interval);
      }, []);
      
//  using the useEffect to render the date initially for the first time
      useEffect(() => {
        getDate();
        const interval = setInterval(getDate, 3600000*24); // here it is the miliseconds in one day
        return () => clearInterval(interval);
      }, []);


  let [task,settask]=useState("");
    // let [tasktodo,settasktodo]=useState([{task:"start", id:uuidv4(), isDone:false, atTime:{hours:0,minutes:0} ,atDate:{day:0,month:0,year:0}}]);

//using the useReducer hook of the React.js
const [tasktodo, dispatch] = useReducer(taskReducer, [
    {
      task: "start",
      id: uuidv4(),
      isDone: false,
      atTime: { hours: 0, minutes: 0 },
      atDate: { day: 0, month: 0, year: 0 }
    }
  ]);

// calling the useReducer using the dispatch
  function save_task() {
    dispatch({
      type: "ADD_TASK",
      payload: {
        task: task,
        time: time,
        date: Date_
      }
    });
    settask("");
  }
  
  function deletetask(id) {
    dispatch({ type: "DELETE_TASK", payload: { id } });
  }

  function donetask(id) {
    dispatch({ type: "done", payload: { id } });
  }

  function doneall() {
    dispatch({ type: "ALL_DONE" });
  }
  
//defining the variable that defines the task is being added using useref
const prevTaskCount = useRef(tasktodo.length);

// prints the task is being added if there is a rerendering in the tasktodo list
useEffect(() => {
  if (prevTaskCount.current < tasktodo.length) {
    console.log("Task Added");
  }
  if (prevTaskCount.current > tasktodo.length) {
    console.log("Task Removed");
  }
  prevTaskCount.current = tasktodo.length;
}, [tasktodo]);

//defining the reducer function
function taskReducer(state, action) {
    switch (action.type) {
      case "ADD_TASK":
        return [
          ...state,
          {
            task: action.payload.task,
            id: uuidv4(),
            isDone: false,
            atTime: action.payload.time,
            atDate: action.payload.date
          }
        ];
      case "DELETE_TASK":
        return state.filter((todo) => todo.id !== action.payload.id);
      case "done":
        return state.map((todo) =>
          todo.id === action.payload.id ? { ...todo, isDone: true } : todo
        );
      case "ALL_DONE":
        return state.map((todo) => ({ ...todo, isDone: true }));
      default:
        return state;
    }
  }
  
  
function gettask(event){
settask(event.target.value);
console.log(task);
}
    return (
        <>
      <TodoContext.Provider value={{
      time,
      Date_,
    }}>
      <Date/>
        <h1>To-Do App!</h1>
        <input placeholder="enter your task" value={task} onChange={gettask}/>
        &nbsp; &nbsp;
        <button onClick={save_task}>submit</button>
        <hr />
        <h3>tasks:</h3>
        <ul>
            {
                tasktodo.map((task)=>(
                    <li key={task.id} style={{ listStyleType: 'none'}}>
                    {
                        task.isDone?<span><i className="fa-solid fa-check" style={{color:"green"}}></i></span>:<i className="fa-solid fa-xmark" style={{color:"red"}}></i>
                    }&nbsp; &nbsp;<span style={task.isDone ? { textDecoration: "line-through" } : {}}>{task.task}</span>&nbsp; &nbsp; 
                    &nbsp; &nbsp; &nbsp; &nbsp; <span>{task.atDate.day}/{task.atDate.month}/{task.atDate.year}</span> &nbsp; &nbsp; &nbsp; &nbsp;
                    <span>{task.atTime.hours}:{task.atTime.minutes}</span>&nbsp; &nbsp;
                    <span><button onClick={()=>deletetask(task.id)} style={{ borderRadius:"15px",border:"0.5px"}}>delete</button></span>&nbsp; &nbsp;
                    <span><button onClick={()=>donetask(task.id)} style={{ borderRadius:"15px",border:"0.5px"}}>Done</button></span>
                    </li>
                ))
            }
        </ul>
        <button onClick={doneall}>Done All</button>
        </TodoContext.Provider>
        </>
    );
}