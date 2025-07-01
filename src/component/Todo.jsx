import React, { useState } from 'react';
import close from '../assets/img/close.png';
import edit from '../assets/img/edit.png';
import './Todo.css';

function Todo() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [btn, setBtn] = useState("Add");
  const [editIndex, setEditIndex] = useState(null);

  const handleList = () => {
    if (item.trim() === "") return;

    if (btn === "Edit" && editIndex !== null) {
      const updatedList = list.map((task, index) =>
        index === editIndex ? { ...task, text: item } : task
      );
      setList(updatedList);
      setBtn("Add");
      setEditIndex(null);
    } else {
      setList(prevList => [...prevList, { text: item, completed: false }]);
    }

    setItem("");
  };

  const handleDelete = (delIndex) => {
    const updatedList = list.filter((_, index) => index !== delIndex);
    setList(updatedList);
  };

  const handleEdit = (task, index) => {
    setItem(task.text);
    setBtn("Edit");
    setEditIndex(index);
  };

  const toggleCompleted = (index) => {
    const updatedList = list.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setList(updatedList);
  };

  return (
    <div className="todo">
      <h1>Item List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Item Here"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="todo-btn" onClick={handleList}>
          {btn}
        </button>
      </div>

      <ul className="todo-list">
        {list.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "completed" : ""}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(index)}
            />
            {task.text}
            <img src={close} alt="close" onClick={() => handleDelete(index)} />
            <img src={edit} alt="edit" onClick={() => handleEdit(task, index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
