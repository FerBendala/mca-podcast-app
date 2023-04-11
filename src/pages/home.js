import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import Filter from '../components/filter/filter'
import PodcastsList from '../components/podcasts-list/podcasts-list'

import { isExpired } from '../utils/utils'
import iTunesService from '../services/itunes'

const Home = ( { isLoading, setIsLoading } ) => {
    const [podcastList, setPodcastList] = useLocalStorageState(
        'podcastList',
        { defaultValue: [] }
    ) // Local storage state
    const [expirationDate, setExpirationDate] = useLocalStorageState(
        'expirationDate',
        { defaultValue: '' }
    ) // Local storage state
    const [searchTerm, setSearchTerm] = useState( '' )
    const [filteredPodcastList, setFilteredPodcastList] = useState( [] )
    // Error state
    const [error, setError] = useState( null )

    // On load page
    useEffect( () => {
        fetchData()
    }, [] )

    // Fetch iTunes api podcast list data
    const fetchData = async () => {
        try {
            // If podcastDetail is empty or expirationDate is expired, make a new API call and update local storage
            if ( podcastList?.length === 0 || isExpired( expirationDate ) ) {
                setIsLoading( true )
                iTunesService
                    .getAll()
                    .then( ( response ) => {
                        // Updating local storage with new podcast list data and expiration date
                        const podcastsData = response
                        if ( !podcastsData || podcastsData.length === 0 ) {
                            setError( 'No episodes found for this podcast.' )
                            return
                        }
                        const podcastsModelData = podcastsListModel( podcastsData )
                        const currentDate = Date.now()

                        setPodcastList( podcastsModelData )
                        setExpirationDate( currentDate )
                        setFilteredPodcastList( podcastsModelData )
                        setIsLoading( false )
                    } )
            } else {
                setIsLoading( false )
                setFilteredPodcastList( podcastList )
            }
        } catch ( error ) {
            setIsLoading( false )
            setError( 'Failed to fetch podcast data.' )
        }
    }
    // Modeling the podcast list into a more understandable and usable format
    const podcastsListModel = ( podcastData ) => {
        const podcastsModel = podcastData.map( ( podcast ) => ( {
            id: podcast.id.attributes['im:id'],
            title: podcast.title.label,
            image: podcast['im:image'][2].label,
            artist: podcast['im:artist'].label,
            summary: podcast.summary.label,
        } ) )

        return podcastsModel
    }

    // Handle search filter
    const handleSearch = ( data ) => {
        const filteredList = podcastList.filter( ( podcast ) =>
            podcast.title.toLowerCase().includes( data.toLowerCase() )
        )

        setFilteredPodcastList( filteredList )
        setSearchTerm( data )
    }

    // Log error
    if ( error ) {
        console.error( error )
    }

    return (
        <>
            {!isLoading && (
                <>
                    <Filter
                        resultsNumber={filteredPodcastList.length}
                        searchTerm={searchTerm}
                        setSearchTerm={handleSearch}
                        text='Filter by something...'
                    />
                    <PodcastsList podcastsList={filteredPodcastList} />
                </>
            )}
        </>
    )
}

export default Home
