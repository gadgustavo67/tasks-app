import { useState, useEffect } from 'react';
import { TaskRow } from "./components/TaskRow";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import './App.css';

function App() {

  const [userName, setUserName] = useState("Gustavo");
  const [taskItems, setTaskItems] = useState([
    {name: "Fixear Bug 5433", done: false},
    {name: "Deployar STAGE de API REST", done: false},
    {name: "Hacer curso de ReactJS", done: true},
    {name: "Crear reporte de Organismos", done: false}
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data != null) {
      setTaskItems(JSON.parse(data));
    } else {
      setTaskItems([
        {name: "Fixear Bug 5433", done: false},
        {name: "Deployar STAGE de API REST", done: false},
        {name: "Hacer curso de ReactJS", done: true},
        {name: "Crear reporte de Organismos", done: false}
      ]);
      setUserName("Gustavo");
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems])

  const taskTableRows = (doneValue) => taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
      <TaskRow key={ task.name } task={ task } toggleTask={ toggleTask }/>
  ));

  const toggleTask = task => {
    setTaskItems(taskItems.map(t => (
      t.name === task.name ? {...t, done: !t.done} : t
    )));
  };

  const createNewTask = taskName => {
    if (!taskItems.find(t => (t.name === taskName ))) {
      setTaskItems([...taskItems, {name: taskName, done: false}]);
    } else {
      setTaskItems(taskItems.map(t => (
        t.name === taskName ? {...t, done: false} : t
      )));
    }
  }

  return (
    <div className="App">
      <TaskBanner userName={ userName } taskItems={ taskItems }/>
      <TaskCreator callback={ createNewTask }/>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Terminar</th>
          </tr>
        </thead>
        <tbody>
          { taskTableRows(false) }
        </tbody>
      </table>
      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl callback={ checked => setShowCompleted(checked) }
                           isChecked={ showCompleted }/>
      </div>
      { showCompleted && (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Terminada</th>
          </tr>
        </thead>
        <tbody>
          { taskTableRows(true) }
        </tbody>
      </table>
      )}
    </div>
  );
}

export default App;
