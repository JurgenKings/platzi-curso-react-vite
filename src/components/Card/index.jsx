import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';

// Es buena idea crear los componentes con function y las funciones internas de ese componente como arrow function

// Componente para cada una de las tarjetas de los productos
// La props data es un objeto con otra data que tiene todos los datos de un producto en particular
function Card(data) {
  // useContext es un hook que nos permite acceder a estados globales previamente creados con createContext. Básicamente, nos permite compartir datos entre componentes sin necesidad de pasarlos manualmente a través de las props. Aca se esta trayendo todo el contexto pero tambien se puede desestructurar solo lo necesario (ver Curso 1)
  const context = useContext(ShoppingCartContext);

  // Funcion para mostrar el detalle de cada producto
  const showProduct = (productDetail) => {
    // Sin desestructurar el context se debe colocar siempre: context.loQueSeVaAUtilizar(estados, funciones, etc)
    // Lo bueno de no desestructurar el context: Es mas facil identificar lo que viene del contexto global
    // Lo malo: Siempre hay que poner context, genera mas codigo inutil, carga funciones o estados innecesarios
    // Actualmente: Prefiero desestructurar 80%, no desestructurar 20%
    context.closeCheckoutSideMenu();
    context.openProductDetail();
    context.setProductToShow(productDetail);
  }

  // Funcion para añadir producto por producto al carrito de compras
  const addProductsToCart = (e, productData) => {
    // Detenemos la propagacion del evento para que solo afecte al pequeño boton del + y no toda la card
    e.stopPropagation();
    // Establecer nuevo valor del carrito con lo que ya tenia mas el nuevo
    context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  }

  // Funcion para renderizar uno u otro icono dependiendo de si el producto esta en el carrito o no
  const renderIcon = (id) => {
    // Variable booleana para saber si el producto ya esta o no en el carrito, mediante la longitud del filtro
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;

    // Si esta en el carrito...
    if (isInCart) {
      return (
        <div 
          className='absolute top-0 right-0 flex justify-center items-center bg-slate-900 w-6 h-6 rounded-full m-2'
        >
          <CheckIcon className='h-6 w-6 text-green-400' />
        </div>
      )
    } else {
        return (
          <div 
            className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2'
            onClick={(e) => addProductsToCart(e, data.data)}
          >
            <PlusIcon className='h-6 w-6 text-' />
          </div>
        )
    }
  }

  return (
    <div 
      className='bg-white cursor-pointer w-56 h-60 rounded-lg'
      onClick={() => showProduct(data.data)}
    >
      <figure className='relative mb-2 w-full h-4/5'>
         <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-slate-900 text-xs m-2 px-3 py-0.5'>{data.data.category.name}</span>
            {/*Por problemas con la API se verifica si la imagen es valida o no, si no lo se muestra una vacio comun*/}
            <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0][0] === 'h' ? data.data.images[0] : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} alt={data.data.title} />
            {renderIcon(data.data.id)}
      </figure>
      <p className='flex justify-between items-center'>
         <span className='text-sm font-light'>{data.data.title}</span>
         <span className='text-lg font-medium'>${data.data.price}</span>
      </p>
    </div>
  )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { Card };