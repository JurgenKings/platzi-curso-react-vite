import React from 'react';

function Footer() {
   return (
      <footer className='bg-slate-900 text-white/90 py-4 flex justify-around mt-5 items-center sticky top-[100vh] flex-col'>
         <div>
            <p className='text-lg font-bold pb-3'>Kings</p>
         </div>
         <div className='flex justify-center items-center pb-3 w-full'>
            <ul className='text-sm flex gap-3 flex-col sm:flex-row md:flex-row lg:flex-row'>
               <li><a href='#' className='hover:text-gray-300'>Acerca de nosotros</a></li>
               <li><a href='#' className='hover:text-gray-300'>Términos y condiciones</a></li>
               <li><a href='#' className='hover:text-gray-300'>Política de privacidad</a></li>
            </ul>
         </div>
         <div>
            <p className='text-sm'>Copyright &copy; 2024 All rights reserved</p>
         </div>
      </footer>
   );
};

export { Footer };