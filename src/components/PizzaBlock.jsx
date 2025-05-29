/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPizza } from '../redux/Slices/cartSlice'

export function PizzaBlock({ data }) {
  const dispatch = useDispatch()
  //TODO: Попробуй убрать лишние переменные
  const PizzaId = data.id
  const imageUrl = data.imageUrl
  const title = data.title
  const price = data.price
  const sizes = data.sizes
  const sliceObjects = useSelector((state) => {
    return state.cartSlice.items.filter((obj) => obj.PizzaId === PizzaId)
  })

  const cardCount = sliceObjects.reduce((qnt, obj) => {
    return qnt + obj.count
  }, 0)

  const onClickSize = (id) => {
    setPizzaConfig((prev) => ({ ...prev, size: id }))
  }

  const onClicDoghType = (id) => {
    setPizzaConfig((prev) => ({ ...prev, doghType: id }))
  }

  //TODO: Вынести в отдельный файл со всеми константами
  const typeNames = ['традиционное', 'тонкое']

  //TODO: Хуки стоит объявлять в самом верху, после хуков константы, функции и верстка
  const [pizzaConfig, setPizzaConfig] = useState({
    count: 0,
    size: 0,
    doghType: data.types[0],
  })

  const onClickAdd = () => {
    //TODO: crypto.randomUUID делает ключ, но это надо вынести в редакс
    const key = Math.random().toString(36).substring(2, 10)
    const item = {
      PizzaId,
      title,
      price,
      imageUrl,
      type: typeNames[pizzaConfig.doghType],
      size: sizes[pizzaConfig.size],
      count: 1,
      key,
    }
    dispatch(addPizza(item))
  }

  //Слишком много верстки, лучше деструктуризацию сделать
  return (
    <div className='pizza-block'>
      <img className='pizza-block__image' src={imageUrl} alt={title} />
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {data.types.map((index) => (
            <li
              onClick={() => {
                onClicDoghType(index)
              }}
              className={pizzaConfig.doghType === index ? 'active' : ''}
              key={index}
            >
              {typeNames[index]}
            </li>
          ))}
        </ul>
        <ul>
          {data.sizes.map((category, index) => (
            <li
              key={category}
              className={index === pizzaConfig.size ? 'active' : ''}
              onClick={() => {
                onClickSize(index)
              }}
            >
              {category} см.
            </li>
          ))}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className='button button--outline button--add'
        >
          {/* TODO:  Убрать все иконки в отдельные компоненты */}
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          <i>{cardCount}</i>
        </button>
      </div>
    </div>
  )
}
