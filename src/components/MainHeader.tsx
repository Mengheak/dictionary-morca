import React from 'react'
const MainHeader: React.FC = () => {
  return (
    <header className='relative text-center justify-center top-0 left-0 right-0 font-bold py-5 flex flex-col md:flex-row gap-5 items-center'>
      <img
        src="/logo.png"
        alt="Sleepy cat"
        loading="lazy"
        className='w-[150px]'
      />
      <span className='uppercase text-yellow-800'>
        <h1 className='text-2xl font-bold'>
          ក្រសួងធម្មកា​ និង​ សាសនា
        </h1>
        Ministry of Cult and Religion
      </span>
    </header>
  )
}

export default MainHeader