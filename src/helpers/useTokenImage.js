import { useEffect, useState } from 'react';
import { tokenFetchImage } from 'network/tokenFetch'

export default function useTokenImage(url) {
    
    const [ localImageUrl, setLocalImageUrl] = useState(undefined)
    const [ imageLoaded, setImageLoaded ] = useState(false)

    useEffect(()=> {

        const getImage = async (url) => {
            if (url) {
                const result = await tokenFetchImage(url)
                if (result) {
                    setLocalImageUrl(result)
                    setImageLoaded(true)
                }
            }
        }
        setImageLoaded(false)
        //console.log('not loaded', url)
        getImage(url)
    }, [ url ]);

    return { localImageUrl, imageLoaded }
}

