import styles from './home.module.css'
import logo from '../../assets/logo_uleam.png'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.top}></div>
        <div className={styles.bottom}>
          <div className={styles.img_container}>
            <img src={logo} alt="" className={styles.img} />
          </div>
          <div className={styles.text}>
            <h1 className={styles.title}>Sistema de Gestión de Inventario</h1>
            <p className={styles.subtitle}>Universidad Laica Eloy Alfaro de Manabí</p>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Sistema de Gestion de Inventario</h2>
          <button onClick={handleLogin} className={styles.btn}>Ingresar al sistema</button>
        </div>
      </main>
    </div>
  )
}

export default Home