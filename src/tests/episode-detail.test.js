import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import parse from 'html-react-parser'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import EpisodeDetail from '../components/episode-detail/episode-detail'

let episodeDetailData = [
    {
        id: 1000607956287,
        collectionId: 1535809341,
        title: 'Episode 616 | \'To Whom It May Concern\'',
        date: '2023-04-08T07:00:00Z',
        duration: 9526000,
        description: 'Hola mundo',
        preview: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_616.mp3?dest-id=2422538'
    }
]

describe( 'Episode detail component', () => {
    test( 'Renders the correct episode detail', () => {
        const component = render(
            <BrowserRouter>
                <EpisodeDetail episodeDetail={episodeDetailData} />
            </BrowserRouter>
        )

        const [title, description] = [episodeDetailData[0].title, episodeDetailData[0].description]

        const titleExists = component.getByText( title )
        const descriptionExists = screen.queryByText( parse( description ) )

        expect( titleExists ).toBeInTheDocument()
        expect( descriptionExists ).toBeInTheDocument()
    } )

    test( 'Renders the episode detail when navigated to', () => {
        const history = createMemoryHistory()
        const [id, title] = [episodeDetailData[0].id, episodeDetailData[0].title]

        history.push( `/episode/${id}` )

        const component = render(
            <Router location={history.location} navigator={history}>
                <EpisodeDetail episodeDetail={episodeDetailData} />
            </Router>
        )
        const titleExists = component.getByText( title )

        expect( titleExists ).toBeInTheDocument()
    } )
} )