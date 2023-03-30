import { Link } from 'react-router-dom'

const PodcastEpisodes = ( { podcastEpisodes = [] } ) =>
    <div>
        <p>Episodes: {podcastEpisodes.length}</p>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray( podcastEpisodes ) && podcastEpisodes.length > 0
                    && podcastEpisodes.map( ( { id, collectionId, title, date, duration } ) => (
                        <tr key={id}>
                            <td>
                                <Link
                                    to={`/podcast/${collectionId}/episode/${id}`}
                                    aria-label={`View episode ${title}`}
                                >
                                    {title}
                                </Link>
                            </td>
                            <td>{date}</td>
                            <td>{duration}</td>
                        </tr> ) )
                }
            </tbody>
        </table>
    </div>


export default PodcastEpisodes
