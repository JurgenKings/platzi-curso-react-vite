import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { Layout } from '../../components/Layout';
import { OrderCard } from '../../components/OrderCard';
import { totalPrice } from '../../utils';

// Componente para la pagina (url) myOrder
function MyOrder () {
   const context = useContext(ShoppingCartContext);
   // Logica para leer el id de la orden de la url, se puede mejorar con useParams
   const currentPath = location.pathname;
   let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
   let isLast;
   if (index === 'last') {
      index = context.order?.length - 1;
      isLast = true;
   }

   return (
      <Layout>
         <div className='flex items-center justify-center relative w-80 mb-4 mt-10 sm:mt-10 md:mt-10 lg:mt-0'>
            <Link to={'/my-orders'} className='absolute left-0'>
               <ChevronLeftIcon className='h6 w-6 text-slate-900 cursor-pointer' />
            </Link>
            <h1 className='text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl'>{isLast ? 'My Last Order' : 'My Order'}</h1>
         </div>
         <div className='flex flex-col w-80'>
            {
               context.order?.[index]?.products.map(product => (
                  <OrderCard 
                     key={product.id}
                     id={product.id} 
                     title={product.title} 
                     imageUrl={product.images} 
                     price={product.price} 
                  />
               ))
            }
            <p className='text-right border-t text-lg font-medium'>Total: ${ context.order?.[index]?.products ? totalPrice(context.order?.[index]?.products) : ''}</p>
         </div>
      </Layout>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { MyOrder };