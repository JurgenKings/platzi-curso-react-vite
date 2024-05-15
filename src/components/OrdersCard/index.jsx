import { ChevronRightIcon } from '@heroicons/react/24/solid';

// Componente para cada order en my-orders
function OrdersCard(props) {
   const { 
      totalPrice, 
      totalProducts, 
      date 
   } = props;
   
   return (
      <div className='flex justify-between items-center mb-3 border border-slate-900 rounded-lg p-4 w-80'>
         <div className='flex justify-between w-full'>
            <p className='flex flex-col'>
               <span className='font-light'>{date}</span>
               <span className='font-light'>{totalProducts} articles</span>
            </p>
            <p className='flex items-center gap-2'>
               <span className='font-medium text-2xl'>${totalPrice}</span>
               <ChevronRightIcon className='h-6 w-6 text-slate-900 cursor-pointer' />
            </p>
         </div>
      </div>
   );
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { OrdersCard };