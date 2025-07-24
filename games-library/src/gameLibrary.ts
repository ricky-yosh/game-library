export interface Game {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    gamePath: string;
    aspectRatio: string;
    githubLink: string;
}

export const gamesLibrary = [
    {
        id: 'project-boost',
        title: 'Project Boost',
        description: 'Land the rocket on the pad!',
        thumbnail: './games/project-boost/project-boost.png',
        gamePath: 'games/project-boost',
        genre: 'Puzzle',
        controls: 'A - Left, D - Right, Spacebar - Thrust',
        aspectRatio: "16/9",
        githubLink: 'https://github.com/ricky-yosh/project-boost',
    },
    {
        id: 'barbarian-blaster',
        title: 'Barbarian Blaster',
        description: 'A classic tower defense game!',
        thumbnail: './games/barbarian-blaster/barbarian-blaster.png',
        gamePath: 'games/barbarian-blaster',
        genre: 'Tower Defense',
        controls: 'Click to place turret',
        aspectRatio: "16/9",
        githubLink: 'https://github.com/ricky-yosh/barbarian-blaster',
    },
]