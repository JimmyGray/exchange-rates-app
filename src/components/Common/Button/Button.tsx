import React from 'react';
import './ButtonStyles.scss';

export interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button: React.SFC<ButtonProps> = (props: ButtonProps) => (
    <button
        onClick={ props.onClick }
        className={ `button__container ${props.disabled ? 'button__container--disabled' : ''}` }
        disabled={ props.disabled }>
        { props.label }
    </button>
);