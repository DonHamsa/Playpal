import styles from './LineDivider.module.css'

export default function LineDivider({text}){
  return(
    <h2 className={styles.h2}><span className={styles.span}>{text}</span></h2>
  )
}