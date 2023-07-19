import { useEffect, useState } from "react";
import { Todo } from "./components/Todo";
import {
  getAllToDo,
  addToDo,
  updateToDo,
  deleteToDo,
} from "./utilis/HandleApi";

function App() {
  const [todo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setUpdate(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do-List</h1>
        <div className="top">
          <input
            type="Text"
            placeholder="Add to do"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="Add"
            onClick={
              update
                ? () => updateToDo(toDoId, text, setText, setToDo, setUpdate)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {update ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {todo.map((item) => (
            <Todo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
