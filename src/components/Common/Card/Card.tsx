import React from 'react';
import './CardStyles.scss';

export interface CardProps {
    children: JSX.Element;
    title?: string;
    className?: string;
}

export const Card = (props: CardProps) => (
    <div className={ `card__container ${props.className}` }>
        { props.title && <div className={ 'card__title' }>{ props.title }</div> }
        { props.children }
    </div>
);