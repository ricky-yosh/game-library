import { useParams, Link } from 'react-router-dom'
import { gameLibrary } from '../../gameLibrary'
import { useState, useEffect } from 'react'

const base = import.meta.env.BASE_URL;

export default function GamePage() {
    const { gameId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [gameStarted, setGameStarted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    
    const game = gameLibrary.find(g => g.id === gameId)

    useEffect(() => {
        // Simulate loading time or actual game loading
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [gameId])

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

    const handleStartGame = () => {
        setGameStarted(true)
        // Here you would initialize your Godot game
        // Example: if (window.godotEngine) { window.godotEngine.start() }
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
        // Implement actual fullscreen logic here
        // Example: document.getElementById('game-container').requestFullscreen()
    }

    const handleStopGame = () => {
        setGameStarted(false)
        // Here you would stop/cleanup your Godot game
    }

    if (isLoading) {
        return (
            <div className='page-content'>
                <Link to="/" className='back-link'>
                    ← Back to Games
                </Link>
                <div className='loading-container'>
                    <div className='loading-spinner'></div>
                    <p>Loading {game.title}...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='page-content'>
            <Link to="/" className='back-link'>
                ← Back to Games
            </Link>
            
            <div className='game-header'>
                <h1>{game.title}</h1>
                {game.description && <p className='game-description'>{game.description}</p>}
            </div>

            <div className={`game-container ${isFullscreen ? 'fullscreen' : ''}`}>
                <div className='game-player' style={{ 
                    width: isFullscreen ? '100vw' : (game.width || 800), 
                    height: isFullscreen ? '100vh' : (game.height || 600) 
                }}>
                    {!gameStarted ? (
                        <div className='game-start-screen'>
                            <div className='game-icon'>🎮</div>
                            <h3>{game.title}</h3>
                            <p>Ready to play!</p>
                            <div className='game-controls'>
                                <button 
                                    onClick={handleStartGame}
                                    className='start-button'
                                >
                                    Start Game
                                </button>
                                <button 
                                    onClick={toggleFullscreen}
                                    className='fullscreen-button'
                                >
                                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='game-running'>
                            {/* This is where your Godot game iframe/canvas would go */}
                            {game.gamePath ? (
                                <iframe
                                    src={`${base}${game.gamePath}/index.html`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen
                                    title={game.title}
                                />
                            ) : (
                                <div className='game-placeholder'>
                                    <div className='game-icon'>🎯</div>
                                    <p>Game Running</p>
                                    <p className='placeholder-text'>Your Godot game content goes here</p>
                                </div>
                            )}
                            
                            <div className='game-overlay-controls'>
                                <button 
                                    onClick={handleStopGame}
                                    className='stop-button'
                                >
                                    Stop Game
                                </button>
                                <button 
                                    onClick={toggleFullscreen}
                                    className='fullscreen-button'
                                >
                                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Game instructions */}
                <div className='game-instructions'>
                    <div className='instruction-item'>
                        <span>Controls: {game.controls || 'WASD or arrow keys to move'}</span>
                    </div>
                    <div className='instruction-item'>
                        <span>Press ESC for menu</span>
                    </div>
                </div>
            </div>

            {/* Game information section */}
            <div className='game-info'>
                <h3>About This Game</h3>
                <div className='game-info-grid'>
                    <div className='game-details'>
                        <h4>Game Details</h4>
                        <ul>
                            <li>Resolution: {game.width || 800}x{game.height || 600}</li>
                            <li>Engine: Godot</li>
                            <li>Genre: {game.genre || 'Action/Adventure'}</li>
                            <li>Controls: {game.controls || 'Keyboard & Mouse'}</li>
                        </ul>
                    </div>
                    <div className='game-instructions-detailed'>
                        <h4>How to Play</h4>
                        <ul>
                            <li>Use WASD or arrow keys to move</li>
                            <li>Click to interact with objects</li>
                            <li>Press ESC to pause the game</li>
                            <li>Collect items to progress</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}