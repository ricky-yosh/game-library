import { useParams, Link } from 'react-router-dom'
import { gameLibrary } from '../../gameLibrary'
import { useRef } from 'react'
import './GamePage.css'

const base = import.meta.env.BASE_URL;

export default function GamePage() {
    const { gameId } = useParams()
    const gameFrameRef = useRef<HTMLIFrameElement | null>(null)

    const game = gameLibrary.find(g => g.id === gameId)


    if (!game) {
        return (
            <div className='page-content'>
                <h2>Game Not Found</h2>
                <p>The game you're looking for doesn't exist.</p>
                <Link to="/" className='back-link'>
                    ← Back to Games
                </Link>
            </div>
        )
    }

    return (
        <div className='page-content'>
            <Link to="/" className='back-link'>← Back to Games</Link>

            <div className='game-header'>
                <h1>{game.title}</h1>
                {game.description && <p className='game-description'>{game.description}</p>}
            </div>

            <div className='game-container'>
                <div
                    className='game-player'
                    style={{
                        aspectRatio: game.aspectRatio,
                        width: '100%',
                        maxWidth: 960,
                        backgroundColor: '#000',
                        position: 'relative',
                    }}
                >
                    <iframe
                        ref={gameFrameRef}
                        src={`${base}${game.gamePath}/${game.id}.html`}
                        width="100%"
                        height="100%"
                        allowFullScreen
                        title={game.title}
                        loading="eager"
                        style={{ border: '0' }}
                    />
                </div>
            </div>

            <div className='game-info'>
                <h3>About This Game</h3>
                <div className='game-info-grid'>
                    <div className='game-details'>
                        <ul>
                            <li>Engine: Godot</li>
                            <li>Aspect Ratio: {game.aspectRatio?.replace('/', ':') || 'N/A'}</li>
                            <li>Controls: {game.controls || 'Keyboard & Mouse'}</li>
                            {game.githubLink && (
                                <li>
                                    <a href={game.githubLink} target="_blank" rel="noopener noreferrer">
                                        View project on GitHub
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}