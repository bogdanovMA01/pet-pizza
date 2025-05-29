/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import styles from './Search.module.scss'
import { useRef } from 'react'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/Slices/filterSlice.jsx'
import { useDispatch, useSelector } from 'react-redux'

//В index файлах делают публичное API для экспорта наружу, писать компоненты здесь не стоит. Лучше для этого завести отдельный файл
export function Search() {
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.filterSlice.searchValue)
  const [value, setValue] = useState('')

  const inputRef = useRef()

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 1000),
    []
  )

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const onClickCLear = () => {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current.focus()
  }

  return (
    <div>
      <input
        ref={inputRef}
        name='searchI'
        value={value}
        onChange={onChangeInput}
        className={styles.root}
        placeholder='Хачу питсу...'
      />

      {/* TODO: Убрать все иконки в отдельный файл  */}
      {searchValue && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='48'
          viewBox='0 0 48 48'
          width='48'
          className={styles.clearIcon}
          onClick={onClickCLear}
        >
          <path d='M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z' />
          <path d='M0 0h48v48H0z' fill='none' />
        </svg>
      )}
    </div>
  )
}
