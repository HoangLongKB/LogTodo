import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "../../store";
import styles from './Todos.module.css';
import adjustStyle from './../../common-style/adjust-style.module.css';


function Todos() {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [state] = useStore();
  const {db, user} = state;
  const collectionRef = useRef();
  const todoInputRef = useRef();

  const getTodos = useCallback(async () => {
    if (!user) return;
    try {
      const querySnapshot = await getDocs(collectionRef.current);
      setTodos(querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      }));
    } catch (error) {
      throw new Error('Get Todos', error)
    }
  }, [user])

  useLayoutEffect(() => {
    collectionRef.current = collection(db, `users/${user.uid}/todos`);
    getTodos();
  }, [user, db, getTodos]);

  function handleAddTodo() {
    const todo = {name: todoInput, isDone: false};
    addDoc(collectionRef.current, todo)
      .then(docRef => {
        getTodos();
        setTodoInput('');
        todoInputRef.current.focus();
      })
      .catch(error => {
          throw new Error('Todos error: ', error)
      })
  }

  function handleDeleteTodo(todoId) {
    const docRef = doc(db, `users/${user.uid}/todos/${todoId}`);
    deleteDoc(docRef)
    .then(() => {
        getTodos();
    })
    .catch(error => {
        throw new Error('Todos error: ', error)
    })
  }

  function handleMarkDone(todoId, isDone) {
    const docRef = doc(db, `users/${user.uid}/todos/${todoId}`);
    const dataChange = {
      isDone
    };
    updateDoc(docRef, dataChange)
    .then(() => {
        getTodos();
    })
    .catch(error => {
        throw new Error('Todos error: ', error)
    })
  }

  return(
    <div className={`${styles['todos-wrapper']} ${adjustStyle['column-center']}`}>
      <div className={`${styles['todos']}`}>
        <input ref={todoInputRef} type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)}/>
        <button onClick={handleAddTodo}>Add</button>
        <ul>
          {
            todos.map(todo => (
              <li key={todo.id} className={`${styles['todo-item']}`}>
                <span htmlFor={todo.id}>
                  <input id={todo.id} type="checkbox" checked={todo.isDone} onChange={() => handleMarkDone(todo.id, !todo.isDone)}/>
                </span>
                {todo.name}
                <button onClick={() => handleDeleteTodo(todo.id)}>&times;</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todos;