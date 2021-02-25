export const TaskRow = props => (
    <tr>
        <td>{ props.task.name }</td>
        <td>
            <input type="checkbox"
                   checked={ props.task.done }
                   onChange={ () => props.toggleTask(props.task) }/>
        </td>
    </tr>
);