export interface Game {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    gamePath: string;
    width: number;
    height: number;
}

export const gameLibrary = [
    {
        id: 'space-shooter',
        title: 'Space Shooter',
        description: 'A classic arcade-style space shooter game',
        thumbnail: 'https://via.placeholder.com/300x200/4a90e2/ffffff?text=Space+Shooter',
        gamePath: '/games/space-shooter', // Path to your Godot game files
        genre: 'Action',
        controls: 'Keyboard & Mouse',
        width: 800,
        height: 600,
    },
    {
        id: 'space-shooter',
        title: 'Space Shooter',
        description: 'A classic arcade-style space shooter game',
        thumbnail: 'https://via.placeholder.com/300x200/4a90e2/ffffff?text=Space+Shooter',
        gamePath: '/games/space-shooter', // Path to your Godot game files
        genre: 'Action',
        controls: 'Keyboard & Mouse',
        width: 800,
        height: 600,
    },
    {
        id: 'space-shooter',
        title: 'Space Shooter',
        description: 'A classic arcade-style space shooter game',
        thumbnail: 'https://via.placeholder.com/300x200/4a90e2/ffffff?text=Space+Shooter',
        gamePath: '/games/space-shooter', // Path to your Godot game files
        genre: 'Action',
        controls: 'Keyboard & Mouse',
        width: 800,
        height: 600,
    },
]