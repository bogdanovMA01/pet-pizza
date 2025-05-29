import styles from '../scss/libs/NotFound.module.scss'

export function NotFound() {
  return (
    <div className={styles.root}>
      <h1>Ты куда залез, дружище?</h1>
      <h1>(это страница 404)</h1>
    </div>
  )
}
