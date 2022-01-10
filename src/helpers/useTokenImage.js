import { useEffect, useState } from 'react';
import { tokenFetchImage } from 'store/tokenFetch'

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
                    //console.log('loaded', url)
                }
            }
        }
        setImageLoaded(false)
        //console.log('not loaded', url)
        getImage(url)
    }, [ url ]);

    return { localImageUrl, imageLoaded }
}

