import parse from 'html-react-parser' // to parse html data in description

const EpisodeDetail = ( { episodeDetail = [] } ) =>
    <div>
        {Array.isArray( episodeDetail ) && episodeDetail.length > 0
            && episodeDetail.map( ( { id, title, description, preview } ) => (
                <div key={id}>
                    <p>{title}</p>
                    <p>{parse( description )}</p>
                    <audio src={preview} controls>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ) )
        }
    </div>
export default EpisodeDetail
