import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { MyOrder } from '../MyOrder';
import { MyOrders } from '../MyOrders';
import { NotFound } from '../NotFound';
import { SignIn } from '../SignIn';
import { ShoppingCartContext } from '../../Context';

// Componente para gestionar las rutas (url) de la app
function AppRoutes() {
  const context = useContext(ShoppingCartContext);
  // Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);
  // Sign Out     
  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = Object.keys(context.account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = context.signOut || parsedSignOut;

  // useRoutes es un hooks de la libreria react-router-dom: Permite definir y configurar las rutas de la app, utiliza objetos JavaScript para definir las rutas.
  // Cada objeto representa una ruta con su respectiva ruta y componente a renderizar cuando la url tenga esa ruta
  // Aca se definió cada categoria de manera especifica, su puede mejor con useParams()
  let routes = useRoutes([
    { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/clothes', element: (hasUserAnAccount && !isUserSignOut) ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/furniture', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/toys', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/others', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    // /* es cualquier ruta que no sean las de arriba
    { path: '/*', element: <NotFound /> }
  ])
 
  return routes;
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { AppRoutes };