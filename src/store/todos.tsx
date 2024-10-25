import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps = {   //Props type for Provider
    children: ReactNode   // is a type that represents any renderable content in a React component. 
                        //It can include various types of elements that can be returned by a component, 
                        //providing a way to define the props for components that can accept children or other React elements.
}

export interface Todos {   // Todo Interface-- Interfaces are a way to define the shape of an object
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date
}

export type TodoContext = {   // context type for todo
    todos: Todos[];
    handleAddTodo: (task: string) => void;   // void Represents the absence of a type, commonly used for functions that do not return a value.
    toggleTodoAsCompleted: (id: string) => void
    handleDeleteTodo: (id: string | number) => void   // UNION is used for id--Union types allow you to define a type that can be one of several types.
}

//mera data type ka type hai TodoContext
export const todoContext = createContext<TodoContext | null>(null)

//need to create a component
//children = complete app(App.tsx)
export const TodosProvider = ({ children }: TodosProviderProps) => {

    
//generic type is used here
//This line initializes the state variable todos to an array of Todos objects. 
//By using a generic type, TypeScript ensures that any updates to todos must 
//adhere to the structure defined by the Todos type

 const [todos, setTodos] = useState<Todos[]>(()=>{ 
        try {
            const newTodos = localStorage.getItem("My Todos") || "[]";
            return JSON.parse(newTodos) as Todos[]
        } catch (error) {
            return [];
        }
    })

    const handleAddTodo = (task: string) => {   //defining type of task
        setTodos((prev) => {
            const newTodos: Todos[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem('My Todos', JSON.stringify(newTodos))
            return newTodos;
        })
    }

    //completed toggle 
    const toggleTodoAsCompleted = (id: string | number) => {   // defining type of id
        setTodos((prev) => {
          let newTodos = prev.map((todo) => {
            if(todo.id === id){
                return {...todo, completed:!todo.completed}
            }
            else{
                return todo;
            }
          })
          localStorage.setItem('My Todos', JSON.stringify(newTodos))
          return newTodos;
        })
    }

    const handleDeleteTodo = ((id: string | number)=>{
        setTodos((prev)=>{
            let newTodos = prev.filter((filterTodo)=> filterTodo.id !== id)
            localStorage.setItem('My Todos', JSON.stringify(newTodos))
            return newTodos;
        })
    })

    return <todoContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo }}>
        {children}
    </todoContext.Provider>
}

//consumer

export const useTodos = () => {   // custom hook
    const todoConsumer = useContext(todoContext);
    if (!todoConsumer) {
        throw new Error("useTodos used outside of the Provider")
    }
    return todoConsumer
}