import { createAction, createReducer, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/http";
import { apiCallBegan } from "./api";
let id = 0;
const initialState = {
    tasks: [],
    loading: false,
    error: null
}




/* export const fetchTasks = createAsyncThunk('fetchTasks',async (a, {rejectWithValue})=>{
    try {
        const response = await axios.get('/tasks');
        return { tasks: response?.data}
    } catch (err) {
        return rejectWithValue({error: err?.message});
    }
    
});
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        getTasks: (state, action) => {
           state.tasks =  action?.payload?.tasks;
        },
        addTask: (state, action) => {
            state.tasks.push( {
                id: ++id,
                task: action.payload.task,
                completed: false,
            })
        },
        removeTask: (state, action) => {
            const index = state.tasks?.findIndex(task => task.id === action.payload.id);
            state.tasks?.splice(index, 1)
        },
        completedTask: (state, action) => {
            const index = state.tasks?.findIndex(task => task.id === action.payload.id);
            state.tasks[index].completed = true;
        },

    },
    extraReducers: (builder)=> {
       
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action?.payload?.tasks;
            state.loading = false;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.error
        })
        
    }
})

export const { addTask, removeTask, completedTask, getTasks } = taskSlice.actions;
export default taskSlice.reducer; */

// Actions
/* export const addTask = createAction('ADD_TASK');
export const removeTask = createAction('REMOVE_TASK');
export const completedTask = createAction('TASK_COMPLETED');

 */


// Reducer
/* let id = 0;
//  toolkit automatocall tacke care off imutability uing immer behind the schen
export default createReducer([], {
    [addTask?.type]: (state, action)=>{
        state.push( {
            id: ++id,
            task: action.payload.task,
            completed: false,
        })
    },
    [removeTask?.type]: (state, action) =>{
        //state.filter((task) => task.id !== action.payload.id)
        const index = state?.findIndex(task => task.id === action.payload.id);
        state?.splice(index, 1)
    },
    [completedTask?.type]: (state, action) => {
        const index = state?.findIndex(task => task.id === action.payload.id);
        state[index].completed = true;
    }
}) */

// imutable code
/* export default function reducer(state = [], action) {
    switch (action.type) {
        case addTask?.type:
            return [
                ...state,
                {
                    id: ++id,
                    task: action.payload.task,
                    completed: false,
                },
            ];

        case removeTask?.type:
            return state.filter((task) => task.id !== action.payload.id);

        case completedTask?.type:
            return state.map((task) =>
                task.id === action.payload.id
                    ? {
                          ...task,
                          completed: true,
                      }
                    : task
            );

        default:
            return state;
    }
} */


// above is for refrnce purpose for other way of coding

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // action: function
        apiRequested: (state, action) => {
            state.loading = true;
        },
        apiRequestFailed: (state, action) => {
            state.loading = false;
        },
        getTasks: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            state.tasks.splice(index, 1);
        },
        completedTask: (state, action) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            state.tasks[index].completed = action.payload.completed;
        },
    },
   /*  extraReducers: (builder)=> {
       
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action?.payload?.tasks;
            state.loading = false;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.error
        })
        
    }, */
});

export const {
    apiRequested,
    apiRequestFailed,
    getTasks,
    addTask,
    removeTask,
    completedTask,
} = taskSlice.actions;
export default taskSlice.reducer;

// Action Creators
const url = "/tasks";

export const loadTasks = () =>
    apiCallBegan({
        url,
        onStart: apiRequested.type,
        onSuccess: getTasks.type,
        onError: apiRequestFailed.type,
    });

export const addNewTask = (task) =>
    apiCallBegan({
        url,
        method: "POST",
        data: task,
        onSuccess: addTask.type,
    });

export const updateCompleted = (task) =>
    apiCallBegan({
        // /tasks/6
        url: `${url}/${task.id}`,
        method: "PATCH",
        data: task,
        onSuccess: completedTask.type,
    });

export const deleteTask = (task) =>
    apiCallBegan({
        // /tasks/6
        url: `${url}/${task.id}`,
        method: "DELETE",
        onSuccess: removeTask.type,
    });