import styles from "./main.module.css";
import logo from "../../assets/logo_uleam.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Main = () => {
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
  const navigate = useNavigate();
  const [selected, setSelected] = useState("all"); // all, technology, furniture, faculty, stationery
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser === null) {
      navigate("/");
    }
    const dataLocal = JSON.parse(localStorage.getItem("inventory"));
    if (dataLocal === null) {
      Toast.fire({
        icon: "error",
        title: "No hay inventario",
      });
      return;
    }
    if (selected === "all") {
      setInventory(dataLocal);
    }
    if (selected === "technology") {
      for (let i = 0; i < dataLocal.length; i++) {
        if (dataLocal[i].category === "technology") {
          setInventory(dataLocal[i]);
        }
      }
      const filter = dataLocal.filter((item) => item.category === "technology");
      setInventory(filter);
    }
    if (selected === "furniture") {
      const filter = dataLocal.filter((item) => item.category === "furniture");
      setInventory(filter);
    }

    if (selected === "stationery") {
      const filter = dataLocal.filter((item) => item.category === "stationery");
      setInventory(filter);
    }

    Toast.fire({
      icon: "success",
      title: `Inventario cargado`,
    }); // Remove this line
  }, [selected]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleFilterChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.top}>
          <button className={styles.button} onClick={handleLogOut}>
            Cerrar sesion
          </button>
        </div>
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
        <div className={styles.main_header}>
          <div>
            <h1>Inventario de la ULEAM</h1>
            <p>
              Bienvenido al sistema de gestión de inventario de la Universidad
            </p>
          </div>
          <div className={styles.filters}>
            <div>
              <h1 className={styles.title}>Fitrar</h1>
            </div>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Buscar"
                className={styles.input}
              />
              <select
                name="category"
                id="category"
                onChange={handleFilterChange}
                className={styles.select}
              >
                <option value="all">Todas las categorías</option>
                <option value="technology">Tecnología</option>
                <option value="furniture">Muebles</option>
                <option value="stationery">Papelería</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Nombre</th>
                <th className={styles.th}>Marca</th>
                <th className={styles.th}>Modelo</th>
                <th className={styles.th}>Cantidad</th>
                <th className={styles.th}>Categoría</th>
                <th className={styles.th}>Facultad</th>
                <th className={styles.th}>Descripción</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {inventory !== null ? (
                inventory.map((item, index) => (
                  <tr key={index} className={styles.tr}>
                    <td className={styles.td}>{item.name}</td>
                    <td className={styles.td}>{item.marca}</td>
                    <td className={styles.td}>{item.model}</td>
                    <td className={styles.td}>{item.quantity}</td>
                    <td className={styles.td}>{ 
                      item.category === "technology" ? "Tecnología" : 
                      item.category === "furniture" ? "Muebles" : 
                      item.category === "stationery" ? "Papelería" : "Sin categoría"
                    }</td>
                    <td className={styles.td}>{item.faculty}</td>
                    <td className={styles.td}>{item.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.td}>
                    <div className={styles.empty_card}>
                      <h3>No hay inventario</h3>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Main;
