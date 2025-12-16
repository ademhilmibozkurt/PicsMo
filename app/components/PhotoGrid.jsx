import { supabaseServer } from "../utils/supabaseServerClient"

async function fetchUserPhotos(user)
{
    if (!user) return

    const folderPath    = `user_upload/${user.id}/`
    const {data, error} = await supabaseServer.storage.from('photos').list(folderPath)

    if (error)
    {
        console.error('Error fetching photos ', error)
        return
    }

    return data
}

async function getPhotoUrls(photos, user)
{
    return Promise.all(photos.map(async (photo) => 
    {
        const {data, error} = await supabaseServer.storage.from('photos').createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60)

        if (error)
        {
            console.error('Error generating signed url ', error)
            return null
        }

        return {url: data.signedUrl, photoName: photo.name}
    }))
}

export default async function PhotoGrid()
{
    const {data: {user}} = await supabaseServer.auth.getUser()
    const photos         = await fetchUserPhotos(user)
    const photoObjects   = await getPhotoUrls(photos, user)

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {
                photoObjects.map((photo) => 
                    <Photo
                        key={photo.photoName}
                        src={photo.url}
                        alt={`Photo ${photo.photoName}`}
                        width={200}
                        height={200}
                        photoName={photo.photoName}/>
                )
            }
        </div>
    )
}