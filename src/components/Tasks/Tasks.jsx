import React from "react";
import axios from "axios";

import AddTaskForm from "./AddTaskForm";
import "./Tasks.scss";

import editIcon from "../../assets/img/edit-icon.svg";

const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .then(() => {
          onEditTitle(list.id, newTitle);
        })
        .catch(() => {
          alert("Не удалось обновить заголовок");
        });
    }
  };

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img
          className="tasks-title__edit"
          onClick={editTitle}
          src={editIcon}
          alt="Edit Icon"
        />
      </h2>
      <div className="tasks__list">
        {!list.tasks.length && (
          <h2 className="tasks__empty-title">Задач нет</h2>
        )}
        {list.tasks.map((task) => (
          <div className="tasks__item" key={task.id}>
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox" />
              <label htmlFor={`task-${task.id}`}>
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
            <input readOnly value={task.text} />
          </div>
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
