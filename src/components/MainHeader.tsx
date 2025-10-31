import React from 'react'
const MainHeader: React.FC = () => {
  return (
    <header className='relative text-center justify-center top-0 left-0 right-0 font-bold py-5 flex flex-col md:flex-row md:justify-start gap-5 items-center' style={{
      backgroundImage: "url('/header_bg.png')", backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <img
        src="/logo.png"
        alt="Sleepy cat"
        loading="lazy"
        className='w-[150px]'
      />
      <span className='uppercase text-[#253b91]'>
        <h1 className='text-2xl '>
          ក្រសួងធម្មការ​និងកិច្ចការ​សាសនា
        </h1>
        Ministry of Cult and Religion
      </span>
    </header>
  )
}

export default MainHeader