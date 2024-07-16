import styles from "./register.module.css";
import logo from "../../assets/logo_uleam.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    names: "",
    cedula: "",
    phone: "",
    address: "",
    birthday: "",
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    console.log(formData);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (
      formData.names === "" ||
      formData.cedula === "" ||
      formData.phone === "" ||
      formData.address === "" ||
      formData.birthday === "" ||
      formData.role === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      Toast.fire({
        icon: "error",
        title: "Todos los campos son obligatorios",
      });
      return;
    }
    if (!emailRegex.test(formData.email)) {
      Toast.fire({
        icon: "error",
        title: "Correo electronico invalido",
      });
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      Toast.fire({
        icon: "error",
        title:
          "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero",
      });
      return;
    }
    const dataLocal = JSON.parse(localStorage.getItem("users"));
    if (dataLocal) {
      const user = dataLocal.find(
        (user) => user.email === formData.email
      );
      if (user) {
        Toast.fire({
          icon: "error",
          title: "El usuario ya existe",
        });
        return;
      } else {
        dataLocal.push({
          names: formData.names,
          cedula: formData.cedula,
          phone: formData.phone,
          address: formData.address,
          role: formData.role,
          birthday: formData.birthday,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("users", JSON.stringify(dataLocal));
        Toast.fire({
          icon: "success",
          title: "Usuario registrado",
        }).then(() => {
          navigate('/login');
        });
      }
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            names: formData.names,
            cedula: formData.cedula,
            phone: formData.phone,
            address: formData.address,
            role: formData.role,
            birthday: formData.birthday,
            email: formData.email,
            password: formData.password,
          },
        ])
      );
      Toast.fire({
        icon: "success",
        title: "Usuario registrado",
      }).then(() => {
        navigate('/login')
      });
    }

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
              <h2 className={styles.form_title}>Registro de Usuario</h2>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="names" className={styles.label}>
                Nomrbes completos
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="names"
                id="names"
                className={styles.input}
                placeholder="Nombres completos"
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="cedula">Numero de Cedula</label>
              <input
                onChange={handleChange}
                type="text"
                id="cedula"
                name="cedula"
                className={styles.input}
                placeholder="Numero de cedula"
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="phone">Telefono</label>
              <input
                onChange={handleChange}
                type="text"
                id="phone"
                name="phone"
                className={styles.input}
                placeholder="Telefono celular"
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="phone">Rol </label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} className={styles.select}>
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="address">Dirección</label>
              <input
                onChange={handleChange}
                type="text"
                name="address"
                id="address"
                className={styles.input}
                placeholder="Direccion de residencia"
              />
            </div>
            <div>
              <label htmlFor="birthday">Fecha de nacimiento</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className={styles.input}
                placeholder="Correo electronico"
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
                placeholder="Contrasena"
              />
            </div>
            <div className={styles.form_btn}>
              <button
                type="submit"
                className={styles.button}
                onClick={handleSubmit}
              >
                Registrarse
              </button>
            </div>
            <div>
              Si ya tienes cuenta:
              <Link to={"/login"} className={styles.link}>
                Iniciar Sesión
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
