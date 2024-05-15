import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// NOTAS IMPORTANTES:
// Estructura de carpetas en Vite:
//  -node_modules: Contiene todas las dependencias y esas cosas
//  -public: Contiene principalmente imagenes publicas y el logo, similar a assets
//  -src: Contiene practicamente TODO de la App
//    -src/assets: Contiene recursos estáticos adicionales, como fuentes, iconos o cualquier otro archivo que no sea código fuente pero que necesites en tu aplicación.
//    -src/components: Contiene todos los componentes mas que todo la logica y no tanto lo que renderizan, se suele crear una carpeta por componente o una carpeta para un proposito mayor (una ruta o pagina por ejemplo) que contiene varios componentes especificos de esa pagina o ruta
//    -src/context: Contiene todos los contextos (estados globales) de la app
//    -src/hooks: Contiene todos los hooks personalizados
//    -src/pages: Contiene los Componentes que renderizan jsx de cada pagina o ruta (url), se suele crear una carpeta por cada pagina de la app que dentro contiene uno o varios Componentes
//    -src/utils: Contiene funciones genericas auxiliares que no pertenecen a ningun componente en particular, estas funciones no requieren tener su propio modulo




// TODO: Hacer responsive la app y hacer el deploy