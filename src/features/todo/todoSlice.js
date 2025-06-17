import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';


const URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLifG-lscjZfNzmWuqwDVBj9aVcU3Z-74eu0QrHRhn6omrApSyFKPpdn_1IPtyHLOMDIWAmGl9mVwjK51nsFC6s1qJ_yaKa0eDrC3_U_5BXgufIXdw40u5Z2SOcjYq_2AITC4qfx_rTybapW3Pe03c-bsyXuCjvjXcq6NLca5k-S7p2MIY7qphSow7Gh7Z4OrVaYVJXIlMxll6h7tT8aHtf1GtNThKdqvwOSciYPU7NgC20EZ32VwrKWFzLviba59TQmQp9867IbCOjw-MK5zykBzRq5YA&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk";
export const fetchTime=createAsyncThunk('fetchTime',async ()=>{
const response =await fetch(URL);
return response.json();
});

export const fetchDate=createAsyncThunk('fetchTime',async ()=>{
    const response =await fetch(URL);
    return response.json();
    });



const initialState= {
    tasktodo:[{
        task: "start",
        id: nanoid(),
        isDone: false,
        atTime: { hours: 0, minutes: 0 },
        atDate: { day: 0, month: 0, year: 0 }
      }],
  }

  export const todoSlice = createSlice({
    name: 'tasktodo',

    initialState,
    reducers: {
        ADD_TASK:(state,action)=>{
          const new_task={
            task: action.payload.task,
            id: nanoid(),
            isDone: false,
            atTime: action.payload.time,
            atDate: action.payload.date
          }
          state.tasktodo.push(new_task);
        },

        DELETE_TASK:(state,action)=>{
            state.tasktodo=state.tasktodo.filter((todo) => todo.id !== action.payload.id);
        },
        done:(state,action)=>{
            state.tasktodo=state.tasktodo.map((todo) =>
                todo.id === action.payload.id ? { ...todo, isDone: true } : todo
            );
        },
        ALL_DONE:(state,action)=>{
            state.tasktodo=state.tasktodo.map((todo) => ({ ...todo, isDone: true }));
        }
    },
  });

const timetodo=createSlice({
    name:"timetodo",
    initialState:{
        islosding:false,
        data:null,
        isError:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTime.pending,(state,action)=>{
            state.islosding=true;
        });
        builder.addCase(fetchTime.fulfilled,(state,action)=>{
            state.islosding=false;
            state.data=action.payload;
        });
        builder.addCase(fetchTime.rejected,(state,action)=>{
            console.log("error",action.payload);
            state.isError=true;
        });
    }
});

const datetodo=createSlice({
    name:"datetodo",
    initialState:{
        islosding:false,
        data:null,
        isError:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTime.pending,(state,action)=>{
            state.islosding=true;
        });
        builder.addCase(fetchTime.fulfilled,(state,action)=>{
            state.islosding=false;
            state.data=action.payload;
        });
        builder.addCase(fetchTime.rejected,(state,action)=>{
            console.log("error",action.payload);
            state.isError=true;
        });
    }
});

  export const { ADD_TASK, DELETE_TASK, done,ALL_DONE } = todoSlice.actions;
  export const timetodoReducer = timetodo.reducer;
  export const datetodoReducer = datetodo.reducer;

  export default todoSlice.reducer;

