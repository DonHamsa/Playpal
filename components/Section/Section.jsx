import styles from './Section.module.css'

export default function Section() {
    return (
        <>
            <article className={styles.form}>
                <form >
                    <fieldset className={styles.fieldset}>

                        <legend className={styles.logIn}>Log in or Sign Up</legend>
                        <p className={styles.para}>See people nearby playing football, connect with others who want to join in, and make new friends while bringing the joy of playing outside back to life</p>
                        <label className={styles.label}>Username or Sign Up<input type='email' className={styles.input}/></label>
                            
                        <label className={styles.label}>Password<input type='password' className={styles.input}/></label>

                        <button type='submit' className={styles.button}>Log In</button>

                       
                    </fieldset>
                 




                </form>
                
            </article>
        </>


    )
}