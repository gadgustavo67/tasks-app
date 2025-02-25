import { useState } from 'react';

export const TaskCreator = props => {

    const [newTaskName, setNewTaskName] = useState("");

    const updateNewTaskValue = e => setNewTaskName(e.target.value);

    const createNewTask = () => {
        props.callback(newTaskName);
        setNewTaskName("");
    };

    return (
        <div className="my-1">
            <input type="text"
                   className="form-control"
                   value={ newTaskName }
                   onChange={ updateNewTaskValue }/>
            <button className="btn btn-success mt-1 mb-3"
                    onClick={ createNewTask }>
                Add
            </button>
        </div>
    );
};