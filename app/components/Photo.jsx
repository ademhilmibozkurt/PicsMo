'use client'

import Image from "next/image"
import { useState } from "react"
import PhotoModal from "./PhotoModal"
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material"
import { deletePhoto } from "../actions/deletePhoto"
import { addOrRemoveFromFavorites } from "../actions/addOrRemoveFromFavorites"

export default function Photo(props) {
    const 
    {
        src,
        alt,
        width,
        height,
        photoName,
        isFavorited: initialIsFavorited
    } = props

    const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div style={{ width, height }} className="relative shadow-md border rounded-lg overflow-hidden">
                <form action={deletePhoto} className="absolute bottom-2.5 right-10 z-10">
                    <input type="hidden" name="photoPath" value={src} />
                    <button type="submit">
                        <Delete />
                    </button>
                </form>

                <form action={async (formData) => {await addOrRemoveFromFavorites(formData);setIsFavorited(prev => !prev)}} className="absolute bottom-2.5 right-2.5 z-10">
                    <input type="hidden" name="photoName" value={photoName} />
                    <input type="hidden" name="wasFavorited" value={isFavorited ? "true" : "false"}/>

                    <button type="submit">
                        {isFavorited ? <Favorite /> : <FavoriteBorder />}
                    </button>
                </form>

                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    onClick={() => setShowModal(true)}
                    />
            </div>

            {showModal && <PhotoModal src={src} alt={alt} />}
        </>
    )
}