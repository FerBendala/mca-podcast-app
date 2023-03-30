import { Link } from 'react-router-dom'

const PodcastList = ( { podcastList = [] } ) =>
    <section>
        {
            Array.isArray( podcastList ) && podcastList.length > 0
                ? podcastList.map( ( { id, title, image, artist } ) => (
                    <div key={id}>
                        <Link to={`/podcast/${id}`}>
                            <img src={image} alt={title} title={title} />
                            <p>{title}</p>
                            <p>Author: {artist}</p>
                        </Link>
                    </div>
                ) )
                : <h2>No results...</h2>
        }
    </section>

export default PodcastList
