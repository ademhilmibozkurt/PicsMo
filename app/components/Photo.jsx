'use client'

import Image from "next/image"
import { useState } from "react"
import PhotoModal from "./PhotoModal"

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
                    <Image 
                        src={src}
                        alt={alt}
                        layout="fill"
                        style={{objectFit: 'cover', objectPosition: 'center'}}
                        onClick={() => setShowModal(true)}/>
            </div>
            {
                showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal}/>
            }
        </>
    )
}