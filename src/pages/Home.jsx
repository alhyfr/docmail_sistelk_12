import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams } from 'react-router'
function Home() {
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])



  return (
    <div className='h-screen flex items-center justify-center'>
        {loading && <Loading variant="runner" size="lg" color="blue" text="Menunggu..." />}
        {id && <div>Home {id}</div>}
    </div>
  )
}

export default Home