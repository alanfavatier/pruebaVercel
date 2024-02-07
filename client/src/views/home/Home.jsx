import React from "react";
import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setPage } from "../../redux/actions";
import Filter from "../../components/Filter/Filter";
import Banner from "../../components/Banner/Banner";


const Home = () => {
  const dispatch = useDispatch(); //con esto envio una accion a mi store
  const allUsers = useSelector((state) => state.allUsers); //con este useSelector voy a indicarle a mi componente a que estado quiero estar subscripto. De esta manera le estoy diciendo a mi componente que este pendiente a cualquier cambio que suceda en el estado allUsers , este estado se encuentra en mi reducer.
  const currentPage = useSelector((state) => state.currentPage);
  const productsPerPage= 6;
  const totalProducts = allUsers.length


//  PARA EL PAGINADO UTILICE LA FORMULA DEL PAGINADO 
const indexOfLastDog = currentPage * productsPerPage; //ultimo perro (1 * 8)
const indexOfFirstDog = indexOfLastDog - productsPerPage;//primer perro (8-8)
const currentProducts = allUsers.slice(indexOfFirstDog, indexOfLastDog); // el método slice se utiliza para seleccionar una porción del array allDogs, se le pasan dos parametros
//indexOfFirstDog: 0
//indexOfLastDog: 8

const totalPages = Math.ceil(totalProducts / productsPerPage); // totalPages: Calcula el número total de páginas dividiendo la cantidad total de perros por la cantidad de perros por página y redondeando hacia arriba. (264 perros / 8perros por pagina)= 33paginas



const handlePageChange = (pageNumber)=>{
  dispatch(setPage(pageNumber))
}


  useEffect(() => {
    // en este punto cuando mi componente se monta va a enviar la accion getUsers a mi reducer , el reducer va a verificar que tipo / caso de accion es y modifica el payload con el resultado y se lo devuelve a todos los componentes que estan subscriptos.
    dispatch(getUsers());
    /*  return (()=>{
      clearDetail()// esto permite limpiar el estado cuando se desmonta
    }) */
  }, [dispatch]); //como segundo parametro mi useEffect toma un array de dependencia que se encarga de decidir en que momento quiero que se ejecute la accion. en este caso se ejecuta solamente cuando se hace un dispatch.

  return (
    <div className={styles.home}>
      <h2 className={styles.title}> Game Over</h2>
      <Banner/>
      <Filter/>
      <Cards allUsers={allUsers} currentProducts={currentProducts} />
      {/* envio a mis usuarios por props a mis tarjetas */}
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> {/* Botón "Anterior": Desencadena la función handlePageChange para ir a la página anterior. Está deshabilitado si ya estás en la primera página (currentPage === 1). */}
          Anterior
        </button>
        <span>{currentPage}</span> de  <span>{totalPages}</span> {/* Span con el número de página actual: Muestra el número de la página actual. */}

        {currentPage < totalPages ?
          <button onClick={() => handlePageChange(currentPage + 1)}>

            Siguiente
          </button>
          : null}

        {/* <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage < totalPages}>
          
        </button> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

/*ESTO ES PARA EL FILTRO SOBRE EL ESTADO */
/*   //ESTAS FUNCIONALIDADES SON PARA MI BARRA DE BUSQUEDA. ESTAS LAS DEFINO ACA PARA QUE SEAN GENERICAS Y PUEDA MANDARLAS POR PROPS A CUALQUIER COMPONENTE 
  const [filtered, setFiltered] = useState(allUsers); //creo un estado local que toma a mi estado global allUsers este estado va a ser igual a todos mis usuarios para que al principio cuando monto mi componente quiero que filtered sea todos mis usuarios.
  const [searchString, setSearchString] = useState("");//creo un estado local que corresponde al string que voy a escribir dentro de mi input cuando busco.

  function handleChange(e) { //creo una fucion que me va setear lo que escriba en el input
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e){ //cuando le de click al boton buscar hace un filtrado de todos los usuarios con el nombre que le indico al searchString.
    e.preventDefault()

    const filtered= allUsers.filter(user=> user.name.includes(searchString))
    setFiltered(filtered)// modifica el estado filtered con los usuarios que coincidan con el nombre.
  }
 */
