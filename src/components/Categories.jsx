//TODO: Не стоит мешать константы и верстку, нужно вынести в отдельный файл
const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Пусть будет',
]

//TODO: Убрать передачу функции через пропсы, надо вызывать Redux здесь
export function Categories({ value, onClickCategory }) {
  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li
            className={index === value ? 'active' : ''}
            onClick={() => onClickCategory(index)}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}
