import React from "react";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import "./AllTasksList.scss";
import "../List/List.scss";

function AllTasksList({ items, isRemovable, onClick }) {
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(
            "list__item",
            "list__item-all",
            item.className,
            { active: item.isActive }
          )}>
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default AllTasksList;
