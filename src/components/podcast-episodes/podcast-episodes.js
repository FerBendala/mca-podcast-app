import { Link } from 'react-router-dom'
import { formatDate, formatMiliseconds } from '../../utils/utils'

import './podcast-episodes.scss'

const PodcastEpisodes = ( { podcastEpisodes = [] } ) => {
    return (
        <>
            {Array.isArray( podcastEpisodes ) && podcastEpisodes.length > 0 && (
                <div className='podcast-episodes'>
                    <div className='podcast-episodes__number'>
                        Episodes: {podcastEpisodes.length}
                    </div>
                    <div className='podcast-episodes__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {podcastEpisodes.map( ( { id, collectionId, title, date, duration } ) => (
                                    <tr key={id}>
                                        <td>
                                            <Link
                                                to={`/podcast/${collectionId}/episode/${id}`}
                                                aria-label={`View episode ${title}`}
                                            >
                                                {title}
                                            </Link>
                                        </td>
                                        <td>{formatDate( date )}{ }</td>
                                        <td>{formatMiliseconds( duration )}</td>
                                    </tr>
                                ) )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </> )
}


export default PodcastEpisodes
