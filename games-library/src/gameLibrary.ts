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
        description: 'A classic arcade-style space shooter game',
        thumbnail: './games/project-boost/project-boost.png',
        gamePath: 'games/project-boost',
        genre: 'Action',
        controls: 'A - Left, D - Right, Spacebar - Thrust',
        aspectRatio: "16/9",
        githubLink: 'https://github.com/ricky-yosh/project-boost',
    },
]