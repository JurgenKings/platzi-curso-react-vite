import { useContext } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { ProductDetail } from '../../components/ProductDetail';
import { ShoppingCartContext } from '../../Context';
import { Loading } from '../../components/Loading';

// Componente para la pagina (url) home
function Home () {
   const context = useContext(ShoppingCartContext);

   // Funcion para gestionar el filtrdo de productos
   const renderView = () => {
      // Cuando un objeto no existe, React arroja un error y no se renderiza nada. Por ejemplo, si llamamos {data.data.category.name} dentro de un componente y el objeto data, data.category o data.category.name no existen, la pantalla se mostrará en blanco. No obstante, podemos evitar que se rompa la página si utilizamos la sintaxis opcional de encadenamiento de operadores de navegación segura, representada por el símbolo ?., de esta forma: {data.data?.category?.name}. En este caso, si alguno de los objetos no existe, la expresión devolverá undefined, pero el código seguirá ejecutándose sin problemas.
      if (context.items?.length > 0) {
         if (context.filteredItems?.length > 0) {
            return (
               context.filteredItems?.map((item) => (
                  <Card key={item.id} data={item} />
               ))
            )
         } else {
            return (
               <div className='flex-grow'>We don't have anything :(</div>
            )
         }
      }
   }

   return (
      <Layout>
         <div className='flex items-center justify-center relative w-80 mb-4 mt-10 sm:mt-10 md:mt-10 lg:mt-0 '>
            <h1 className='text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl'>Exclusive Products</h1>
         </div>
         <input 
            className='rounded-lg border border-slate-900 w-80 p-4 mb-4 focus:outline-none'
            type="text" 
            placeholder='Search a product...'
            onChange={e => context.setSearchByTitle(e.target.value)}
         />

         {context.loading && <Loading/>}
         <div className='grid place-items-center gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-xl'>
            {!context.loading && renderView()}
         </div>
         <ProductDetail />
      </Layout>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { Home };