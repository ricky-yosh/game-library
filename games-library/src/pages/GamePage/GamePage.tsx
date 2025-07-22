import { useParams, Link } from 'react-router-dom'
import { gamesLibrary } from '../../gameLibrary'
import { useRef, useState, useEffect } from 'react'
import './GamePage.css'

const base = import.meta.env.BASE_URL;

export default function GamePage() {
    const { gameId } = useParams()
    const gameFrameRef = useRef<HTMLIFrameElement | null>(null)
    const gamePlayerRef = useRef<HTMLDivElement | null>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const game = gamesLibrary.find(g => g.id === gameId)

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const toggleFullscreen = async () => {
        if (!gamePlayerRef.current) return

        try {
            if (!document.fullscreenElement) {
                await gamePlayerRef.current.requestFullscreen()
            } else {
                await document.exitFullscreen()
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error)
        }
    }

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
                    ref={gamePlayerRef}
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
                    
                    {/* Fullscreen Button */}
                    <button
                        onClick={toggleFullscreen}
                        className='fullscreen-btn'
                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                        {isFullscreen ? (
                            // Exit fullscreen icon
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0 2-2h3M3 16h3a2 2 0 0 0 2 2v3"/>
                            </svg>
                        ) : (
                            // Enter fullscreen icon
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                            </svg>
                        )}
                    </button>
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