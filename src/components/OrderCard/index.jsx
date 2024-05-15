import { XMarkIcon } from '@heroicons/react/24/solid';

// Componente para card de cada producto tanto el añadido en el carrito como el que sale en mis ordenes
function OrderCard(props) {
   // Desestructurar las props en vaiables individuales
   const {
      id,
      title,
      imageUrl,
      price,
      handleDelete
   } = props;

   let renderXMarkIcon;
   // Si viene handelDelete es porque esta en el carrito y se renderiza la 'x' para eliminar del carrito
   if (handleDelete) {
      renderXMarkIcon = <XMarkIcon 
      className='h-6 w-6 text-slate-900 cursor-pointer transition-transform hover:scale-110'
      onClick={() => handleDelete(id)} 
   />
   }

   return (
      <div className='flex justify-between items-center mb-3'>
         <div className='flex items-center gap-2'>
            <figure className='w-20 h-20 border bg-slate-900'>
               <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title}/>
            </figure>
            <p className='text-sm font-light'>{title}</p>
         </div>

         <div className='flex items-center gap-2'>
            <p className='text-lg font-medium'>${price}</p>
            {renderXMarkIcon}
         </div>
      </div>
   );
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { OrderCard };