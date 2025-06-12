import {useEffect,useReducer,useState} from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todo(){

//date and time

    let[time,settime]=useState({});  
    let[Date,setDate]=useState({});    

    const URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLifG-lscjZfNzmWuqwDVBj9aVcU3Z-74eu0QrHRhn6omrApSyFKPpdn_1IPtyHLOMDIWAmGl9mVwjK51nsFC6s1qJ_yaKa0eDrC3_U_5BXgufIXdw40u5Z2SOcjYq_2AITC4qfx_rTybapW3Pe03c-bsyXuCjvjXcq6NLca5k-S7p2MIY7qphSow7Gh7Z4OrVaYVJXIlMxll6h7tT8aHtf1GtNThKdqvwOSciYPU7NgC20EZ32VwrKWFzLviba59TQmQp9867IbCOjw-MK5zykBzRq5YA&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk";
    let gettime=async()=>{
        let response= await fetch(URL);
        let Jsonres=await response.json();
        settime({hours:Jsonres.hours,minutes:Jsonres.minutes,seconds:Jsonres.seconds});
        
     }

     let getDate=async()=>{
        let response= await fetch(URL);
        let Jsonres=await response.json();
        setDate({day:Jsonres.day,month:Jsonres.month,year:Jsonres.year});
        
     }
     useEffect(() => {
        gettime();
        const interval = setInterval(gettime, 1000);
        return () => clearInterval(interval);
      }, []);
      
      useEffect(() => {
        getDate();
        const interval = setInterval(getDate, 3600000*24); 
        return () => clearInterval(interval);
      }, []);

     /////



    let [task,settask]=useState("");
    let [tasktodo,settasktodo]=useState([{task:"start", id:uuidv4(), isDone:false, atTime:{hours:0,minutes:0} ,atDate:{day:0,month:0,year:0}}]);

  
function gettask(event){
settask(event.target.value);
console.log(task);
}

function save_task(){
    // settasktodo([...tasktodo,{task:task,id:uuidv4()}]);
    settasktodo([
        ...tasktodo,
        {
          task: task,
          id: uuidv4(),
          isDone: false,
          atTime: time,
          atDate: Date
        }
      ]);
    settask("");
}

function deletetask(id){
settasktodo(tasktodo.filter((todo)=> todo.id!=id));
}

let donetask=(id)=>{
    settasktodo((prevtask)=>{
        return prevtask.map((todo)=>{
            if(todo.id===id){
                return{
                    ...todo,
                    isDone:true,
                }
            }else{
                return todo;
            }
        })
    });
}

let doneall=()=>{
    settasktodo((prevtask)=>{
        return prevtask.map((todo)=>{
                return{
                    ...todo,
                    isDone:true,
                }
        })
    });
}
    return (
        <>
        <h1>To-Do App!</h1>
        <input placeholder="enter your task" value={task} onChange={gettask}/>
        &nbsp; &nbsp;
        <button onClick={save_task}>submit</button>
        <hr />
        <h3>tasks:</h3>
        <ul>
            {
                tasktodo.map((task)=>(
                    <li key={task.id} style={{ listStyleType: 'none' ,border:"1px solid white", borderRadius:"15px"}}>
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
        </>
    );
}