import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import Filter from '../components/filter/filter'
import PodcastList from '../components/podcasts-list/podcasts-list'

import { isExpired } from '../utils/utils'
import iTunesService from '../services/itunes'

const Home = ( { setIsLoading } ) => {
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

    // On load page
    useEffect( () => {
        // If podcastList is empty or expirationDate is expired, make a new API call
        if ( podcastList?.length === 0 || isExpired( expirationDate ) ) {
            setIsLoading( true )

            iTunesService.getAll().then( ( response ) => {
                // Updating local storage with new podcast list data and expiration date
                const podcastsData = response
                const podcastsModelData = podcastsListModel( podcastsData )
                const currentDate = Date.now()

                setPodcastList( podcastsModelData )
                setExpirationDate( currentDate )
                setFilteredPodcastList( podcastsModelData )
                setIsLoading( false )
            } )

            // Alert logging indicating that the API is being called
            console.log( '%cCalling iTunesService.getAll()...', 'color: yellow' )
        } else {
            setFilteredPodcastList( podcastList )
        }
    }, [] )

    const podcastsListModel = ( podcastData ) => {
        // Modeling the podcast list into a more understandable and usable format
        const podcastsModel = podcastData.map( ( podcast ) => ( {
            id: podcast.id.attributes['im:id'],
            title: podcast.title.label,
            image: podcast['im:image'][2].label,
            artist: podcast['im:artist'].label,
            summary: podcast.summary.label,
        } ) )

        return podcastsModel
    }

    const handleSearch = ( data ) => {
        const filteredList = podcastList.filter( ( podcast ) =>
            podcast.title.toLowerCase().includes( data.toLowerCase() )
        )

        setFilteredPodcastList( filteredList )
        setSearchTerm( data )
    }

    return (
        <>
            <Filter
                resultsNumber={filteredPodcastList.length}
                searchTerm={searchTerm}
                setSearchTerm={handleSearch}
                text='Filter by something...'
            />
            <PodcastList podcastList={filteredPodcastList} />
        </>
    )
}

export default Home
