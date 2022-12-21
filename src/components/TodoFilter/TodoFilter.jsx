import React from 'react';
import './TodoFilter.scss';

const TodoFilter = ({ value, onChange }) => (
  <div className="TodoFilter">
    <p className="TodoFilter__label">Content Filter</p>
    <input
      type="text"
      className="TodoFilter__input"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TodoFilter;