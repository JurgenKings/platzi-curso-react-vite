import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

function ShoppingCart() {
   const context = useContext(ShoppingCartContext);

   const openCheckoutSideMenu = () => {
      context.openCheckout();
      context.closeProductDetail();
   }

   return (
    <div className='relative flex gap-0.5 items-center' onClick={() => openCheckoutSideMenu()}>
      <ShoppingBagIcon className='w-6 h-6 stroke-white cursor-pointer' />
      <div className='absolute bottom-3.5 left-4 flex justify-center items-center rounded-lg w-4 h-4 text-base text-white'>
         {context.cartProducts.length}
      </div>
    </div>
   )
}

export { ShoppingCart };