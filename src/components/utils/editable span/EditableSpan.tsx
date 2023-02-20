import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";

type PropsType = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan = ({title, onChangeTitle}: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(title);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.currentTarget.value)
    }
    const onEnterPressHandler = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === "Enter") {
            onChangeTitle(editedTitle);
            setEditMode(false);
        }

    }
    const onBlurHandler = () => {
        setEditMode(false);
        onChangeTitle(editedTitle);

    }
    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    if (!editMode) {
        return (
                <span onDoubleClick={onDoubleClickHandler}>{title}</span>
        )
    } else {
        return (
                <input onChange={onChangeHandler} value={editedTitle} onKeyPress={onEnterPressHandler}
                       onBlur={onBlurHandler}/>
        )
    }
}