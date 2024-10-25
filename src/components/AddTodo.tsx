import { FormEvent, useState } from "react"
import { useTodos } from "../store/todos";

const AddTodo = () => {
    const [todo, setTodo] = useState("");
    const {handleAddTodo} = useTodos();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {    //defining type of event as form event

        e.preventDefault();
        handleAddTodo(todo)
        setTodo("")
    }  

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}>
                </input>
                <button>ADD</button>
            </form>
        </div>
    )
}

export default AddTodo