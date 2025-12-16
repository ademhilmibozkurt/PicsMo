'use client'

import { useState } from "react"
import { supabase } from "../utils/supabaseClient"

export default function PhotoUploader()
{
    const [uploading, setUploading] = useState(false)
    console.log(`const: ${uploading} ${setUploading}`)

    async function handleFileUpload(event)
    {
        console.log(`function: ----`)
        try
        {
            setUploading(true)
            console.log(`try: ${setUploading}`)

            const file           = event.target.files?.[0]
            const fileExt        = file.name.split('.').pop()
            const fileName       = `${Math.random()}.${fileExt}`
            const {data: {user}} = await supabase.auth.getUser()
            console.log(`file: ${fileName} ${fileExt}`)

            if (!user)
            {
                throw new Error("User not authenticated for photo upload!")
            }

            const filePath = `user_uploads/${user.id}/${fileName}`
            const {error}  = await supabase.storage.from('photos').upload(filePath, file)
            console.log(`filePath: ${filePath}`)

            if (error)
            {
                throw error
            }
        }
        catch(err)
        {
            console.error(err)
        }
        finally
        {
            setUploading(false)
        }
    }

    console.log(`return: ${setUploading}`)

    return (
        <label 
            htmlFor="photo-upload"
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg m-4">
            {console.log('label: ---')}
            {uploading ? 'Uploading...': 'Upload Photo'}
            {console.log('label: uploading')}
            <input
                type="file"
                id="photo-upload"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"/>
        </label>
    )
}