import {useEffect,useState} from "react";
import { TodoContext } from "./todoContext.jsx"; 
import Date from "./date.jsx";
import { useSelector,useDispatch } from "react-redux";
import { ADD_TASK,DELETE_TASK,done,ALL_DONE } from "./features/todo/todoSlice.js";
import { fetchTime } from "./features/todo/todoSlice.js";
import {fetchDate} from "./features/todo/todoSlice.js"


export default function Todo(){

const todos=useSelector((state)=> state.tasktodo.tasktodo);
const timeR=useSelector((state)=> state.timetodo);
const dateR=useSelector((state)=> state.datetodo)
const dispatch=useDispatch();

//date and time
// definig the state variable uaing the Use state that deflects the time in the todo app

    let[time,settime]=useState({});  
    let[Date_,setDate_]=useState({}); 
    let [task,settask]=useState("");   

//using the useeffect hook to fetch time after every sec for first time
    useEffect(() => {
      dispatch(fetchTime());
      const interval = setInterval(() => dispatch(fetchTime()), 1000);
      return () => clearInterval(interval);
    }, []);
    useEffect(() => {
      dispatch(fetchDate());
      const interval = setInterval(() => dispatch(fetchDate()), 3600000*24);
      return () => clearInterval(interval);
    }, []);
// using the useEffect hook to fetch the time and assign it to the time useState as soon as it changes!
    useEffect(() => {
      if (timeR.data) {
        settime({
          hours: timeR.data.hours,
          minutes: timeR.data.minutes,
          seconds: timeR.data.seconds,
        });
      }
    }, [timeR.data]);
    useEffect(() => {
      if (dateR.data) {
        setDate_({
          day: dateR.data.day,
          month: dateR.data.month,
          year: dateR.data.year,
        });
      }
    }, [dateR.data]);
      

// calling the useReducer using the dispatch
  function save_task() {
    dispatch(ADD_TASK({
      task: task,
      time: time,
      date: Date_
    }));
    settask("");
  }
  
  function deletetask(id) {
    dispatch(DELETE_TASK({ id }));
  }

  function donetask(id) {
    dispatch(done({id}));
  }

  function doneall() {
    dispatch(ALL_DONE());
  }
  
function gettask(event){
settask(event.target.value);
};

return (
        <>
      <TodoContext.Provider value={{
      time,
      Date_,
      todos,
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
                todos.map((task)=>(
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