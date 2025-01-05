import store from "./store/configureStore";
import { addTask, removeTask, completedTask, getTasks, fetchTasks, loadTasks,
  addNewTask,
  updateCompleted,
  deleteTask } from "./store/tasks";
import { addEmployee } from "./store/employees";
import axios from "axios";

// const unsubscribe = store.subscribe(() => {
//     console.log("Updated", store.getState());
// });

 /* store.dispatch(addTask({task: "Task 1"}));
 store.dispatch(addTask({task: "Task 2"}));
 //console.log(store.getState());

// unsubscribe();
 store.dispatch(completedTask({id: 2}));

 store.dispatch(removeTask({id: 1}));
 //console.log(store.getState());
 store.dispatch(addEmployee({ name: "Harley" })); */

/*  const getingTasks = async () => {
    //calling api
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      console.log('response=', response?.data)
      //dispatch action
      store.dispatch(getTasks({tasks: response?.data}))
    } catch (error) {
      store.dispatch({type: "SHOW_ERROR", payload: { error: error.message}})
    }
   
 }
 getingTasks(); */

 //store.dispatch(fetchTasks())

store.dispatch(loadTasks());
store.dispatch(addNewTask({ task: "Complete This Exercise" }));
store.dispatch(updateCompleted({ id: 6, completed: true }));
store.dispatch(deleteTask({ id: 6 }));
