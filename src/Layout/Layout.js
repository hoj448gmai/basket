import React, {useContext, useEffect, useState} from 'react';
import Header from "./Header/Header";
import {CustomContext} from "../Context";
import {Routes, Route} from 'react-router-dom'
import Home from "../Pages/Home/Home";
import Buy from "../Pages/Buy/Buy";
import Favorites from "../Pages/Favorites/Favorites";
import styles from './Layout.module.css'
import Card from "./Card/Card";
import Order from "../Pages/Order/Order"

const Layout = () => {

    const [isCard, setIsCard] = useState(false);
    const {getAllFavorites} = useContext(CustomContext);

    useEffect(() => {
        getAllFavorites()
    }, []);

    return (
        <div className={styles.layout}>
            <Header isCard={isCard} setIsCard={setIsCard}/>
             <Routes>
                 <Route path='/' element={<Home/>}/>
                 <Route path='/Buy' element={<Buy/>}/>
                 <Route path='/Favorites' element={<Favorites/>}/>
                 <Route path='/Order' element={<Order/>}/>
             </Routes>
            <Card isCard={isCard} setIsCard={setIsCard}/>
        </div>
    );
};

export default Layout;