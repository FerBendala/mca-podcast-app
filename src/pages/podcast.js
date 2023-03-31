import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'

import { isExpired } from '../utils/utils'
import iTunesService from '../services/itunes'
import PodcastInfo from '../components/podcast-info/podcast-info'
import PodcastEpisodes from '../components/podcast-episodes/podcast-episodes'

const Podcast = ( { setIsLoading } ) => {
    // Get podcast id from URL params
    const { podcastId } = useParams()
    // Get the podcast list, expiration date and detail from local storage
    const podcastList = useLocalStorageState( 'podcastList' )[0]
    const expirationDate = useLocalStorageState( 'expirationDate' )[0]
    const [podcastDetail, setPodcastDetail] = useLocalStorageState(
        `podcast-${podcastId}`,
        { defaultValue: [] }
    )
    // Error state
    const [error, setError] = useState( null )

    useEffect( () => {
        fetchData()
    }, [] )

    // Fetch iTunes api podcast detail data
    const fetchData = async () => {
        try {
            // If podcastDetail is empty or expirationDate is expired, make a new API call and update local storage
            if ( podcastDetail?.length === 0 || isExpired( expirationDate ) ) {
                setIsLoading( true )
                iTunesService
                    .getById( podcastId )
                    .then( response => {
                        const episodeData = response
                        if ( !episodeData || episodeData.length === 0 ) {
                            setError( 'No episodes found for this podcast.' )
                            return
                        }
                        const episodeModelData = podcastModel( episodeData, podcastId )

                        setPodcastDetail( episodeModelData )
                        setIsLoading( false )
                    } )
                console.log( `%cCalling iTunesService.getById(): ${podcastId}...`, 'color: yellow' )
            }
        } catch ( error ) {
            setError( 'Failed to fetch podcast data.' )
        }
    }

    // Modeling the podcast data into a more understandable and usable format
    const podcastModel = ( episodeData, id ) => {
        const podcastInfo = podcastList.filter( ( podcast ) => podcast.id === id )
        if ( !podcastInfo ) {
            console.log( `No podcast found with id ${id}` )
            return null
        }

        const episodes = episodeData.map( ( episode ) => ( {
            id: episode.trackId,
            collectionId: episode.collectionId,
            title: episode.trackName,
            date: episode.releaseDate,
            duration: episode.trackTimeMillis,
            description: episode.description,
            preview: episode.previewUrl,
        } ) )
        episodes.shift() // Remove the first element of episodes (is invalid data)

        // Creating an object with mapped podcast detail data
        const episodesModel = {
            podcastInfo: podcastInfo,
            episodes: episodes
        }

        return episodesModel
    }

    // Log error
    if ( error ) {
        console.log( error )
    }

    return (
        <section className='main__grid--in-layout'>
            <PodcastInfo podcastInfo={podcastDetail.podcastInfo} />
            <PodcastEpisodes podcastEpisodes={podcastDetail.episodes} />
        </section>
    )
}

export default Podcast
