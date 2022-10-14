import React from 'react'
import useTitle from '../../Hooks/useTitle'

export default function Home() {
  useTitle('Home')
  return (
    <div className='h-screen'>Home</div>
  )
}
