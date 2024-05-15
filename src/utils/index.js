// Comentarios especiales utiles para estas funciones genericas

/**
 * This function calculates total price of new order
 * @param {Array} products cartProduct: Array of Objects 
 * @returns {number} sum = price total
 */
const totalPrice = (products) => {
   let sum = 0;
   products.forEach(product => sum += product.price);
   return sum;
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { totalPrice };