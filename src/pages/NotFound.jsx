import React from 'react'
import { Home, Search, FileQuestion, ArrowLeft, Mail } from 'lucide-react'
import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='max-w-4xl w-full'>
        <div className='text-center'>
          {/* 404 Illustration */}
          <div className='relative mb-8'>
            {/* Big 404 Text */}
            <div className='relative'>
              <h1 className='text-[180px] md:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 leading-none select-none'>
                404
              </h1>
              
              {/* Floating Icons */}
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='relative'>
                  {/* Center Icon */}
                  <div className='bg-white p-6 rounded-3xl shadow-2xl border-4 border-blue-200 animate-pulse'>
                    <FileQuestion className='w-16 h-16 md:w-20 md:h-20 text-blue-600' />
                  </div>
                  
                  {/* Orbiting Icons */}
                  <div className='absolute -top-8 -right-8 bg-white p-3 rounded-full shadow-lg animate-bounce'>
                    <Mail className='w-6 h-6 text-indigo-500' />
                  </div>
                  <div className='absolute -bottom-8 -left-8 bg-white p-3 rounded-full shadow-lg animate-bounce' style={{ animationDelay: '0.3s' }}>
                    <Search className='w-6 h-6 text-purple-500' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className='mb-8 space-y-3'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
              Oops! Halaman Tidak Ditemukan
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Halaman yang Anda cari tidak dapat ditemukan atau mungkin telah dipindahkan.
              Silakan periksa kembali URL.
            </p>
          </div>

        

         

          {/* Error Code */}
          <div className='mt-12 text-sm text-gray-500'>
            <p> Code by: <span className='font-mono font-semibold'>DOCUMAIL</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound