import styles from "./login.module.css";
import logo from "../../assets/logo_uleam.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      Toast.fire({
        icon: "error",
        title: "Todos los campos son obligatorios",
      });
      return;
    }
    const dataLocal = JSON.parse(localStorage.getItem("users"));
    if (dataLocal) {
      const user = dataLocal.find(
        (user) =>
          user.email === formData.username &&
          user.password === formData.password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        const role = user.role;
        console.log(user.role);
        Toast.fire({
          icon: "success",
          title: "Inicio de sesión exitoso, cargando...",
        }).then(() => {
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/main");
          }
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Usuario o contraseña incorrectos",
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "No hay usuarios registrados",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            <p className={styles.subtitle}>
              Universidad Laica Eloy Alfaro de Manabí
            </p>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.form_container}>
          <form action="" className={styles.form}>
            <div className={styles.form_title}>
              <h2 className={styles.form_title}>Iniciar Sesión</h2>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="username" className={styles.label}>
                Usuario
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="username"
                name="username"
                className={styles.input}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="password" className={styles.label}>
                Contraseña
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                className={styles.input}
              />
            </div>
            <div className={styles.form_btn}>
              <button
                type="submit"
                className={styles.button}
                onClick={handleSubmit}
              >
                Ingresar
              </button>
            </div>
            <div>
              Si no tienes cuenta:
              <Link to="/register" className={styles.link}>
                Registrate
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
