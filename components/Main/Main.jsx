import Section from '../Section/Section'
import styles from './Main.module.css'
import SectionMap from '../SectionMap/SectionMap'

export default function Main(){
    return (
        <div className={styles.mainBlock}>
            <Section/>
            <SectionMap/>
        </div>
    )
}