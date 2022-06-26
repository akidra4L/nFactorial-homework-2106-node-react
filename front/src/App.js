import './App.css';
import { useEffect, useState } from "react";
import axios from "axios"

const url = "http://localhost:3000/todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setTodos(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div>
        {todos.map((task) => (
          <div>
            {task.todo}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
