import News from '../../sample/News'
import NewsCard from './NewsCard'
const NewsList = ()=>{
    return (
        <>
            <div className='py-10 px-36'>
                <div className= 'mb-10 pt-32'>
                    <h1 className = 'text-center text-3xl font-semibold'>News</h1>
                </div>
                <div className='grid grid-cols-4 grid-rows-2 gap-8  mx-auto  '>
                {
                    News.map((news,index)=>{
                        return (
                            <NewsCard key={index} item ={news} />
                        )
                        
                    })
                }
                </div>  
            </div>
        </>
    )
}

export default NewsList 