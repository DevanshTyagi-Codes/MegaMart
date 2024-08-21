import React from 'react'
import {Button} from '../index'

const ProductItem = ({image , name , price , Description , id , handler}) => {
  return (
    <div className="p-3 h-[55vh] mt-1">
    <div className=" flex justify-center flex-col gap-1">
      <div className="flex justify-center mb-2 duration-100 hover:scale-105">
        <img src={image} className="w-44 h-44 rounded " alt="" />
      </div>
      <div className="flex flex-col gap-1 h-[20vh] text-black dark:text-white">
        <div>
          <span className="text-lg font-medium">{name}</span>
          <span>{Description}</span>
        </div>
        <span className="font-medium">&#8377;{price}</span>
      </div>
    </div>
    <div className="w-full flex justify-center mt-3">
      <Button onClick={() => handler({image , name , price , Description , id , quantity: 1})} className={`bg-neutral-500 dark:bg-neutral-600 lg:w-[14vw]`}>
        Add to Cart
      </Button>
    </div>
  </div>
  )
}

export default ProductItem
