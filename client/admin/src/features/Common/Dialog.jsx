import React from 'react'

const Dialog = ({isOpen,message,onSave,onClose})=>{

    const dialog = React.useRef(null)

    const handleSave =()=>{
        onSave()
        onClose()
    }

    // Handle close dialog when click outside 
    React.useEffect(()=>{

        const handleClickOutside = (e) =>{
            if(dialog.current && !dialog.current.contains(e.target))
            {
                onClose()
            }
        }

        document.addEventListener('mousedown',handleClickOutside)

        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }

    },[onClose])

    if(!isOpen) return null

    return (
        <>
        <div className="fixed inset-0 bg-black opacity-25">
        </div>
        <div className="fixed inset-0 flex justify-center items-center">
            <div 
            ref={dialog}
            className="bg-white rounded-lg p-5 flex flex-col gap-5">
                <div className="">
                    {message}
                </div>
                <div className="flex justify-end gap-2 text-white  ">
                    <button
                    onClick={handleSave}
                    className="bg-green-500 rounded-lg p-2 px-5"
                    >Save</button>
                    <button
                    onClick={onClose}
                    className="bg-gray-500 rounded-lg p-2 px-5"
                    >Close</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dialog 