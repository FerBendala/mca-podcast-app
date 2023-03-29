import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'

const Podcast = () => {
    const { podcastId, episodeId } = useParams()
    const [episodeDetail, setEpisodeDetail] = useState( {} )
    const podcastDetail = useLocalStorageState( `podcast-${podcastId}` )[0]

    useEffect( () => {
        const filteredEpisode = podcastDetail.episodes.filter( ( episode ) => episode.id === Number( episodeId ) )

        setEpisodeDetail( filteredEpisode )
        console.log( `episode.js episode ${episodeId}:`, podcastDetail.episodes )
    }, [] )

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

            {episodeDetail?.length
                ? episodeDetail.map( ( episode ) => (
                    <div key={episode.id}>
                        <p>{episode.title}</p>
                        <p>{episode.description}</p>
                        <audio src={episode.preview}>
                            Your browser does not support the <code>audio</code> element.
                        </audio>
                    </div>
                ) )
                : <li>Loading...</li>
            }
        </div>
    )
}

export default Podcast
