import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const PodcastInfo = ( { podcastInfo = [] } ) => {
    const { podcastId } = useParams()

    return (
        <div>
            {Array.isArray( podcastInfo ) && podcastInfo.length > 0
                && podcastInfo.map( ( { id, image, title, artist, summary } ) => (
                    <div key={id}>
                        <Link to={`/podcast/${podcastId}`}>
                            <img src={image} alt={title} title={title} />
                        </Link>
                        <Link to={`/podcast/${podcastId}`}>
                            {title}
                        </Link>
                        <br />
                        by {artist}<br />
                        Description: <br />
                        {summary}
                        <hr />
                    </div>
                ) )
            }
        </div>
    )
}
export default PodcastInfo
