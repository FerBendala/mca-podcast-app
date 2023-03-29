## app.js
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/layout'
import Home from './pages/home'
import DetailPodcast from './pages/detail-podcast'
import DetailChapter from './pages/detail-chapter'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='detail-podcast/:id' element={<DetailPodcast />} />
                    <Route path='detail-chapter' element={<DetailChapter />} />
                    <Route path='*' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
```

## home.js
```javascript
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import iTunesService from '../services/itunes'

const Home = () => {
    const [podcastList, setPodcastList] = useState( [] )

    useEffect( () => {
        iTunesService
            .getAll()
            .then( response => {
                const data = response
                setPodcastList( data )
            } )
    }, [] )

    return (
        <div>
            <h1>Home</h1>
            <ol>
                {podcastList.length
                    ? podcastList.map( ( item ) => {
                        console.log(item)
                        return (
                            <li key={item.title.label}>
                                <Link to={`detail-podcast/${item.id.attributes['im:id']}`}>
                                    {item.title.label}
                                </Link>
                            </li>
                        )
                    } )
                    : <li>Loading...</li>
                }
            </ol>
        </div>
    )
}

export default Home
```

## detail-podcast.js
```javascript
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import iTunesService from '../services/itunes'

const DetailPodcast = () => {
    const { id } = useParams()
    const [podcastDetail, setPodcastDetail] = useState( null )

    useEffect( () => {
        iTunesService
            .getById( id )
            .then( response => {
                const data = response
                setPodcastDetail( data )
            } )
            .catch( error => {
                console.error( error )
                setPodcastDetail( null )
            } )
    }, [id] )

    if ( !podcastDetail ) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Detail Podcast</h1>
            <ul>
                <li>{podcastDetail.artistName}</li>
                <li>{podcastDetail.collectionName}</li>
                <li>{podcastDetail.primaryGenreName}</li>
            </ul>
        </div>
    )
}

export default DetailPodcast
```


## --
```json
{
        "im:name": {
            "label": "Song Exploder"
        },
        "im:image": [
            {
                "label": "https://is4-ssl.mzstatic.com/image/thumb/Podcasts116/v4/30/1c/1f/301c1f05-639c-bb22-cfdd-4c71aca5761e/mza_3479668065976336868.png/55x55bb.png",
                "attributes": {
                    "height": "55"
                }
            },
            {
                "label": "https://is3-ssl.mzstatic.com/image/thumb/Podcasts116/v4/30/1c/1f/301c1f05-639c-bb22-cfdd-4c71aca5761e/mza_3479668065976336868.png/60x60bb.png",
                "attributes": {
                    "height": "60"
                }
            },
            {
                "label": "https://is3-ssl.mzstatic.com/image/thumb/Podcasts116/v4/30/1c/1f/301c1f05-639c-bb22-cfdd-4c71aca5761e/mza_3479668065976336868.png/170x170bb.png",
                "attributes": {
                    "height": "170"
                }
            }
        ],
        "summary": {
            "label": "Song Exploder is a podcast where musicians take apart their songs, and piece by piece, tell the story of how they were made. Each episode features an artist discussing a song of theirs, breaking down the sounds and ideas that went into the writing and recording. Hosted and produced by Hrishikesh Hirway."
        },
        "im:price": {
            "label": "Get",
            "attributes": {
                "amount": "0",
                "currency": "USD"
            }
        },
        "im:contentType": {
            "attributes": {
                "term": "Podcast",
                "label": "Podcast"
            }
        },
        "rights": {
            "label": "© Translucence"
        },
        "title": {
            "label": "Song Exploder - Hrishikesh Hirway"
        },
        "link": {
            "attributes": {
                "rel": "alternate",
                "type": "text/html",
                "href": "https://podcasts.apple.com/us/podcast/song-exploder/id788236947?uo=2"
            }
        },
        "id": {
            "label": "https://podcasts.apple.com/us/podcast/song-exploder/id788236947?uo=2",
            "attributes": {
                "im:id": "788236947"
            }
        },
        "im:artist": {
            "label": "Hrishikesh Hirway",
            "attributes": {
                "href": "https://podcasts.apple.com/us/artist/radiotopia/850139119?uo=2"
            }
        },
        "category": {
            "attributes": {
                "im:id": "1310",
                "term": "Music",
                "scheme": "https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2",
                "label": "Music"
            }
        },
        "im:releaseDate": {
            "label": "2023-03-22T10:18:00-07:00",
            "attributes": {
                "label": "March 22, 2023"
            }
        }
    }
```