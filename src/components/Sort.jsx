/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { SortIcon } from './SortIcon'
import { sortCategoriesArray, sortCategoriesMap } from '../constants'

export function Sort({ value, onClickSort }) {
  const [isVisible, setIsVisible] = useState(false)
  const sortRef = useRef()

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false)
      }
    }

    document.body.addEventListener('click', handleClick)

    return () => document.body.removeEventListener('click', handleClick)
  }, [])

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label' onClick={() => setIsVisible(!isVisible)}>
        <div style={!isVisible ? { transform: 'rotate(180deg)' } : undefined}>
          <SortIcon />
        </div>
        <b>Сортировка по:</b>
        <span>{sortCategoriesMap[value]?.label}</span>
      </div>
      {/* Можно поставить && и избавиться от бесполезного fragment'а (работает только с boolean типом)  */}
      {isVisible ? (
        <div className='sort__popup'>
          <ul>
            {sortCategoriesArray.map((category) => (
              <li
                onClick={() => {
                  //TODO: Лучше вынести в отдельную функцию
                  onClickSort(category.id)
                  setIsVisible(!isVisible)
                }}
                key={`category-${category.id}`}
                className={value === category.id ? 'active' : ''}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
