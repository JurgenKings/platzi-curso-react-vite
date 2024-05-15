import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { XMarkIcon } from '@heroicons/react/24/solid';
import './styles.css';

// Componente para mostrar el detalle de cada producto
function ProductDetail() {
   const context = useContext(ShoppingCartContext);

   return (
      <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-slate-900 rounded-xl bg-white z-50`}>
         <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>Detail</h2>
            <div>
               <XMarkIcon 
                  className='h-6 w-6 text-slate-900 cursor-pointer transition-transform hover:scale-110'
                  onClick={context.closeProductDetail} 
               />
            </div>
         </div>
         <figure className='px-6'>
            <img
               className='w-full h-full rounded-lg'
               src={context.productToShow.images?.[0][0] === 'h' ? context.productToShow.images[0] : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
               alt={context.productToShow.title}
            />
         </figure>
         <p className='flex flex-col p-6'>
            <span className='font-medium text-2xl mb-2'>${context.productToShow.price}</span>
            <span className='font-medium text-md'>{context.productToShow.title}</span>
            <span className='font-light text-sm'>{context.productToShow.description}</span>
         </p>
      </aside>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { ProductDetail };