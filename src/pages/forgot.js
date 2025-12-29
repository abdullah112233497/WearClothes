import React from 'react'
import Link from 'next/link'

const forgot = () => {
  return (
     <div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="py-6 px-4 w-full max-w-md"> {/* Centered and limited width */}
          <div className="border border-slate-300 rounded-lg p-6 shadow-[0_2px_22px_-4px_rgba(0,0,0,0)] mx-auto">
            <form className="space-y-6">
              <div className="mb-12">
                <h1 className="text-slate-900 text-3xl font-semibold">Forgot your account</h1>
                
              </div>

              <div>
                <div className="relative flex items-center">
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" 
                    placeholder="Enter your Email" 
                  />
             {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[18px] h-[18px] absolute right-4">
  <path fill="#fffff" d="M24 27.5L6 14V36h36V14L24 27.5z"/>
  <path fill="#fffff" d="M24 27.5L42 14H24L24 27.5z"/>
  <path fill="#ffff" d="M24 27.5L6 14h18L24 27.5z"/>
  <path fill="#ffff" d="M24 27.5L24 14l18 0L24 27.5z"/>
</svg> */}


                </div>
                
              </div>
                <div className="text-sm">


                  <Link className="text-blue-600 hover:underline font-medium" href={"/login"}>
                    Login your account.
                  </Link>
                </div>
              <div className="!mt-12">
                <button type="button" className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  continue
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default forgot
