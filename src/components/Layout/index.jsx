// Componente para mantener la misma estructura en todo la app
function Layout ({ children }) {
  return (
    // Estas clases se aplicaran a todo lo que se ponga de hijo de este Componente Layout
    <div className='flex flex-col items-center mt-20 min-h-screen'>
      {children}
    </div>
  )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { Layout };