import { useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { Link } from 'react-router-dom'

import { isExpired } from '../utils/utils'
import iTunesService from '../services/itunes'

const Home = () => {
    const [podcastList, setPodcastList] = useLocalStorageState(
        'podcastList',
        { defaultValue: [] }
    )
    const [expirationDate, setExpirationDate] = useLocalStorageState(
        'expirationDate',
        { defaultValue: '' }
    )

    useEffect( () => {
        if ( podcastList?.length === 0 || isExpired( expirationDate ) ) {
            iTunesService.getAll().then( ( response ) => {
                const podcastData = response
                const podcastMapData = podcastListMap( podcastData )
                const currentDate = Date.now()

                setPodcastList( podcastMapData )
                setExpirationDate( currentDate )
            } )

            console.log( '%cCalling getAll()...', 'color: yellow' )
        }
        console.log( 'home.js podcastList:', podcastList )
    }, [podcastList] )

    const podcastListMap = ( podcastData ) => {
        const map = podcastData.map( ( podcast ) => ( {
            id: podcast.id.attributes['im:id'],
            title: podcast.title.label,
            image: podcast['im:image'][2].label,
            artist: podcast['im:artist'].label,
            summary: podcast.summary.label,
        } ) )

        return map
    }

    return (
        <div>
            <h1>Home</h1>
            <ol>
                {podcastList?.length
                    ? podcastList.map( ( { id, title, image, artist } ) => (
                        <li key={title}>
                            <Link to={`/podcast/${id}`}>
                                <ul>
                                    <li>
                                        <img src={image} alt={title} />
                                    </li>
                                    <li>{title}</li>
                                    <li>Author: {artist}</li>
                                </ul>
                            </Link>
                        </li>
                    ) )
                    : <li>Loading...</li>
                }
            </ol>
        </div>
    )
}

export default Home
