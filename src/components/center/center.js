import styles from './center.module.css'

const Center = ({children}) => {
    return (
        <>
            <div className={styles.wrapper}>{children}</div>
            <div className={styles.space}></div>
        </>
    )
}

export default Center;