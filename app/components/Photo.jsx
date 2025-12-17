'use client'

import Image from "next/image"
import { useState } from "react"
import PhotoModal from "./PhotoModal"
import { Delete } from "@mui/icons-material"
import { deletePhoto } from "../actions/deletePhoto"

export default function Photo({src, alt, width, height, photoName, isFavorited=false})
{
    const [showModal, setShowModal] = useState(false)

    function toggleModal()
    {
        setShowModal(!showModal)
    }

    return (
        <>
            <div 
                style={{width, height}}
                className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer">
                    
                    <form action={deletePhoto} className="absolute bottom-2.5 right-10 z-10">
                        <input type="hidden" name="photoPath" value={src}/>
                        <button type="submit" className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300">
                            <Delete/>
                        </button>
                    </form>

                    <Image 
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        style={{objectFit: 'cover', objectPosition: 'center'}}
                        onClick={() => setShowModal(true)}/>
            </div>
            {
                showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal}/>
            }
        </>
    )
}