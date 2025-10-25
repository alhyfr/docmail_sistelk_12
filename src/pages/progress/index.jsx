import React, { useState, useEffect } from 'react'
import { Home, FileText, CheckCircle, UserCheck, Send, Clock, Calendar, User, Building2, FileCheck } from 'lucide-react'
import { useParams } from 'react-router'
import api from '../../lib/Api'
import dayjs from 'dayjs'
function Progres() {
  const { id } = useParams()
  const [suratCek, setSuratCek] = useState()


  const cekSurat = async () => {
    try {
      const response = await api.get(`/cek-surat/${id}`)
      setSuratCek(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching surat:', error)
    }
  }

  useEffect(() => {
    if (id) {
      cekSurat()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Generate timeline berdasarkan data API
  const generateTimeline = () => {
    if (!suratCek) return []

    // Cek apakah sudah diterima
    const isDiterima = suratCek.status === 'diterima'
    
    // Cek apakah sudah verifikasi (disposisi ada isi)
    const isVerifikasi = suratCek.disposisi !== null && suratCek.disposisi !== ''
    
    // Cek apakah sudah disposisi
    const isDisposisi = suratCek.status_terima === 'diterima'

    const timeline = [
      {
        status: 'diterima',
        label: 'Surat Diterima',
        timestamp: isDiterima ? dayjs(suratCek.created_at).format('DD-MM-YYYY HH:mm') : null,
        petugas: isDiterima ? 'Admin TU' : null,
        keterangan: isDiterima 
          ? 'Surat telah diterima dan diregistrasi' 
          : 'Menunggu penerimaan surat',
        completed: isDiterima
      },
      {
        status: 'verifikasi',
        label: 'Verifikasi',
        timestamp: isVerifikasi ? dayjs(suratCek.updated_at).format('DD-MM-YYYY HH:mm') : null,
        petugas: isVerifikasi ? 'Kepala TU' : null,
        keterangan: isVerifikasi 
          ? `Sedang dalam proses verifikasi - ${suratCek.disposisi}` 
          : 'Menunggu verifikasi',
        completed: isVerifikasi
      },
      {
        status: 'disposisi',
        label: 'Disposisi',
        timestamp: isDisposisi ? dayjs(suratCek.updated_at).format('DD-MM-YYYY HH:mm') : null,
        petugas: isDisposisi ? 'Pimpinan' : null,
        keterangan: isDisposisi 
          ? 'Surat telah didisposisi dan diterima' 
          : 'Menunggu disposisi dari pimpinan',
        completed: isDisposisi
      }
    ]

    return timeline
  }

  // Get current active status
  const getCurrentStatus = () => {
    if (!suratCek) return null
    
    // Prioritas status dari belakang ke depan
    const isDisposisi = suratCek.status_terima === 'diterima'
    const isVerifikasi = suratCek.disposisi !== null && suratCek.disposisi !== ''
    const isDiterima = suratCek.status === 'diterima'
    
    // Return status yang sedang aktif (yang terakhir dikerjakan)
    if (isDisposisi) return 'disposisi'
    if (isVerifikasi) return 'verifikasi'
    if (isDiterima) return 'diterima'
    
    return null
  }

  const timeline = generateTimeline()
  const currentStatus = getCurrentStatus()

  const getStatusColor = (status, completed) => {
    if (!completed) return 'bg-gray-300'


    
    switch(status) {
      case 'diterima':
        return 'bg-blue-500'
      case 'verifikasi':
        return 'bg-yellow-500'
      case 'disposisi':
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'diterima':
        return <FileText className="w-6 h-6" />
      case 'verifikasi':
        return <FileCheck className="w-6 h-6" />
      case 'disposisi':
        return <Send className="w-6 h-6" />
      default:
        return <Clock className="w-6 h-6" />
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      {/* Header */}
      <div className='bg-white shadow-md border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <button className='p-2 hover:bg-gray-100 rounded-lg transition'>
                <Home className='w-5 h-5 text-gray-600' />
              </button>
              <div>
                <h1 className='text-2xl font-bold text-gray-800'>Documail</h1>
                <p className='text-sm text-gray-500'>Pantau status perjalanan surat Anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {!suratCek ? (
          <div className='flex items-center justify-center py-20'>
            <div className='text-center'>
              <Clock className='w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin' />
              <p className='text-gray-600'>Memuat data surat...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Info Surat Card */}
            <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100'>
              <div className='flex items-start justify-between mb-6'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='p-3 bg-blue-100 rounded-xl'>
                      <FileText className='w-6 h-6 text-blue-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-800'>{suratCek?.perihal}</h2>
                      <p className='text-sm text-gray-500'>No: {suratCek?.nosurat}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Info Grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <Building2 className='w-5 h-5 text-gray-500' />
                  <div>
                    <p className='text-xs text-gray-500'>Pengirim</p>
                    <p className='font-semibold text-gray-800'>{suratCek?.asal_instansi}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <Calendar className='w-5 h-5 text-gray-500' />
                  <div>
                    <p className='text-xs text-gray-500'>Tanggal Surat</p>
                    <p className='font-semibold text-gray-800'>
                      {suratCek?.created_at ? dayjs(suratCek.created_at).format('DD-MM-YYYY') : '-'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <FileText className='w-5 h-5 text-gray-500' />
                  <div>
                    <p className='text-xs text-gray-500'>Jenis Surat</p>
                    <p className='font-semibold text-gray-800'>{suratCek?.jenis_surat || 'Surat Masuk'}</p>
                  </div>
                </div>
              </div>
            </div>

        {/* Timeline Status - Horizontal */}
        <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
          <h3 className='text-xl font-bold text-gray-800 mb-8 flex items-center gap-2'>
            <CheckCircle className='w-6 h-6 text-blue-600' />
            Progress Status Surat
          </h3>

          {/* Horizontal Timeline */}
          <div className='relative mb-12'>
            {/* Progress Bar Background */}
            <div className='absolute top-6 left-0 right-0 h-2 bg-gray-200 rounded-full' style={{ zIndex: 0 }} />
            
            {/* Active Progress Bar */}
            <div 
              className='absolute top-6 left-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out'
              style={{ 
                width: timeline && timeline.length > 0 ? `${(timeline.filter(t => t.completed).length / timeline.length) * 100}%` : '0%',
                zIndex: 1
              }}
            />

            {/* Timeline Items */}
            <div className='relative flex justify-between'>
              {timeline && timeline.length > 0 && timeline.map((item, index) => (
                <div key={index} className='flex flex-col items-center' style={{ flex: 1, zIndex: 10 }}>
                  {/* Status Icon */}
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full ${getStatusColor(item.status, item.completed)} text-white shadow-lg transition-all duration-300 ${item.completed ? 'scale-110 ring-4 ring-white' : ''} mb-4`}>
                    {getStatusIcon(item.status)}
                  </div>

                  {/* Status Label */}
                  <div className='text-center mb-2'>
                    <h4 className='font-bold text-gray-800 text-sm mb-1'>{item.label}</h4>
                    <div className='flex items-center justify-center gap-1'>
                      {item.completed ? (
                        <CheckCircle className='w-4 h-4 text-green-500' />
                      ) : (
                        <Clock className='w-4 h-4 text-gray-400 animate-pulse' />
                      )}
                      <span className='text-xs text-gray-500'>
                        {item.completed ? 'Selesai' : 'Menunggu'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
            {timeline && timeline.length > 0 && timeline.map((item, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${
                  item.completed 
                    ? 'from-blue-50 to-indigo-50 border-blue-200' 
                    : 'from-gray-50 to-gray-100 border-gray-200'
                } rounded-xl p-5 border-2 transition-all hover:shadow-md ${
                  !item.completed && item.status === currentStatus 
                    ? 'ring-2 ring-blue-400 ring-offset-2' 
                    : ''
                }`}
              >
                <div className='flex items-start gap-3 mb-3'>
                  <div className={`p-2 rounded-lg ${getStatusColor(item.status, item.completed)} text-white`}>
                    {getStatusIcon(item.status)}
                  </div>
                  <div className='flex-1'>
                    <h5 className='font-bold text-gray-800 mb-1'>{item.label}</h5>
                    <p className='text-xs text-gray-600'>{item.keterangan}</p>
                  </div>
                </div>

                {item.timestamp && (
                  <div className='flex items-center gap-2 text-xs text-gray-500 mb-2'>
                    <Calendar className='w-3.5 h-3.5' />
                    <span>{item.timestamp}</span>
                  </div>
                )}

                {item.petugas && (
                  <div className='flex items-center gap-2 text-xs text-gray-500 mb-3'>
                    <User className='w-3.5 h-3.5' />
                    <span>{item.petugas}</span>
                  </div>
                )}

                {/* Action Button */}
                {!item.completed && item.status === currentStatus && (
                  <button className='w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold flex items-center justify-center gap-2'>
                    <UserCheck className='w-4 h-4' />
                    Proses Sekarang
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='p-3 bg-blue-600 rounded-xl'>
                  <CheckCircle className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h4 className='font-bold text-gray-800'>Progress Keseluruhan</h4>
                  <p className='text-sm text-gray-600'>
                    {timeline && timeline.length > 0 ? `${timeline.filter(t => t.completed).length} dari ${timeline.length} tahap selesai` : 'Memuat data...'}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <div className='text-3xl font-bold text-blue-600'>
                  {timeline && timeline.length > 0 ? Math.round((timeline.filter(t => t.completed).length / timeline.length) * 100) : 0}%
                </div>
                <p className='text-xs text-gray-500'>Completed</p>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Progres