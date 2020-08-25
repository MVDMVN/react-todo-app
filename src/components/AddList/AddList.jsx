import React, {useState} from 'react';
import './AddList.scss'
import List from '../List/List';
import Badge from '../Badge/Badge'

import closeSvg from '../../assets/img/close.svg'

const AddList = ({colors}) => {

const [isPopupVisible, setPopupVisible] = useState(true);
const [selectedColor, selectColor] = useState(colors[0].id);

  return (
    <div className="add-list">
      <List
        onClick={() => setPopupVisible(!isPopupVisible)}
        items={[
          {
            className: 'list__add-icon',
            icon:
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11" stroke="#ff2e63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 6H11" stroke="#ff2e63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
            name: 'Добавить список',
          }
        ]}
      />
      {isPopupVisible && (
        <div className="add-list__popup">
          <img
            onClick={() => {setPopupVisible(false)}}
            className='add-list__close-icon'
            src={closeSvg}
            alt="Close Icon"/>
          <input className="field" type="text" placeholder="Название списка"/>
          <div className="add-list__popup-colors">
            {colors.map((color) =>
              <Badge
                onClick={() => {selectColor(color.id)}}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />) }
          </div>
          <button className="button ">Добавить</button>
        </div>
      )}
    </div>
  );
};

export default AddList;
