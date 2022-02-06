import { useState } from 'react';
import classes from './ProductFilter.module.css';

const ProductFilter = ({ onCategoryChange }) => {
  const [activeId, setActiveId] = useState('all');

  const buttons = [
    {
      id: 'all',
      text: 'All',
    },
    {
      id: 'popular',
      text: 'Popular',
    },
    {
      id: 'starters',
      text: 'Starters',
    },
    {
      id: 'maki',
      text: 'Maki Sushi',
    },
    {
      id: 'nigiri',
      text: 'Nigiri Sushi',
    },
    {
      id: 'noodles',
      text: 'Noodles',
    },
    {
      id: 'drinks',
      text: 'Drinks',
    },
  ];

  const handleClick = (category) => {
    setActiveId(category);
    onCategoryChange(category);
  };

  return (
    <div className={classes['filter-group']}>
      {buttons.map((button) => {
        return (
          <button
            className={activeId === button.id ? `${classes.active}` : ''}
            key={button.id}
            onClick={() => handleClick(button.id)}
          >
            {button.text}
          </button>
        );
      })}
    </div>
  );
};

export default ProductFilter;
