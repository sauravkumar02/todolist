import React, { useEffect, useState } from "react";
import "./PublicCard.css";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  background_color?: string;
  pinned: boolean;
  public: boolean;
}
const PublicCard = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const id = urlParts[urlParts.length - 1];
  console.log("ff", id);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`http://127.0.0.1:8000/api/v1/echo/${id}`, {
      method: "GET",
      headers: headersList,
      mode: "cors",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);
    if (response.ok) {
      setTodos(data);
    }
  };

  return (
    <div className="shared-app">
      <h1> TodoList</h1>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicCard;
