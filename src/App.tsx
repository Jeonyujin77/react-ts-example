import React, { useState, useCallback, useEffect } from "react";

interface Todo {
  id: number;
  todo: string;
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/todos", {
      method: "GET",
    });
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = useCallback(
    (todo: Todo) => {
      fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          fetchData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    [todo]
  );

  const removeTodo = useCallback((todoId: number) => {
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // input change event
  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodo(e.target.value);
    },
    [todo]
  );

  // submit event
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const todoObj = {
        id: Date.now(),
        todo,
      };

      addTodo(todoObj);
      setTodo("");
    },
    [todo, addTodo]
  );

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={todo} onChange={onChangeText} />
      <button type="submit">Add</button>
      <hr />
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.todo}
              <span
                onClick={() => removeTodo(todo.id)}
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              >
                Del
              </span>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default App;
