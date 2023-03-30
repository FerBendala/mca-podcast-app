import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'
import EpisodeDetail from '../components/episode-detail'

import PodcastInfo from '../components/podcast-info'

const Podcast = () => {
    // Get podcastId and episodeId from URL params
    // Get podcastDeatil from local storage
    // Inizialize state for episode detail
    const { podcastId, episodeId } = useParams()
    const podcastDetail = useLocalStorageState( `podcast-${podcastId}` )[0]
    const [episodeDetail, setEpisodeDetail] = useState( {} )

    // Filter episodes to match current episodeId and set to state
    useEffect( () => {
        console.log( `episode.js episode ${episodeId}:`, podcastDetail.episodes )
        const filteredEpisode = podcastDetail.episodes.filter( ( episode ) =>
            episode.id === Number( episodeId )
        )
        setEpisodeDetail( filteredEpisode )
    }, [] )

    return (
        <div>
            <h1>Detail Podcast</h1>
            <PodcastInfo podcastInfo={podcastDetail.podcastInfo} />
            <EpisodeDetail episodeDetail={episodeDetail} />
        </div>
    )
}

export default Podcast
