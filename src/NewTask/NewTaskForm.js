import React, { useState, useEffect } from 'react';
import styles from './NewTaskForm.module.css';

const NewTaskForm = (props) => {

    const [enteredTask, setEnteredTask] = useState('');
    const [validateTask, setValidateTask] = useState(true);
    const [selectedPriority, setSelectedPriority] = useState(0);
    const [validatePriority, setValidatePriority] = useState(true);
    const [formIsValid, setFormIsValid] = useState(true);

    useEffect(() => {
        // setFormIsValid(enteredTask.length >0 && selectedOrder >0);
        setFormIsValid(validateTask && validatePriority);
    }, [enteredTask, selectedPriority, validateTask, validatePriority]);

    const taskChangeHandler = event => {
        if (event.target.value.trim().length > 1) {
            setValidateTask(true);
        }
        setEnteredTask(event.target.value);
      };

    const priorityHandler = (event) => {
        if(event.target.value > 0) {
            setValidatePriority(true);
        }
        setSelectedPriority(Number(event.target.value));
    }

    const submitHandler = event => {
        event.preventDefault();
        if (enteredTask.trim().length === 0 || selectedPriority === 0) {
            setFormIsValid(false);
            console.log('Task Name should be atleast 2 Letters and Priority should be selected');
          return;
        }
        const tasks = {
            taskName: enteredTask,
            taskPriority: selectedPriority
        }
        console.log(tasks);
        props.onAddTask(tasks);
        setEnteredTask('');
        setSelectedPriority(0);
      };
    
    return (
            <form onSubmit={submitHandler}>
            <div className={`${styles['form-control']} ${!formIsValid && styles.invalid}`}>
                <label>Task Name:</label>
                <input type="text" value={enteredTask} onChange={taskChangeHandler} />
                <select onChange={priorityHandler} value={selectedPriority}>
                    <option value="0">Choose a Priority</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <button type="submit" className={styles.button}>Add Todo
            </button>
          </form>
    );

}

export default NewTaskForm;