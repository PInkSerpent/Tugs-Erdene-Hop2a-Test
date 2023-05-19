import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { EditIcon, DeleteIcon } from "./icons/icons";

function App() {
  const [list, setList] = useState([
    { text: "example data", isDone: true, _id: "anyid" },
  ]);
  const [checkedCounter, setCheckedCounter] = useState(0);
  const [addTodo, setAddTodo] = useState("");

  const Edit = (_id, text) => {
    const inputValue = window.prompt("Edit", text);
    if (!inputValue) return;

    console.log(inputValue);
    // axios.patch()
  };

  const Delete = (_id) => {
    console.log(_id);
    // axios.delete();
  };

  const Add = () => {
    console.log(addTodo);
    axios.post('http://localhost:5000/add', { text: addTodo })
  .then(response => {
    const savedTodo = response.data;
    console.log(savedTodo); // Handle the savedTodo data as needed
  })
  .catch(error => {
    console.error('Failed to add todo:', error);
  });
  };

  const toggleDone = (_id, isDone) => {
    console.log(_id, isDone);
    //axios.patch()
  };

  useEffect(() => {
    // axios
    //   .get("localhost:5000/")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setList(data.data);
    //   });
  }, []);

  return (
    <div className="container">
      <div className="title">
        <div>My Todo list</div>
        <div className="count">
          {checkedCounter}/{list.length}
        </div>
      </div>
      <div className="list">
        {list.map(({ text, _id, isDone }, index) => (
          <div className="todo" key={index}>
            <div className="checkbox">
              <input
                type={"checkbox"}
                defaultChecked={isDone}
                onChange={() => toggleDone(_id, isDone)}
              />
              <div>{text}</div>
            </div>
            <div className="actions">
              <div onClick={() => Edit(_id, text)}>
                <EditIcon />
              </div>
              <div onClick={() => Delete(_id)}>
                <DeleteIcon />
              </div>
            </div>
          </div>
        ))}
        <input
          placeholder="what's next?"
          onChange={(e) => setAddTodo(e.target.value)}
        />
        <div className="button" onClick={() => Add(addTodo)}>
          Add task
        </div>
      </div>
    </div>
  );
}

export default App;
