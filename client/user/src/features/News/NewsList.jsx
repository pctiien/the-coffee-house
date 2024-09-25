import News from '../../sample/News'
import NewsCard from './NewsCard'
const NewsList = ()=>{
    return (
        <>
            <div className='py-10 px-36'>
            
                <div className='grid grid-cols-4  gap-8  mx-auto  '>
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