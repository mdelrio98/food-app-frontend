import { FC, ReactNode } from 'react';

import classes from './Card.module.css';

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
