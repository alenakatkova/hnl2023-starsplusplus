import { useState, useEffect, createContext } from "react";

const TodosContext = createContext({
  todos: [],
  fetchTodos: () => {},
});
export default function Todos() {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    fetch("http://localhost:8000/todo")
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos.data);
      })
      .catch((error) => {
        setTodos([
          {
            id: "fake1",
            item: "fakeRead a book.",
          },
          {
            id: "fake2",
            item: "fakeCycle around town.",
          },
        ]);
      });
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider value={{ todos, fetchTodos }}>
      <ul>
        {todos && todos.map((todo) => <li key={todo.id}>{todo.item}</li>)}
      </ul>
    </TodosContext.Provider>
  );
}
