import React, {createContext, useState} from 'react'
import axios from "axios";

export const CustomContext = createContext();

export const Context = (props) =>{

    const [shoes, setShoes] = useState([]);
    const [card, setCard] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [orders, setOrders] = useState([]);

    const getAllShoes = (title = '') => {
      axios(`https://basketshops.herokuapp.com/api/sneakers?title_like=${title}`)
          .then(({data}) => setShoes(data))
          .catch((err) => console.log('Произошла ошибка')) //если запрос не отработал
    };

    const getAllFavorites = () => {
        axios.get('https://basketshops.herokuapp.com/api/favorites')
            .then(({data}) => setFavorites(data))
            .catch((err) => console.log('Error'))
    };

    const postFavorites = (item) => {
        axios.post('https://basketshops.herokuapp.com/api/favorites', {...item})
            .then(() => getAllFavorites())
    }; //then- то,что нам вернет

    const deleteFavorites = (id) => {
        axios.delete(`https://basketshops.herokuapp.com/api/favorites/${id}`)
            .then(() => getAllFavorites())
    };

    const getAllOrders = () => {
        axios.get('https://basketshops.herokuapp.com/api/orders')
            .then(({data}) => setOrders(data))
            .catch((err) => console.log('Error'))
    };

    const postOrders = (item) => {
        axios.post('https://basketshops.herokuapp.com/api/orders', {...item})
            .then(() => getAllOrders())
    };



    const addShoesInCard = (id) => {
        let idx = shoes.findIndex((item) => item.id === id);
        setCard([...card,shoes[idx]])
    };

    const deleteShoesInCard = (id) => {
        setCard(card.filter((item) => {
            return item.id !== id
        }))
    };


const value = {
    shoes,
    setShoes,
    getAllShoes,
    card,
    setCard,
    addShoesInCard,
    deleteShoesInCard,
    favorites,
    setFavorites,
    getAllFavorites,
    postFavorites,
    deleteFavorites,
    getAllOrders,
    postOrders,
    orders,
    setOrders
};

return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
};

