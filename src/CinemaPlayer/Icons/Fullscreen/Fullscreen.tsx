import React, {FC} from 'react';
import {FullscreenExitIcon} from "./FullscreenExitIcon";
import {FullscreenOpenIcon} from "./FullscreenOpenIcon";

interface IFullscreen {
    isFullscreen: boolean
}

const Fullscreen: FC<IFullscreen> = (
    {
        isFullscreen
    }) => {
    return (
        <>
            {
                isFullscreen
                    ? (
                        <FullscreenExitIcon className={'cinema-player__fullscreen-exit-ico ico'}/>
                    )
                    : (
                        <FullscreenOpenIcon className={'cinema-player__fullscreen-open-ico ico'}/>
                    )
            }
        </>
    );
};

export {Fullscreen};