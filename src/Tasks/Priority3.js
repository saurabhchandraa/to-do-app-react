import React from 'react';
import './Tasks.css';
import axios from 'axios';

const Priority3 = (props) => {

    const removeHandler = (id) => {
        axios.delete(`http://localhost:8080/tasks/${id}`)
            .then(() => {
                let arr = props.items3;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id === id) {
                        arr = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
                    }
                }
                props.setItems3(arr);
                console.log('Item Removed');
            });
    };

    return (
        <div className='priority3'>
            <ul>
                {props.items3.map((task, i) => (
                    <li key={i}>
                        <div className='task-item'>{task.taskName}
                            <button type='submit' onClick={() => removeHandler(task.id)}>Remove</button></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Priority3;