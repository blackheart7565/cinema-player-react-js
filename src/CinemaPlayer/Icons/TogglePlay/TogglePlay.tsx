import React, {FC} from 'react';
import {PausedIcon} from "./PausedIcon";
import {PlayIcon} from "./PlayIcon";

interface ITogglePlay {
    isPlay: boolean
}

const TogglePlay: FC<ITogglePlay> = (
    {
        isPlay
    }) => {
    return (
        <>
            {
                isPlay
                    ? (
                        <PlayIcon className={'cinema-player__play-ico ico'}/>
                    )
                    : (
                        <PausedIcon className={'cinema-player__paused-ico ico'}/>
                    )
            }
        </>
    );
};

export {TogglePlay};