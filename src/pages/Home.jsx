import { Sort, Categories, PizzaBlock } from '../components'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { sortCategoriesMap } from '../constants'
import {
  setCategory,
  setSort,
  setPage,
  setFultersByUrl,
} from '../redux/Slices/filterSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

export function Home() {
  const category = useSelector((state) => state.filterSlice.category)
  const sort = useSelector((state) => state.filterSlice.sortby)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.filterSlice.searchValue)
  const page = useSelector((state) => state.filterSlice.page)
  const [Pizzas, setPizzas] = useState([])
  const search = searchValue ? `search=${searchValue}&` : ''
  const [params] = useSearchParams()

  useEffect(() => {
    const raw = {
      sortby: sortCategoriesMap[sort]?.id,
      category,
      page,
    }

    const queryString = qs.stringify(raw)
    navigate(`?${queryString}`)
  }, [category, sort, search, page, navigate])

  useEffect(() => {
    const raw = params.toString()

    const parsed = qs.parse(raw)
    dispatch(setFultersByUrl(parsed))
  }, [params, dispatch])

  useEffect(() => {
    //TODO: Лучше создавать instance от axios
    //TODO: https://axios-http.com/docs/instance
    axios
      .get(`https://67baff30fbe0387ca138bfa5.mockapi.io/items`, {
        params: {
          page,
          search: searchValue,
          category: category === 0 ? null : category,
          sortby: sortCategoriesMap[sort]?.value,
          limit: 4,
        },
      })
      .then((res) => {
        setPizzas(res.data)
      })
  }, [category, sort, page, searchValue])

  const setCategoryId = (id) => {
    dispatch(setCategory(id))
    dispatch(setPage(1))
  }
  const setSortId = (id) => {
    dispatch(setSort(id))
  }

  return (
    <>
      <div className='content__top'>
        <Categories value={category} onClickCategory={setCategoryId} />
        <Sort value={sort} onClickSort={setSortId} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {Pizzas.map((obj) => (
          <PizzaBlock data={obj} key={obj.id} />
        ))}
      </div>

      {/* Попробуй написать сам пагинацию */}
      <ReactPaginate
        className={styles.Pagination}
        forcePage={page - 1}
        breakLabel='...'
        nextLabel='>'
        onPageChange={(event) => dispatch(setPage(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </>
  )
}

// фильтр через яваскрипт
//
// .filter((obj) => {
//   console.log(obj.title)
//   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//     return true
//   }
//   return false
// })
