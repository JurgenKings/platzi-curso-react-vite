import React from 'react';

function Loading() {
   return ( 
      <div className="flex flex-col w-full justify-center items-center h-40">
         <div className="flex gap-2 w-full justify-center">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
         </div>
      </div>
   );
}

export { Loading };