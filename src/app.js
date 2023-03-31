import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/layout'
import Home from './pages/home'
import Podcast from './pages/podcast'
import Episode from './pages/episode'

import './app.scss'


const App = () => {
    // Set loading state when api are called
    const [isLoading, setIsLoading] = useState( false )

    return (
        <BrowserRouter>
            <Routes>
                {/* App Header */}
                <Route path="/"
                    element={
                        <Layout isLoading={isLoading} />
                    }
                >
                    {/* App Content */}
                    <Route index
                        element={
                            <Home setIsLoading={( value ) => setIsLoading( value )} />
                        }
                    />
                    <Route path='podcast/:podcastId'
                        element={
                            <Podcast setIsLoading={( value ) => setIsLoading( value )} />
                        }
                    />
                    <Route path='podcast/:podcastId/episode/:episodeId'
                        element={<Episode />}
                    />
                    <Route path='*'
                        element={<Home />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
