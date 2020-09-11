import React, {useState, useEffect} from 'react';
import './AddList.scss'

import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import List from '../List/List';
import Badge from '../Badge/Badge'

import closeSvg from '../../assets/img/close.svg'
const AddList = ({ colors, onAdd }) => {


const [isPopupVisible, setPopupVisible] = useState(false);
const [selectedColor, selectColor] = useState(3);
const [isLoading, setIsLoading] = useState(false);
const [inputValue, setInputValue] = useState('');


const notify = () => toast.error("Введите название списка!", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

useEffect(() => {
  if (Array.isArray(colors)) {
    selectColor(colors[0].id);
  }
}, [colors]);

const onClose = () => {
  setPopupVisible(false);
  setInputValue('');
  selectColor(colors[0].id);
};

const addList = () => {
  if (!inputValue) {
    alert('Введите название списка');
    return;
  }
  setIsLoading(true);
  axios
    .post('http://localhost:3001/lists', {
      name: inputValue,
      colorId: selectedColor
    })
    .then(({ data }) => {
      const color = colors.filter(c => c.id === selectedColor)[0].name;
      const listObj = { ...data, color: { name: color } };
      onAdd(listObj);
      onClose();
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  return (
    <div className="add-list">
      <List
        onClick={() => setPopupVisible(!isPopupVisible)}
        items={[
          {
            className: "list__add-icon",
            icon: (
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 1V11"
                  stroke="#ff2e63"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="#ff2e63"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      />
      {isPopupVisible && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            className="add-list__close-icon"
            src={closeSvg}
            alt="Close Icon"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => {
                  selectColor(color.id);
                }}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addList} className="button ">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
