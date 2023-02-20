import {TaskType} from "../../../../dal/api";

type PropsType = {
    task: TaskType
    deleteTask: (todolistID: string, taskID: string) => void
}


export const Task = ({task, deleteTask}: PropsType) => {
    const deleteTaskHandler = () => deleteTask(task.todoListId, task.id);

    return (
        <div>
            <input type={'checkbox'}/>
            <span>{task.title}</span>
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