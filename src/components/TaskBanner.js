export const TaskBanner = props => {
    let cantidad = props.taskItems.filter(t => !t.done).length;
    let taskToDo = cantidad === 1
                   ? `(queda ${cantidad} tarea por hacer)`
                   : `(quedan ${cantidad} tareas por hacer)`;
    return (
        <h4 className="bg-primary text-white text-center p-4">
            { props.userName } - App de Tareas con ReactJS { taskToDo }.
        </h4>
    );
};