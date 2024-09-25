

const NewsCard = ({item})=>{
    return (
        <>
            <div className="flex flex-col rounded-lg shadow-xl w-72">
                <img 
                className= ' w-72 rounded-t-lg object-contain'
                src={item.img} alt="" />
                <div className = 'p-4 flex flex-col'>
                    <h1 className=' h-16 text-start text-sm capitalize font-medium' >{item.title}</h1>
                    <div className = 'flex justify-end'>
                        <button className='text-white font-normal bg-orange-500 rounded-full p-2 px-5 text-xs'>READ MORE</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NewsCard 