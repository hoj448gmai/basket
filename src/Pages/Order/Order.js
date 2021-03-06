import React, {useContext} from 'react';
import {CustomContext} from "../../Context";
import styles from './Order.module.css'
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form";

const Order = () => {

    const {card, deleteShoesInCard, postOrders, setCard} = useContext(CustomContext);

    const {
        register, //для принятия функций react-hook-form и для того,чтобы зарегестрировать в этой форме
        formState : { // для обработки ошибок
            errors
        },
        handleSubmit, // функция, запускаемая при onSubmit
        reset // обновить, очистить форму после отправки запросов
    } = useForm({
        mode: "onBlur"
    });

    const navigate = useNavigate();

    const createOrders = (data) => {
        const toDate = (date) => {
            return new Intl.DateTimeFormat('ru-Ru', {
                day:'2-digit',
                month:'2-digit',
                year:'numeric'
            }).format(new Date(date))
        };
        postOrders({
            ...data,
            info: data.info ? data.info : 'no info',
            order: card,
            price: card.reduce((acc, rec) => acc + rec.price , 0),
            nds: Math.ceil(card.reduce((acc, rec) => acc + rec.price, 0) / 100 * 5),
            change: data.money - card.reduce((acc, rec) => acc + rec.price , 0),
            date: toDate(new Date())
        });

        setCard([]);
        navigate('/Buy');
        reset()
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Мои заказы</h2>

            <div className={styles.row}>
                <form action="" className={styles.form} onSubmit={handleSubmit(createOrders)}>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="name">Имя *</label>
                        <input {...register('name', {
                            required : 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 2,
                                message: 'Минимум 2 символов'
                            }
                        })} className={styles.formInput} type="text"/>
                    </div>
                    <span className={styles.error}>
                        {errors ?.name && errors?.name?.message}
                    </span>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="tel">Телефон *</label>
                        <input {...register( 'tel', {
                            required: 'Поле обязательно к заполнению',
                            pattern: {
                                value: '/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/',
                                message: "Invalid phone no",
                            }
                        })} className={styles.formInput} type="tel"/>
                    </div>
                    <span className={styles.error}>
                        {errors?.tel && errors?.tel?.message}
                    </span>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="city">Город *</label>
                        <input {...register('city', {
                            required : 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 2,
                                message: 'Минимум 2 символов'
                            }
                        })}className={styles.formInput} type="text" />
                    </div>
                    <span className={styles.error}>
                        {errors?.city && errors?.city?.message}
                    </span>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="street">Улица *</label>
                        <input {...register('street', {
                            required : 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 2,
                                message: 'Минимум 2 символов'
                            }
                        })}className={styles.formInput} type="text"/>
                    </div>
                    <span className={styles.error}>
                        {errors?.street && errors?.street?.message}
                    </span>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="info">Дополнительная информация *</label>
                        <textarea {...register('info')} className={styles.formTextArea}/>
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="pay">Способ оплаты *</label>
                        <select {...register('pay')} className={styles.formSelect}>
                            <option value="Наличными">Наличными</option>
                            <option value="Demir bank">Demir bank</option>
                            <option value="Optima bank">Optima bank</option>
                        </select>
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="money">Вносимая сумма *</label>
                        <input {...register('money', {
                            required : 'Это поле обязательно для заполнения',
                            min: {
                                value: card.reduce((acc, rec) => acc + rec.price , 0),
                                message: `Ваша сумма не должна быть меньше ${card.reduce((acc, rec) => acc + rec.price , 0)}`
                            }
                        })} className={styles.formInput} type="number"/>
                    </div>
                    <span className={styles.error}>
                        {errors?.money && errors?.money?.message}
                    </span>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="checkbox">Условия *</label>
                        <div className={styles.checkboxBlock}>
                            <input {...register('checkbox', {
                                required : 'Это поле обязательно для заполнения'
                            })} required className={styles.checkbox} type="checkbox"/>
                            <span className={styles.checkboxText}>С условиями доставки согласен *</span>
                        </div>
                    </div>
                    <span className={styles.error}>
                        {errors?.checkbox && errors?.checkbox?.message}
                    </span>
                    <button type='submit' className={styles.formBtn}>Заказать</button>
                </form>

                <div className={styles.right}>
                    <ul className={styles.list}>
                        {card.map((el) => (
                            <li key={el.id} className={styles.item}>
                                <img className={styles.itemImg} src={el.imageUrl} alt=""/>
                                <div className={styles.itemCenter}>
                                    <h4 className={styles.itemTitle}>{el.title}</h4>
                                    <p  className={styles.itemPrice}>{el.price} руб.</p>
                                </div>
                                <button className={styles.itemBtn} onClick={() => deleteShoesInCard(el.id)}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#D3D3D3"/>
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.cardFooterItem}>
                        <p className={styles.cardFooterTitle}>Итого:</p>
                        <div className={styles.cardFooterLine}/>
                        <p className={styles.itemPrice}>{card.reduce((acc, rec) => acc + rec.price , 0)} руб. </p>
                    </div>

                    <div className={styles.cardFooterItem}>
                        <p className={styles.cardFooterTitle}>Налог 5%: </p>
                        <div className={styles.cardFooterLine}/>
                        <p className={styles.itemPrice}>{Math.ceil(card.reduce((acc, rec) => acc + rec.price, 0) / 100 * 5)} руб.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Order;