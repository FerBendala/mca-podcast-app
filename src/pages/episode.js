import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'
import EpisodeDetail from '../components/episode-detail/episode-detail'

import PodcastInfo from '../components/podcast-info/podcast-info'

const Podcast = () => {
    // Get podcastId and episodeId from URL params
    // Inizialize state for episode detail
    // Get podcastDeatil from local storage and check if is valid data
    const { podcastId, episodeId } = useParams()
    const [episodeDetail, setEpisodeDetail] = useState( {} )
    let podcastDetail
    try {
        podcastDetail = useLocalStorageState( `podcast-${podcastId}` )[0]
    } catch ( error ) {
        console.error( `Error obtaining podcast data: ${error.message}` )
        podcastDetail = { episodes: [], podcastInfo: {} }
    }

    // Filter episodes to match current episodeId and set to state
    useEffect( () => {
        const filteredEpisode = podcastDetail.episodes.filter( ( episode ) =>
            episode.id === Number( episodeId )
        )
        setEpisodeDetail( filteredEpisode )
    }, [] )

    return (
        <section className='main__grid--in-layout'>
            <PodcastInfo podcastInfo={podcastDetail.podcastInfo} />
            <EpisodeDetail episodeDetail={episodeDetail} />
        </section>
    )
}

export default Podcast
