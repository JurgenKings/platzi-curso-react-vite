import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { OrderCard } from '../OrderCard';
import { totalPrice } from '../../utils';
import './styles.css';

// Componente que muestra lo que esta en el carrito y permite procesar la orden
function CheckoutSideMenu() {
   const context = useContext(ShoppingCartContext);

   // A las funciones que manejan un evento (puede ser personalizado) se llaman handleAccion o handleEvento
   // Funcion para eliminar productos del carrito
   const handleDelete = (id) => {
      // Devuelve todo lo que tenia el carrito menos el producto a borrar
      const filteredProducts = context.cartProducts.filter(product => product.id != id);
      context.setCartProducts(filteredProducts);
   }

   // Funcion para obtener la fecha de hoy
   const getDate = () => {
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11
      let year = today.getFullYear();

      // Formateamos los valores para que tengan dos dígitos
      let formattedDay = (day < 10) ? '0' + day : day;
      let formattedMonth = (month < 10) ? '0' + month : month;

      let formattedDate = formattedDay + '/' + formattedMonth + '/' + year;

      return formattedDate;
   }

   // Funcion para procesar la orden
   const handleCheckout = () => {
      let date = getDate();
      // Crear un objeto order y añadirlo a un array orders
      const orderToAdd = {
         date, // date: date = getDate()
         products: context.cartProducts,
         totalProducts: context.cartProducts.length,
         totalPrice: totalPrice(context.cartProducts)
      }
      // Almacenar en el estado order, con lo que ya tenia order mas la order nueva
      context.setOrder([...context.order, orderToAdd]);
      // Resetear carrito
      context.setCartProducts([]);
      // Resetear input de busqueda/filtro
      context.setSearchByTitle(null);
      // Cerrar ChekoutSideMenu
      context.closeCheckoutSideMenu();
   }

   return (
      // Se usan clases dinamicas dependiendo del estado
      <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-slate-900 rounded-xl bg-white z-50`}>
         <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>My Order</h2>
            <div>
               {/* Icono para cerrar este componente */}
               <XMarkIcon 
                  className='h-6 w-6 text-slate-900 cursor-pointer transition-transform hover:scale-110'
                  onClick={() => context.closeCheckoutSideMenu()} 
               />
            </div>
         </div>

         <div className='p-6 overflow-y-scroll flex-1'>
            {/* Iterar todos los productos del carrito y mostrarlos en una card */}
            {context.cartProducts.map(product => (
               <OrderCard 
                  key={product.id}
                  id={product.id} 
                  title={product.title} 
                  imageUrl={product.images} 
                  price={product.price} 
                  handleDelete={handleDelete}
               />
            ))}
         </div>
         <div className='px-6 mb-6'>
            <p className='flex justify-between items-center mb-2'>
               <span className='font-light'>Total: </span>
               {/* totalPrice es una funcion auxiliar (utils) que no pertenece a ningun componente */}
               {/* En la carpeta utils se colocan funciones genericas auxiliares que no requieren tener su propio modulo */}
               <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
            </p>
            {/* Se redirige a una ruta con la ultima order al pulsar el boton para procesar la orden */}
            <Link to={'/my-orders/last'}>
               <button 
                  className='w-full bg-slate-900 text-white rounded-lg py-3'
                  onClick={() => handleCheckout()}
               >Checkout</button>
            </Link>
         </div>
      </aside>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { CheckoutSideMenu };