import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";

type PropsType = {
    onClickAdd: (value: string) => void
}


export const AddItemForm = ({onClickAdd}: PropsType) => {
    const [value, setValue] = useState<string>("");
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onClickAddHandler = () => {
        onClickAdd(value);
        setValue("");
    }
    const onPressEnter = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if(e.key === "Enter") {
            onClickAdd(value);
            setValue("");
        }

    }


    return(
        <div>
            <input onChange={onChangeValue} value={value} onKeyPress={onPressEnter}/>
            <button onClick={onClickAddHandler}>Add</button>
        </div>
    )
}