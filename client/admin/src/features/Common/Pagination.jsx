const Pagination = ({totalEntry,entry,currentPage,onPageChange})=>{

    const pageCount = 3 
    
    const totalPages = Math.ceil(totalEntry/entry)

    const handleChange = (page)=>{
        if(page>=1 && page<=totalPages)
        {
            onPageChange(page)
        }
    }
    return (
        <>
            <div className='flex py-6 pt-10 justify-between items-center'>
                <p>Showing {entry} entries</p>
                <div className='flex items-center gap-3'>
                    <div 
                    onClick={()=>handleChange(currentPage-1)}
                    className='hover:text-white hover:bg-blue-500 w-10  h-10 border text-black text-lg font-semibold flex items-center justify-center rounded-full'>
                        {"<"}
                    </div>
                    <div className='flex items-center gap-3'>
                        {
                            [...Array(pageCount)].map((_,index)=>{
                                if(currentPage -1 + index < 1) return null
                                if(currentPage -1 +index > totalPages) return null
                                return (
                                    <div 
                                    onClick={()=>handleChange(currentPage-1+index)}
                                    key={index} className  ={`hover:text-white hover:bg-blue-500 w-10 h-10   text-lg font-semibold flex items-center justify-center rounded-full ${index===1 ?'bg-blue-500 text-white' :'text-black'}`}>{currentPage-1+index}
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    <div
                    onClick={()=>handleChange(currentPage+1)} 
                    aria-label="Next page"
                    className='hover:text-white hover:bg-blue-500 w-10 h-10 border text-black text-lg font-semibold flex items-center justify-center rounded-full'>
                        {">"}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pagination 