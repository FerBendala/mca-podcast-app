import { Link } from 'react-router-dom'
import './podcasts-list.scss'

const PodcastList = ( { podcastList = [] } ) =>
    <section className='podcast-list'>
        {Array.isArray( podcastList ) && podcastList.length > 0
            && podcastList.map( ( { id, title, image, artist } ) => (
                <article
                    key={id}
                    className='podcast-list__item'
                >
                    <Link
                        to={`/podcast/${id}`}
                        className='podcast-list__item__link'
                    >
                        <img
                            src={image}
                            alt={title}
                            title={title}
                            className='link__image'
                        />
                        <p className='link__title'>{title}</p>
                        <p className='link__author'>Author: {artist}</p>
                    </Link>
                </article>
            ) )
        }
    </section>

export default PodcastList
