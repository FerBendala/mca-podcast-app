import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'

import { isExpired } from '../utils/utils'
import iTunesService from '../services/itunes'

const Podcast = () => {
    const { podcastId } = useParams()
    const podcastList = useLocalStorageState( 'podcastList' )[0]
    const expirationDate = useLocalStorageState( 'expirationDate' )[0]
    const [podcastDetail, setPodcastDetail] = useLocalStorageState(
        `podcast-${podcastId}`,
        { defaultValue: [] }
    )

    useEffect( () => {
        if ( podcastDetail?.length === 0 || isExpired( expirationDate ) ) {
            iTunesService
                .getById( podcastId )
                .then( response => {
                    const episodeData = response
                    const episodeMapData = podcastDetailMap( episodeData )

                    setPodcastDetail( episodeMapData )
                } )
            console.log( `%cCalling podcastId: ${podcastId}...`, 'color: yellow' )
        }

        console.log( 'podcast.js podcastDetail:', podcastDetail )
    }, [podcastId] )

    const podcastDetailMap = ( episodeData ) => {
        const podcastInfo = podcastList.filter( ( podcast ) => podcast.id === podcastId && podcast )
        const episodes = episodeData.map( ( episode ) => ( {
            id: episode.trackId,
            collectionId: episode.collectionId,
            title: episode.trackName,
            date: episode.releaseDate,
            duration: episode.trackViewUrl,
            description: episode.description,
            preview: episode.previewUrl,
        } ) )

        // Remove outcontext first element
        episodes.shift()

        const map = {
            podcastInfo: podcastInfo,
            episodes: episodes
        }

        return map
    }

    return (
        <div>
            <h1>Detail Podcast</h1>
            {podcastDetail?.podcastInfo?.length
                ? podcastDetail.podcastInfo.map( ( podcast ) =>
                    <div key={podcast.id}>
                        <img src={podcast.image} alt={podcast.title} />
                        <p>name: {podcast.title}</p>
                        <p>collection id: {podcast.artist}</p>
                        <p>{podcast.summary}</p>
                    </div>
                ) : <p>Loading...</p>
            }
            <ol>
                {podcastDetail?.episodes?.length
                    ? podcastDetail.episodes.map( ( { id, collectionId, title } ) =>
                        <li key={id}>
                            <ul>
                                <li>collection id: {collectionId}</li>
                                <li>id: {id}</li>
                                <li>name: {title}</li>
                                <li>
                                    <Link to={`/podcast/${collectionId}/episode/${id}`}>View</Link>
                                </li>
                            </ul>
                        </li>
                    ) : <li>Loading...</li>
                }
            </ol>
        </div>
    )
}

export default Podcast
