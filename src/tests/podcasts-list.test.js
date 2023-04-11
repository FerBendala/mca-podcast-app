import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'

import PodcastsList from '../components/podcasts-list/podcasts-list'

let podcastsListData = [
    {
        id: '1535809341',
        title: 'The Joe Budden Podcast - The Joe Budden Network',
        image: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png',
        artist: 'The Joe Budden Network',
        summary: 'Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends.'
    },
    {
        id: '1311004083',
        title: 'Broken Record with Rick Rubin, Malcolm Gladwell, Bruce Headlam and Justin Richmond - Pushkin Industries',
        image: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts112/v4/7b/12/d5/7b12d5ec-7264-6693-8a8e-e6b414a783c3/mza_10388338206053029687.jpg/170x170bb.png',
        artist: 'Pushkin Industries',
        summary: 'From Rick Rubin, Malcolm Gladwell, Bruce Headlam, and Justin Richmond. The musicians you love talk about their life, inspiration, and craft. Then play. iHeartMedia is the exclusive podcast partner of Pushkin Industries.'
    }
]

describe( 'Podcasts list component', () => {
    test( 'Renders the podcasts list', () => {
        const component = render(
            <BrowserRouter>
                <PodcastsList podcastsList={podcastsListData} />
            </BrowserRouter>
        )

        for ( let item in podcastsListData ) {
            const [title, artist] = [podcastsListData[item].title, podcastsListData[item].artist]

            const imageExists = component.getByAltText( title )
            const titleExists = component.getByText( title )
            const artistExists = component.getByText( `Author: ${artist}` )

            expect( imageExists ).toBeInTheDocument()
            expect( titleExists ).toBeInTheDocument()
            expect( artistExists ).toBeInTheDocument()
        }
    } )

    test( 'Renders the correct link to podcast detail', () => {
        const component = render(
            <BrowserRouter>
                <PodcastsList podcastsList={podcastsListData} />
            </BrowserRouter>
        )

        const [title, id] = [podcastsListData[0].title, podcastsListData[0].id]
        const podcastLink = component.getByText( title ).closest( 'a' )

        expect( podcastLink ).toHaveAttribute( 'href', `/podcast/${id}` )
    } )

    test( 'Clicking the podcast link navigates to correct page', () => {
        const history = createMemoryHistory()
        const component = render(
            <Router location={history.location} navigator={history}>
                <PodcastsList podcastsList={podcastsListData} />
            </Router>
        )

        const [title, id] = [podcastsListData[1].title, podcastsListData[1].id]

        const podcastLink = component.getByText( title ).closest( 'a' )
        fireEvent.click( podcastLink )

        expect( history.location.pathname ).toEqual( `/podcast/${id}` )
    } )
} )