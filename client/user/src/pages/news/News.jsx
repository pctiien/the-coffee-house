
import NewsList from '../../features/News/NewsList'
import React from 'react'
const News = ()=>{
    const [activeItem,setActiveItem] = React.useState('#coffeelover')
    const handleClick = (item)=>{
        setActiveItem(item)
    }
    return (
        <>
        <div className= 'mt-32'>
            <h1 className= 'text-center text-3xl font-semibold'>Latest News</h1>
            <div className = 'flex justify-center mt-12'>
                <div className='flex justify-between gap-5 rounded-full border-gray-200 border w-max p-2.5 px-24  '>
                    <div 
                    onClick={()=>handleClick('#coffeelover')}
                    className= {`cursor-pointer p-2 text-gray-400 text-xs font-semibold ${activeItem === '#coffeelover' ? 'bg-orange-400 rounded-full shadow-lg text-white' : '' } `}>#COFFEELOVER</div>
                    <div
                    onClick={()=>handleClick('updates-from-house')} 
                    className= {`cursor-pointer p-2 text-gray-400 text-xs font-semibold ${activeItem === 'updates-from-house' ? 'bg-orange-400 rounded-full shadow-lg text-white' : '' } `}>UPDATES FROM HOUSE</div>
                    <div
                    onClick={()=>handleClick('special-offer')} 
                    className= {`cursor-pointer p-2 text-gray-400 text-xs font-semibold ${activeItem === 'special-offer' ? 'bg-orange-400 rounded-full shadow-lg text-white' : '' } `}>SPECIAL OFFER</div>
                </div>
            </div>
            <NewsList/>
        </div>

        </>
    )
}
export default News