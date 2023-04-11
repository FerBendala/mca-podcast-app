import { Link } from 'react-router-dom'
import './podcast-info.scss'

const PodcastInfo = ( { podcastInfo = [] } ) => {
    return (
        <>
            {Array.isArray( podcastInfo ) && podcastInfo.length > 0
                && podcastInfo.map( ( { id, image, title, artist, summary } ) => (
                    <aside
                        key={id}
                        className='podcast-info'
                    >
                        <Link
                            to={`/podcast/${id}`}
                            className='podcast-info__image'
                        >
                            <img src={image} alt={title} title={title} />
                        </Link>
                        <div className='podcast-info__detail'>
                            <Link
                                to={`/podcast/${id}`}
                                className='podcast-info__detail__link'
                            >
                                {title}
                            </Link>
                            <p className='podcast-info__detail__artist'>by {artist}</p>
                        </div>
                        <div className='podcast-info__description'>
                            <h3 className='podcast-info__description__title'>Description:</h3>
                            <p className='podcast-info__description__text'>{summary}</p>
                        </div>
                    </aside>
                ) )
            }
        </>
    )
}
export default PodcastInfo
