import React from 'react'

export default function 
({src,height,width}) {
  return (
    <div>
         <img
      src={src}
      className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
      height={height}
      width={width}
      alt="thumbnail"
    />
    </div>
  )
}
