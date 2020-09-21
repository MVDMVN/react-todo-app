import React from "react";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import "./AllTasksList.scss";
import "../List/List.scss";
import { Link } from "react-router-dom";

function AllTasksList({ items, isRemovable, onClick }) {
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <Link to="/">
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
        </Link>
      ))}
    </ul>
  );
}

export default AllTasksList;
