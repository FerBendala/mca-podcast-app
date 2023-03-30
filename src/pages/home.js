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
        console.log( 'home.js podcastList:', podcastList )

        // If podcastList is empty or expirationDate is expired, make a new API call
        if ( podcastList?.length === 0 || isExpired( expirationDate ) ) {
            setIsLoading( true )

            iTunesService.getAll().then( ( response ) => {
                // Updating local storage with new podcast list data and expiration date
                const podcastData = response
                const podcastMapData = podcastListModel( podcastData )
                const currentDate = Date.now()

                setPodcastList( podcastMapData )
                setExpirationDate( currentDate )
                setFilteredPodcastList( podcastMapData )
                setIsLoading( false )
            } )

            // Alert logging indicating that the API is being called
            console.log( '%cCalling iTunesService.getAll()...', 'color: yellow' )
        } else {
            setFilteredPodcastList( podcastList )
        }
    }, [] )

    const podcastListModel = ( podcastData ) => {
        // Modeling the podcast list into a more understandable and usable format
        const map = podcastData.map( ( podcast ) => ( {
            id: podcast.id.attributes['im:id'],
            title: podcast.title.label,
            image: podcast['im:image'][2].label,
            artist: podcast['im:artist'].label,
            summary: podcast.summary.label,
        } ) )

        return map
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
