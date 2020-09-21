import React, { useState } from "react";

import addIcon from "../../assets/img/add-icon.svg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddTaskForm({ list, onAddTask }) {
  const [isAddTaskVisible, setAddTaskVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDataSending, setIsDataSending] = useState(false);

  const toggleFormVisible = () => {
    setAddTaskVisible(!isAddTaskVisible);
    setInputValue("");
  };

  const addTask = () => {
    const newTaskItem = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsDataSending(true);
    axios
      .post("http://localhost:3001/tasks", newTaskItem)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, data);
        toggleFormVisible();
        taskAddSuccess();
      })
      .catch((e) => {
        taskAddError();
      })
      .finally(() => {
        setIsDataSending(false);
      });
  };

  const taskAddSuccess = () =>
    toast.success("Задача добавлена", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const taskAddError = () =>
    toast.error("Ошибка добавления задачи", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="tasks__form">
      {!isAddTaskVisible ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addIcon} alt="Add Icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            className="field"
            type="text"
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button disabled={isDataSending} onClick={addTask} className="button">
            {isDataSending ? "Загрузка" : "Добавить задачу"}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
