import { useState, useContext } from 'react';
// react-router-dom Proporciona componentes que nos permiten definir rutas y manejar la navegación entre diferentes páginas o secciones de nuestra aplicación. LO MEJOR QUE EXISTE PARA MANEJAR RUTAS, SI NO SE USA NEXT.JS
// Las 2 mejores opciones para rutas y SPA: React Router DOM y Next.js
import { NavLink } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { ShoppingCart } from '../ShoppingCart';

// Componente para tener el menu de navegacion superior
function Navbar() {
   const context = useContext(ShoppingCartContext);
   // Clases a aplicar al menu.item solo si estamos en esta ruta
   const activeStyle = 'underline underline-offset-4 text-white ';
   // NOTA: Esta parte se puede mejorar xD
   const menuActive = 'flex justify-center flex-col fixed bg-black/90 top-20 left-0 w-80 -mt-4 pt-7';
   const menuActive2 = 'flex justify-center flex-col fixed bg-black/90 left-0 top-44 w-80 mt-40 pt-4 pb-48';
   const menuInactive = 'hidden';
   const [isNavActive, setIsNavActive] = useState(false)

   // Sign Out
   const signOut = localStorage.getItem('sign-out');
   const parsedSignOut = JSON.parse(signOut);
   const isUserSignOut = context.signOut || parsedSignOut;

   // Account
   const account = localStorage.getItem('account');
   const parsedAccount = JSON.parse(account);
   // Has an account
   const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
   const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
   const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

   const handleSignOut = () => {
      const stringifiedSignOut = JSON.stringify(true);
      localStorage.setItem('sign-out', stringifiedSignOut);
      context.setSignOut(true);
      setIsNavActive(false)
   }

   const renderView = () => {
      if (hasUserAnAccount && !isUserSignOut) {
         return (
            <>
               <li className='text-white/70 mr-3 hidden lg:inline'>
                  {parsedAccount?.email}
               </li>
               <li>
                  <NavLink
                     className={({ isActive }) => isActive ? activeStyle : undefined}
                     to={'/my-orders'}
                     onClick={e => setIsNavActive(false)}
                  >
                     My Orders
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     className={({ isActive }) => isActive ? activeStyle : undefined}
                     to={'/my-account'}
                     onClick={e => setIsNavActive(false)}
                  >
                     My Account
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     className={({ isActive }) => isActive ? activeStyle : undefined}
                     to={'/sign-in'}
                     onClick={() => handleSignOut()}
                  >
                     Sign out
                  </NavLink>
               </li>
            </>
         )
      } else {
         return (
            <li>
               <NavLink
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  to={'/sign-in'}
                  onClick={() => handleSignOut()}
               >
                  Sign out
               </NavLink>
            </li>
         )
      }
   }

   return (
      <nav className='flex justify-between items-center fixed inset-x-0 top-0 z-10 w-full py-5 px-8 text-sm font-light  bg-slate-900 shadow shadow-slate-400'>
         {/* flex justify-between items-center fixed inset-x-0 top-0 z-10 w-full px-8 text-sm font-light bg-slate-900 shadow */}
         <ul className='text-white/90 text-base flex justify-between items-center w-full md:hidden lg:hidden'>
            <li className='font-bold text-xl'>
               <NavLink
                  to={`${isUserSignOut ? '/sign-in' : '/'}`}
                  onClick={() => context.setSearchByCategory('')}
               >
                  Kings
               </NavLink>
            </li>
            <li className=''>
               <button onClick={e => setIsNavActive(state => !state)}>
                  <Bars3Icon className='w-6 h-6 stroke-white cursor-pointer' />
               </button>
            </li>
         </ul>
         <ul className={`items-center gap-3 text-white/90 text-base ${isNavActive && menuActive} z-10 ${!isNavActive && menuInactive} md:flex lg:flex`}>
            <li className='font-bold text-xl mr-4'>
               {/* Componente: NavLink nos brinda un callback/funcion con un objeto con las propiedades: isActive y Pending. util para saber cuando un elemento esta activo o pendiente. su manera de uso popular es en los menu de navegacion, sin necesidad de recargar la pagina. */}
               <NavLink
                  to={`${isUserSignOut ? '/sign-in' : '/'}`}
                  onClick={() => {
                     context.setSearchByCategory('')
                     setIsNavActive(false)
                  }}
               >
                  Kings
               </NavLink>
            </li>
            <li>
               {/* Aplicamos los activeStyle solo si es la ruta (url) activa */}
               <NavLink
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  to={'/'}
                  onClick={() => {
                     context.setSearchByCategory('')
                     setIsNavActive(false)
                  }}
               >
                  All
               </NavLink>
            </li>
            <li>
               <NavLink
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  to='/clothes'
                  onClick={() => {
                     context.setSearchByCategory('clothes')
                     setIsNavActive(false)
                  }}
               >
                  Clothes
               </NavLink>
            </li>
            <li>
               <NavLink
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  to='/electronics'
                  onClick={() => {
                     context.setSearchByCategory('electronics')
                     setIsNavActive(false)
                  }}
               >
                  Electronics
               </NavLink>
            </li>
            <li>
               <NavLink
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  to='/furniture'
                  onClick={() => {
                     context.setSearchByCategory('furniture')
                     setIsNavActive(false)
                  }}
               >
                  Furniture
               </NavLink>
            </li>
            <li>
               <NavLink
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  to='/toys'
                  onClick={() => {
                     context.setSearchByCategory('toys')
                     setIsNavActive(false)
                  }}
               >
                  Toys
               </NavLink>
            </li>
            <li>
               <NavLink
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  to='/others'
                  onClick={() => {
                     context.setSearchByCategory('others')
                     setIsNavActive(false)
                  }}
               >
                  Others
               </NavLink>
            </li>
         </ul>
         <ul className={`items-center gap-3 text-white/90 text-base ${isNavActive && menuActive2} z-10 ${!isNavActive && menuInactive} md:flex lg:flex`}>
            {renderView()}
            <li className='flex items-center'>
               <ShoppingCart />
            </li>
         </ul>
      </nav>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { Navbar };