// Mejor forma cuando hay muchos import, primero todo lo de react, despues otros componentes y por ultimo el css
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Navbar } from '../../components/Navbar';
import { ShoppingCartProvider, initializeLocalStorage } from '../../Context';
import { CheckoutSideMenu } from '../../components/CheckoutSideMenu';
import { Footer } from '../../components/Footer';
import './App.css';

// Componente principal que contiene a todos los demas componentes
function App() {
  initializeLocalStorage();

  return (
    // BrowserRouter se utiliza para habilitar el enrutamiento basado en el historial del navegador. Permite que la aplicación web tenga rutas con URLs amigables y que los componentes se rendericen según la ruta actual.
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
        <Footer />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export default App;
