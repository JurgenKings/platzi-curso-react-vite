import { useContext } from 'react';
import { Layout } from '../../components/Layout';
import { ShoppingCartContext } from '../../Context';
import { OrdersCard } from '../../components/OrdersCard';
import { Link } from 'react-router-dom';

// Componente para la pagina (url) myOrders
function MyOrders () {
   const context = useContext(ShoppingCartContext);

   return (
      <Layout>
         <div className='flex items-center justify-center relative w-80 mb-4 mt-10 sm:mt-10 md:mt-10 lg:mt-0'>
            <h1 className='text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl'>My Orders</h1>
         </div>
         {
            context.order?.map((order, index) => (
               <Link key={index} to={`/my-orders/${index}`}>
                  <OrdersCard 
                     date={order.date}
                     totalPrice={order.totalPrice} 
                     totalProducts={order.totalProducts}
                  />
               </Link>
            ))
         }
      </Layout>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { MyOrders };