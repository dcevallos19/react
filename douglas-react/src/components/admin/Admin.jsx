import styles from "./admin.module.css";
import logo from "../../assets/logo_uleam.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Admin = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    marca: "",
    model: "",
    quantity: "",
    category: "",
    faculty: "",
    description: "",
  });

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
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
  }); // Remove this line

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }
    const dataLocal = JSON.parse(localStorage.getItem("inventory"));
    if (!dataLocal) {
      Toast.fire({
        icon: "error",
        title: "No hay inventario",
      });
      return;
    } else {
      setInventory(dataLocal);
    }

    Toast.fire({
      icon: "success",
      title: "Panel de administración cargado",
    });
  }, [navigate]);

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataLocal = JSON.parse(localStorage.getItem("inventory"));
    if (dataLocal) {
      const newData = [
        ...dataLocal,
        {
          id: dataLocal.length + 1,
          name: newProduct.name,
          marca: newProduct.marca,
          model:  newProduct.model,
          quantity: newProduct.quantity,
          category: newProduct.category,
          faculty: newProduct.faculty,
          description: newProduct.description
        },
      ];
      console.log(newData);
      localStorage.setItem("inventory", JSON.stringify(newData));
      setInventory(newData);
    } else {
      localStorage.setItem(
        "inventory",
        JSON.stringify([
          {
            id: 1,
            name: newProduct.name,
            marca: newProduct.marca,
            model:  newProduct.model,
            quantity: newProduct.quantity,
            category: newProduct.category,
            faculty: newProduct.faculty,
            description: newProduct.description
          },
        ])
      );
      setInventory([
        {
          id: 1,
          name: newProduct.name,
          marca: newProduct.marca,
          model:  newProduct.model,
          quantity: newProduct.quantity,
          category: newProduct.category,
          faculty: newProduct.faculty,
          description: newProduct.description
        },
      ]);
    }
    Toast.fire({
      icon: "success",
      title: "Producto agregado",
    });
    e.target.reset();
  }
  const editarProducto = (id) => {
    const dataLocal = JSON.parse(localStorage.getItem("inventory"));
    const item = dataLocal.find((item) => item.id === id);
    Swal.fire({
      title: "Editar Producto",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre" value="${item.name}">
        <input type="text" id="marca" class="swal2-input" placeholder="Marca" value="${item.marca}">
        <input type="text" id="model" class="swal2-input" placeholder="Modelo" value="${item.model}">
        <input type="number" id="quantity" class="swal2-input" placeholder="Cantidad" value="${item.quantity}">
        <input type="text" id="category" class="swal2-input" placeholder="Categoría" value="${item.category}">
        <input type="text" id="faculty" class="swal2-input" placeholder="Facultad" value="${item.faculty}">
        <input type="text" id="description" class="swal2-input" placeholder="Descripción" value="${item.description}">
      `,
      showCancelButton: true,
      confirmButtonText: "Editar",
      preConfirm: () => {
        return {
          name: document.getElementById("name").value,
          marca: document.getElementById("marca").value,
          model: document.getElementById("model").value,
          quantity: document.getElementById("quantity").value,
          category: document.getElementById("category").value,
          faculty: document.getElementById("faculty").value,
          description: document.getElementById("description").value,
        };
      },
    }).then((result) => {
      console.log(result);
      const newData = dataLocal.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            name: result.value.name,
            marca: result.value.marca,
            model: result.value.model,
            quantity: result.value.quantity,
            category: result.value.category,
            faculty: result.value.faculty,
            description: result.value.description,
          };
        }
        return item;
      });
      localStorage.setItem("inventory", JSON.stringify(newData));
      setInventory(newData);
      Toast.fire({
        icon: "success",
        title: "Producto editado",
      });
    });
  };

  const eliminarProducto = (id) => {
    const dataLocal = JSON.parse(localStorage.getItem("inventory"));
    const newData = dataLocal.filter((item) => item.id !== id);
    localStorage.setItem("inventory", JSON.stringify(newData));
    setInventory(newData);
    Toast.fire({
      icon: "success",
      title: "Producto eliminado"
    });
  };
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.top}>
          <button className={styles.button} onClick={handleLogOut}>
            Cerrar sesion
          </button>
          <h1 className={styles.title}>
            Modo Administrador
          </h1>
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
      <main>
        <div className={styles.forms}>
          <div className={styles.from_container}>
            <h2 className={styles.title_gray}>Agregar Producto</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  name="name"
                  onChange={handleChange}
                  className={styles.input}
                  type="text"
                  placeholder="Nombre"
                />
                <input
                  name="marca"
                  onChange={handleChange}
                  className={styles.input}
                  type="text"
                  placeholder="Marca"
                />
                <input
                  name="model"
                  onChange={handleChange}
                  className={styles.input}
                  type="text"
                  placeholder="Modelo"
                />
                <input
                  name="quantity"
                  onChange={handleChange}
                  className={styles.input}
                  type="number"
                  placeholder="Cantidad"
                />
                <label htmlFor="category">Categoría</label>
                <select className={styles.select} name="category" id="category" onChange={handleChange}>
                  <option value="technology">Tecnología</option>
                  <option value="furniture">Muebles</option>
                  <option value="stationery">Papelería</option>
                </select>
                <input 
                  name="faculty"
                  onChange={handleChange}
                  className={styles.input}
                  type="text"
                  placeholder="Facultad"
                />
                <input
                  name="description"
                  onChange={handleChange}
                  className={styles.input}
                  type="text"
                  placeholder="Descripción"
                />
              <button
                type="submit"
                className={styles.button}>Agregar</button>
            </form>
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
                <th className={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {inventory !== null ? (
                inventory.map((item, index) => (
                  <tr className={styles.tr} key={index}>
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
                    <td className={styles.td_btns}>
                      <button
                        onClick={() => editarProducto(item.id)}
                        className={styles.button_gray}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarProducto(item.id)}
                        className={styles.button}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className={styles.td}>
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

export default Admin;
