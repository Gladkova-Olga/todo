import {TaskType} from "../../../../dal/api";
import {EditableSpan} from "../../../utils/editable span/EditableSpan";

type PropsType = {
    task: TaskType
    deleteTask: (todolistID: string, taskID: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, taskTitle: string) => void
}


export const Task = ({task, deleteTask, changeTaskTitle}: PropsType) => {
    const deleteTaskHandler = () => deleteTask(task.todoListId, task.id);
    const changeTaskTitleHandler = (taskTitle: string) => {
        changeTaskTitle(task.todoListId, task.id, taskTitle)
    }

    return (
        <div>
            <input type={'checkbox'}/>
            {/*<span>{task.title}</span>*/}
            <EditableSpan title={task.title} onChangeTitle={changeTaskTitleHandler}/>
            <button onClick={deleteTaskHandler}>delete</button>
        </div>
    )
}
// export const Task = ({task}: PropsType) => {
//
//     return (
//         <div>
//             <input type={'checkbox'}/>
//             <span>{task.title}</span>
//         </div>
//     )
// }