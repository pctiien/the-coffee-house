import Pagination from '../../features/Common/Pagination'
import React from 'react'
import userService  from '../../services/userService'

const UserList = ()=>{

    const [users,setUsers] = React.useState([])

    const [selectedPage,setSelectedPage] = React.useState(1)

    const [entry,setEntry] = React.useState(10)

    const [totalEntry,setTotalEntry] = React.useState(0)

    const onEntryChange = (e)=>{
        setEntry(Number(e.target.value)); 
        onPageChange(1)
    }
    const onPageChange = (page)=>{
        setSelectedPage(page)
    }
    const fetchUsers = async()=>{
        try{
            const response = await userService.getAllUsers(entry,selectedPage)
            console.log(response)
            
            setUsers(response.data.result.users)
            setTotalEntry(response.data.result.total)
        } catch(e)
        {
            console.error(e)
        }         
    }
    React.useEffect(()=>{
        
        

        fetchUsers()

        
    },[selectedPage,entry])
    return (
        <>
        <div className="">
            <div className="m-3 mx-5 p-5 text-xs text-gray-600 bg-white rounded-lg">
                <div className="flex items-center justify-between gap-8">
                    <div className="w-3/5 flex items-center gap-3">
                        <p>Showing</p>
                        <select 
                        onChange ={onEntryChange}
                        className="p-2 px-4 border rounded-xl"
                        name="" id="">
                            <option 
                            value={10}>10</option>
                            <option 
                            value={20}>20</option>
                            <option 
                            value={30}>30</option>
                        </select>
                        <p>entries</p>
                        <div className="flex-1 ml-4 text-base border flex p-4 px-5 bg-white rounded-xl justify-between items-center">
                            <input 
                            className="bg-transparent focus:outline-none"
                            type="text" placeholder="Search here..."/>
                            <img 
                            className="w-4 h-4"
                            src="/search.png" alt="" />
                        </div>
                    </div>
                    
                </div>
                <div className=''>
                    <div className='border-b py-5 pb-12'>
                        <table className='text-sm text-black '>
                            <thead className=''>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    users?.map((user,index)=>{
                                        return (
                                            <tr key={index} className=''>
                                                <td >{user._id}</td>
                                                <td className=''>{user.email}</td>
                                                <td >{user.phone}</td>
                                                <td >{user.address || 'Missing'}</td>

                                            </tr>
                                        )
                                    })
                                }
                               
                            </tbody>
                        </table>
                    </div>
                    <Pagination  onPageChange={onPageChange} entry={entry} currentPage={selectedPage} totalEntry={totalEntry}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default UserList 