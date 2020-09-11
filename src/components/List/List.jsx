import React from "react";
import "./List.scss";
import classNames from "classnames";
import axios from "axios";

import Badge from "../Badge/Badge";

import removeSvg from "../../assets/img/remove.svg";


const List = ({ items, isRemovable, onClick, onRemove }) => {

  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить этот список? " + item.name)) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames("list__item", item.className, {
            active: item.isActive,
          })}>
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              onClick={() => removeList(item)}
              alt="Remove icon"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
