import React, { useEffect } from 'react';
import './App.css';
import './Tasks/Tasks.css';
import Priority1 from './Tasks/Priority1';
import Priority2 from './Tasks/Priority2';
import Priority3 from './Tasks/Priority3';
import NewTaskForm from './NewTask/NewTaskForm';
import { useState } from 'react';
import {getPriority1, getPriority2, getPriority3} from './TaskService';
import axios from 'axios';

function App() {

  const [priority1, setPriority1] = useState([]);
  const [priority2, setPriority2] = useState([]);
  const [priority3, setPriority3] = useState([]);

  //Using Axios
  useEffect(() => {
    getTask1();
  }, [])

  const getTask1 = () => {
    getPriority1().then((response) => {
      console.log(response);
      setPriority1(response)
    });
  };

  useEffect(() => {
    getTask2();
  }, [priority2])

  const getTask2 = () => {
    getPriority2().then((response) => {
      setPriority2(response.data)
    });
  };

  useEffect(() => {
    getTask3();
  }, [priority3])

  const getTask3 = () => {
    getPriority3().then((response) => {
      setPriority3(response.data)
    });
  };

  const addTaskHandler = (newTask) => {
    axios.post('http://localhost:8080/tasks', {
      taskName: newTask.taskName,
      taskPriority: newTask.taskPriority
    })
    .then((response) => {
      const taskData = {
        ...newTask,
        id: response.data.id
    };
    console.log(taskData);
      if (taskData.taskPriority === 1) {
      setPriority1([...priority1, taskData]);
    }

    else if (taskData.taskPriority === 2) {
      setPriority2([...priority2, taskData]);
    }

    else if (taskData.taskPriority === 3) {
      setPriority3([...priority3, taskData]);
    }
    });
  }

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <NewTaskForm onAddTask={addTaskHandler}></NewTaskForm>
      <div className='tasks'>
        <Priority1 items1={priority1} setItems1={setPriority1}></Priority1>
        <Priority2 items2={priority2} setItems2={setPriority2}></Priority2>
        <Priority3 items3={priority3} setItems3={setPriority3}></Priority3>
      </div>
    </div>
  );
}

export default App;
