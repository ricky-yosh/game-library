import { gamesLibrary, type Game } from '../../gameLibrary'
import { useNavigate } from 'react-router-dom'
import "./HomePage.css"

const base = import.meta.env.BASE_URL;

export default function HomePage() {
    const navigate = useNavigate()

    const handleSelectGame = (game: Game) => {
        navigate(`/games/${game.id}`)
    }

    return (
        <div className='page-content'>
            <h2>New Games</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {gamesLibrary.map((game) => (
                    <button 
                        key={game.id} 
                        onClick={() => handleSelectGame(game)}
                        style={{ textDecoration: 'none', background: 'none', border: 'none', padding: 0 }}
                    >
                        <div className='card'>
                            {game.thumbnail && (
                                <img
                                    src={game.thumbnail.startsWith('http') ? game.thumbnail : `${base}${game.thumbnail.replace(/^\/+/, '')}`}
                                    alt={game.title}
                                    className='thumbnail-image'
                                />
                            )}
                            <h4>{game.title}</h4>
                            {game.description && (
                                <p className='card-description'>{game.description}</p>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}