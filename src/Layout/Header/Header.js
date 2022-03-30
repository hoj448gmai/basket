import React, {useContext} from 'react';
import {CustomContext} from "../../Context";
import styles from './Header.module.css'
import {MdOutlineLocalGroceryStore} from 'react-icons/md'
import {AiOutlineHeart} from "react-icons/ai";
import {AiOutlineShopping} from 'react-icons/ai'
import logo from '../../assets/LOGO.png'
import {Link} from 'react-router-dom'

const Header = ({setIsCard}) => {

    const {card, favorites} = useContext(CustomContext);

    const {header, headerNav, headerLeft, headerRight, headerLeftInfo, headerLeftSubtitle, headerList, headerItem, headerRightPrice, headerLink} = styles;

    return (
        <header className={header}>
            <div className='container'>
                <nav className={headerNav}>
                    <Link style={{color: '#000000'}} to="/">
                        <div className={headerLeft}>
                            <img src={logo} alt="logo"/>
                            <div className={headerLeftInfo}>
                                <h1>REACT SNEAKERS</h1>
                                <span className={headerLeftSubtitle}>Магазин лучших кроссовок</span>
                            </div>
                        </div>
                    </Link>

                    <div className={headerRight}>
                        <ul className={headerList}>
                            <li className={headerItem}>
                                <span style={{cursor: 'pointer'}} onClick={() => setIsCard(true)}>
                                    <MdOutlineLocalGroceryStore/>
                                </span>
                                <p className={headerRightPrice}>{card.reduce((acc, rec) => acc + rec.price, 0)} руб.</p>
                            </li>
                            <li className={headerItem}>
                                <Link style={{color: '#9B9B9B'}} to='/favorites'>
                                    <AiOutlineHeart/>
                                    <sup style={{fontSize: '12px'}}>{favorites.length > 9 ? '9+' : favorites.length ? favorites.length : ''}</sup>
                                </Link>
                            </li>
                            <li className={headerItem}>
                                <Link style={{color: '#9B9B9B'}} to='/Buy'>
                                    <AiOutlineShopping/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;