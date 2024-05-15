import { createContext, useState, useEffect } from 'react';
// Lo mejor que existe para peticiones HTTP
import axios from 'axios';

// Con el context evitamos el "props drilling" ¿Que es? Cuando tenemos que pasar los datos que necesita cada componte por las propiedades, Componente padre => hijo => nieto => bisnietos. Con reactContext nos evitamos eso. y directamente llamamos dentro del componente al dato que necesitamos a travez del contexto.
// createContext: Primero, creamos un contexto utilizando createContext. Este contexto actúa como un almacén global para nuestros datos.
// Provider: Luego, utilizamos el componente Provider del contexto creado para envolver nuestros componentes. El Provider toma un prop llamado value, donde asignamos los datos (estados, funciones, etc) que queremos compartir.
// useContext: En cualquier componente hijo dentro del Provider, podemos usar useContext para acceder directamente a los datos almacenados en el contexto. Esto evita el “props drilling”, que es cuando pasamos datos a través de múltiples niveles de componentes y garantizar que el Componente solo llame lo que va a utilizar y nada mas.
// Si la aplicacion es muy grande, puede tener varios contextos y no uno solo general.

// Crear el contexto del E-Commerce, APP pequeña, se usa un solo contexto
const ShoppingCartContext = createContext();

const initializeLocalStorage = () => {
   const accountInLocalStorage = localStorage.getItem('account');
   const signOutInLocalStorage = localStorage.getItem('sign-out');
   let parsedAccont;
   let parsedSignOut;

   if (!accountInLocalStorage) {
      localStorage.setItem('account', JSON.stringify({}));
      parsedAccont = {}
   } else {
      parsedAccont = JSON.parse(accountInLocalStorage);
   }

   if (!signOutInLocalStorage) {
      localStorage.setItem('sign-out', JSON.stringify(false));
      parsedSignOut = false;
   } else {
      parsedSignOut = JSON.parse(signOutInLocalStorage);
   }
}

// Componente Provider personalizado, siempre es buena idea tener un Provider personalizado que reciba los children (Componentes hijos)
function ShoppingCartProvider({children}) {
   // useState es un Hook super comun que permite agregar una variable de estado a un componente. Utiliza la desestructuración de arrays para acceder al estado actual y a la función que actualiza dicho estado. En si la funcion useState() devuelve un array con 2 posiciones pos[0] el variableEstado, pos[1] la funcion para actualizar variableEstado
   // My account
   const [account, setAccount] = useState({});

   // Sign out
   const [signOut, setSignOut] = useState(false);

   // Product Detail · Open/Close
   const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
   const openProductDetail = () => setIsProductDetailOpen(true);
   const closeProductDetail = () => setIsProductDetailOpen(false);

   // Product Detail · Show product
   const [productToShow, setProductToShow] = useState({});

   // Shopping Cart · Add products to cart
   const [cartProducts, setCartProducts] = useState([]);

   // Shopping Cart · Order
   const [order, setOrder] = useState([]);

   // Checkout Side Menu · Open/Close
   const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
   const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
   const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

   // Get products by title
   const [searchByTitle, setSearchByTitle] = useState(null);

   const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
   }

   // Get products by category
   const [searchByCategory, setSearchByCategory] = useState(null);
   
   const filteredItemsByCategory = (items, searchByCategory) => {
      return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()));
   }

   // Get products
   const [items, setItems] = useState(null);
   const [filteredItems, setFilteredItems] = useState(null);

   const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE'){
          return filteredItemsByTitle(items, searchByTitle);
      }

      else if (searchType === 'BY_CATEGORY'){
          return filteredItemsByCategory(items, searchByCategory);
      }

      else if (searchType === 'BY_TITLE_AND_CATEGORY'){
          return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
      }

      else if (!searchType){
          return items;
      }
   }

   // Loading
   const [loading, setLoading] = useState(false);

   // useEffect(funcion, [2do argumento]): Hooks poderoso (simula el ciclo de vida de un Componente [montaje, actualizacion, desmontaje]), permite ejecutar una funcion dependiendo de el 2do argumento, por lo general esa funcion tiene una logica pesada que queremos que se ejecute cuando queremos, el 2do argumento siempre es un Array []... si es un [] vacio, quiere decir que la funcion se va a ejecutar una sola vez y al finalizar de pintarse todo lo demas en el componente (Montaje, Muy Util porque encapsula y garantiza que una funcion se ejecuta una sola vez y no al haber el mas minimo cambio en el componente)... si es un [estado, etc] la funcion se va a ejecutar cuando estado, etc cambie su valor, si cambia 10 veces, 10 veces se ejecuta la funcion (Actualizacion, Muy Util porque permite ejecutar algo despues que se haya renderizado de nuevo el componente, un efecto colateral despues de ese evento por ejemplo)... Si se olvida el 2do argumento, entonces el efecto funciona como un bucle infinito (ERROR)
   useEffect(() => {
      const getProducts = async () => {
         try {
            setLoading(true);
            let res = await axios.get('https://api.escuelajs.co/api/v1/products'),
               data = await res.data;
   
            setItems(data);
         } catch (err) {
            let message = err.statusText || "Ocurrio un error";
            console.log(message);
         } finally {
            setLoading(false);
         }
      }
      getProducts();
   }, [])

   useEffect(() => {
      // Toda esta logica se puede mejorar bastante
      if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory));

      else if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));

      else if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));

      else if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
   }, [items, searchByTitle, searchByCategory])

   return (
      // Se debe colocar en el return del provider personalizado en su prop value todo lo que se desea compartir
      <ShoppingCartContext.Provider value={{
         isProductDetailOpen,
         openProductDetail,
         closeProductDetail,
         productToShow,
         setProductToShow,
         cartProducts,
         setCartProducts,
         isCheckoutSideMenuOpen,
         openCheckoutSideMenu,
         closeCheckoutSideMenu,
         order,
         setOrder,
         items,
         setItems,
         searchByTitle,
         setSearchByTitle,
         searchByCategory,
         setSearchByCategory,
         filteredItems,
         loading,
         setLoading,
         account,
         setAccount,
         signOut,
         setSignOut
      }}>
         {/* Aca se pone que será compartido con todos sus Componentes hijos */}
         {children}
      </ShoppingCartContext.Provider>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { ShoppingCartContext, ShoppingCartProvider, initializeLocalStorage };
