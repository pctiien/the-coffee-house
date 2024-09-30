const Header = () => {
    return (
        <div className="w-full px-8">
            <div className="p-3 w-full flex justify-between gap-5 items-center">
                <div className='flex border p-3 rounded-xl justify-between flex-1'>
                    <input type="text" placeholder="Search here" />
                    <img className='w-6 h-6' src='./search.png' alt="" />
                </div>
                <div className='w-10 h-10 flex rounded-full bg-gray-200 justify-center items-center'>
                    <img className='w-6 h-6' src="./dark-mode.png" alt="" />
                </div>
                <div className='w-10 h-10 flex rounded-full bg-gray-200 justify-center items-center'>
                    <img className='w-6 h-6' src="./notification.png" alt="" />
                </div>
                <div className='flex items-center justify-center'>
                    <div className='w-10 h-10 flex rounded-full bg-gray-200 justify-center items-center'>
                        <img className='w-full p-1' src="./avatar.png" alt="" />
                    </div>
                    <div className='p-2'>
                        <h1>Kristine Watson</h1>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
