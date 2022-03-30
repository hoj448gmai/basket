import React, {createContext, useState} from 'react'
import axios from "axios";

export const CustomContext = createContext();

export const Context = (props) =>{

    const [shoes, setShoes] = useState([]);
    const [card, setCard] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [orders, setOrders] = useState([]);

    const getAllShoes = (title = '') => {
      axios(`http://localhost:8080/sneakers?title_like=${title}`)
          .then(({data}) => setShoes(data))
          .catch((err) => console.log('Произошла ошибка')) //если запрос не отработал
    };

    const getAllFavorites = () => {
        axios.get('http://localhost:8080/favorites')
            .then(({data}) => setFavorites(data))
            .catch((err) => console.log('Error'))
    };

    const postFavorites = (item) => {
        axios.post('http://localhost:8080/favorites', {...item})
            .then(() => getAllFavorites())
    }; //then- то,что нам вернет

    const deleteFavorites = (id) => {
        axios.delete(`http://localhost:8080/favorites/${id}`)
            .then(() => getAllFavorites())
    };

    const getAllOrders = () => {
        axios.get('http://localhost:8080/orders')
            .then(({data}) => setOrders(data))
            .catch((err) => console.log('Error'))
    };

    const postOrders = (item) => {
        axios.post('http://localhost:8080/orders', {...item})
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

