import React from 'react';
import './styles.css';

export default ({ black }) => {
    return (
        <header className={black ? "black" : "" }>
            <div className="header--logo">
                <a href="/">
                    <img src="https://www.caviarcriativo.com/wp-content/uploads/2020/06/Significados-da-Marca-Netflix-1000x480.gif" alt="logo"/>
                </a>

            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Usuário"/>
                </a>

            </div>
        </header>
    );
}
