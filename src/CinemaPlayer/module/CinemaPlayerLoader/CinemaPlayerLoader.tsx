import { FC } from 'react';

import './CinemaPlayerLoader.css';

interface ICinemaPlayerLoader {
    isLoading: boolean;
}

const CinemaPlayerLoader: FC<ICinemaPlayerLoader> = (
    {
        isLoading,
    }) => {
    return (
        <>
            {
                isLoading && (
                    <div className={'cinema-player__loader'}></div>
                )
            }
        </>
    );
};

export { CinemaPlayerLoader };

