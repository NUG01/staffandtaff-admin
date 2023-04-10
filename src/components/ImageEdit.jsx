import { useRef } from "react"

export default function ImageEdit({modal, src, imageToReplace}){

    const imageReference = useRef()
    function editModal(data){
        modal.classList.remove('hidden')
        modal.classList.add('flex')
        modal.querySelector('img').src = imageReference.current.src
        imageToReplace.current = imageReference.current
    }

    return(
        <div className="p-[10px] sm:w-[calc(20%)] w-full relative flex items-center justify-center">
            <i className="fa-solid fa-pen text-white absolute right-[20px] top-[20px] bg-black w-[30px] h-[30px] flex justify-center items-center rounded-full text-[13px] cursor-pointer" onClick={()=> editModal()}></i>
            <img src={src} alt="" className="w-full object-contain" ref={imageReference}/>
        </div>
    )
}