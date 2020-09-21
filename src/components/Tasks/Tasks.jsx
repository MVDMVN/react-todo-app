import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import "./Tasks.scss";

import editIcon from "../../assets/img/edit-icon.svg";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  withoutEmpty,
}) => {
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
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img
            className="tasks-title__edit"
            onClick={editTitle}
            src={editIcon}
            alt="Edit Icon"
          />
        </h2>
      </Link>
      <div className="tasks__list">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
