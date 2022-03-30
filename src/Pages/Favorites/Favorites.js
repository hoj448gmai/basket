import React, {useContext} from 'react';
import styles from './Favorites.module.css'
import {CustomContext} from "../../Context";
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {BsFillHeartFill} from "react-icons/bs";
import cryEmoji from "../../assets/cryEmoji.png";

const Favorites = () => {

    const {favorites, card, deleteShoesInCard, addShoesInCard, deleteFavorites} = useContext(CustomContext);
    const navigate = useNavigate();

    return (
        <section>
            {
                favorites.length
                ? <>
                        <div className={styles.back}>
                            <Link to='/' style={{color:'#C8C8C8'}}>
                                <div className={styles.arrow}><AiOutlineArrowLeft/></div>
                            </Link>
                            <h2 className={styles.title}>Мои избранные</h2>
                        </div>
                        <div className={styles.row}>
                            {
                                favorites.map(item => (
                                    <div className={styles.card} key={item.id}>
                                        <button className={styles.cardLike} type='button' style={{background: '#FEF0F0', color: '#FF8585', border:'none'}} onClick={() => deleteFavorites(item.id)}><BsFillHeartFill/></button>
                                        <img className={styles.cardImg} src={item.imageUrl} alt={item.title}/>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        <div className={styles.cardFooter}>
                                            <div className={styles.cardPrice}>
                                                <h4 className={styles.cardPriceTitle}>Цена :</h4>
                                                <p className={styles.cardPriceNum}>{item.price.toString().slice(0,-3)}, {item.price.toString().substr(-3)} руб.</p>
                                            </div>


                                            {
                                                card.filter((el) => el.id === item.id).length
                                                    ? <button type='button' style={{background: 'linear-gradient(180deg, #89F09C 0%, #3CC755 100%)', color: 'white', border: 'none'}} className={styles.cardBtn} onClick={() => deleteShoesInCard(item.id)}>✔</button>
                                                    : <button type='button' className={styles.cardBtn} onClick={() => addShoesInCard(item.id)}>+</button>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    :  <div className={styles.empty}>
                        <h2 onClick={styles.cardTitle}>Корзина</h2>
                        <div className={styles.emptyRow}>
                            <img src={cryEmoji} alt="cry Emoji"/>
                            <h3 className={styles.emptyTitle}>Закладок нет :(</h3>
                            <p className={styles.emptySubtitle}>Вы ничего не добавляли в закладки</p>
                            <button className={styles.emptyBtn} type='submit' onClick={() => navigate('/')}>     Вернуться назад</button>
                        </div>

                    </div>
            }
        </section>
    );
};

export default Favorites;