import { useContext, useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { Layout } from '../../components/Layout';

// Componente para la pagina (url) signIn
function SignIn () {
   const context = useContext(ShoppingCartContext);
   const [view, setView] = useState('user-info');
   const form = useRef(null);

   // Account
   const account = localStorage.getItem('account');
   const parsedAccount = JSON.parse(account);
   // Has an account
   const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
   const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
   const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

   const handleSignIn = () => {
      const stringifiedSignOut = JSON.stringify(false);
      localStorage.setItem('sign-out', stringifiedSignOut);
      context.setSignOut(false);
      // Redirect
      return <Navigate replace to={'/'} />
   }

   const createAnAccount = () => {
      const formData = new FormData(form.current);
      const data = {
         name: formData.get('name'),
         email: formData.get('email'),
         password: formData.get('password'),
      }
      // Create Account
      const stringifiedAccount = JSON.stringify(data);
      localStorage.setItem('account', stringifiedAccount);
      context.setAccount(data);
      // Sign in
      handleSignIn();
   }

   const renderLogIn = () => {
      return (
         <div className='flex flex-col w-80'>
            <p>
               <span className='font-light text-sm'>Email: </span>
               <span>{parsedAccount?.email}</span>
            </p>
            <p>
               <span className='font-light text-sm'>Password: </span>
               <span>{parsedAccount?.password}</span>
            </p>
            <Link
               to={'/'}
            >
               <button 
                  className='bg-slate-900 disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
                  onClick={() => handleSignIn()}
                  disabled={!hasUserAnAccount}
               >
                  Log in
               </button>
            </Link>
            <div className='text-center'>
               <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
            </div>
            <button 
               className='border border-slate-900 disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'
               onClick={() => setView('create-user-info')}
               disabled={hasUserAnAccount}
            >
               Sign up
            </button>
         </div>
      )
   }

   const renderCreateUserInfo = () => {
      return (
         <form ref={form} className='flex flex-col gap-4 w-80'>
            <div className='flex flex-col gap-1'>
               <label className='font-light text-sm' htmlFor="name">Your name: </label>
               <input
                  className='rounded-lg border border-slate-900 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                  type='text'
                  id='name'
                  name='name'
                  defaultValue={parsedAccount?.name}
                  placeholder='Jorge'
               >
               </input>
            </div>
            <div className='flex flex-col gap-1'>
               <label className='font-light text-sm' htmlFor="email">Your email: </label>
               <input
                  className='rounded-lg border border-slate-900 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                  type='text'
                  id='email'
                  name='email'
                  defaultValue={parsedAccount?.email}
                  placeholder='jorge@gmail.com'
               >
               </input>
            </div>
            <div className='flex flex-col gap-1'>
               <label className='font-light text-sm' htmlFor="password">Your password: </label>
               <input
                  className='rounded-lg border border-slate-900 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                  type='text'
                  id='password'
                  name='password'
                  defaultValue={parsedAccount?.password}
                  placeholder='******'
               >
               </input>
            </div>
            <Link to={'/'}>
               <button
                  className='bg-slate-900 text-white w-full rounded-lg py-3'
                  onClick={() => createAnAccount()}
               >
                  Create
               </button>
            </Link>
         </form>
      )
   }

   const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn();

   return (
      <Layout>
         <div className='mb-4 mt-10 sm:mt-10 md:mt-10 lg:mt-0'>
            <h1 className='text-2xl font-extrabold leading-none text-center tracking-tight mb-4 text-gray-900 md:text-3xl lg:text-3xl'>Welcome</h1>
            {renderView()}
         </div>
      </Layout>
   )
}

// Es bueno no exportar por defecto porque a la hora de importarlo se puede con cualquier nombre
export { SignIn };