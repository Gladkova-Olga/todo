import {TaskType} from "../../../../dal/api";

type PropsType = {
    task: TaskType

}


export const Task = ({task}: PropsType) => {
    return (
        <div>
            <input type={'checkbox'}/>
            <span>{task.title}</span>
            <button>delete</button>
        </div>
    )
}