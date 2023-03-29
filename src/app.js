import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Podcast from './pages/podcast'
import Episode from './pages/episode'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='podcast/:podcastId' element={<Podcast />} />
                <Route path='podcast/:podcastId/episode/:episodeId' element={<Episode />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
