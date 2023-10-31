import React, {ChangeEvent, useState} from 'react';

import {TogglePlay} from "../Icons/TogglePlay/TogglePlay";
import {Fullscreen} from "../Icons/Fullscreen/Fullscreen";
import {SettingsIcon} from "../Icons/SettingsIcon";
import {PictureInPictureIcon} from "../Icons/PictureInPictureIcon";
import {VolumeIcon} from "../Icons/Volume/VolumeIcon";
import {CustomVolumeRange} from "./CustomVolumeRange/CustomVolumeRange";

interface ControlsNavigationProps {
    isPlay: boolean,
    currentTime: number,
    durationTime: number,
    isFullscreen: boolean,
    isFastRewindForwardBtn?: boolean,
    setVolumeToVideoCallback: (volumeValue: number) => void
    togglePlay: () => void,
    onFullscreen: () => Promise<void>
    onTogglePictureInPicture: () => Promise<void>
}

interface IVolumeTypes {
    currentVolume: number,
    prevVolume: number,
}

const ControlsNavigation = (
    {
        isPlay
        , currentTime
        , durationTime
        , setVolumeToVideoCallback
        , togglePlay
        , isFullscreen
        , isFastRewindForwardBtn
        , onFullscreen
        , onTogglePictureInPicture
    }: ControlsNavigationProps) => {
    const [volume, setVolume] = useState<IVolumeTypes>({
        currentVolume: 100,
        prevVolume: 0
    });

    const timeConvertor = (time: number | string): (number | string) => {
        if (typeof time === "string") {
            time = parseInt(time, 10);
        }
        const loadingZeroFormat = new Intl.NumberFormat(undefined, {
            minimumIntegerDigits: 2
        })

        const totalMinutes = Math.floor(time / 60);
        const totalSeconds = Math.floor(time % 60);
        const totalHours = Math.floor(time / 3600);

        return totalHours === 0
            ? `${loadingZeroFormat.format(totalMinutes)}:${loadingZeroFormat.format(totalSeconds)}`
            : `${loadingZeroFormat.format(totalHours)}:${loadingZeroFormat.format(totalMinutes)}:${loadingZeroFormat.format(totalSeconds)}`;
    }
    const onVolumeUpAndOffHandler = () => {

        if (volume.currentVolume > 0) {
            setVolume({
                ...volume
                , prevVolume: volume.currentVolume
                , currentVolume: 0
            })
            setVolumeToVideoCallback(0);
        } else {
            setVolume({...volume, currentVolume: volume.prevVolume})
            setVolumeToVideoCallback(volume.prevVolume / 100);
        }
    }
    const onChangeVolumeRange = (e: ChangeEvent<HTMLInputElement>) => {
        let volumeVideo: number = parseInt(e.target.value, 10)
        setVolume({...volume, currentVolume: volumeVideo})
        setVolumeToVideoCallback(volumeVideo / 100)
    }

    return (
        <>
            <div className={'cinema-player__controls-menu'}>

                <div className="cinema-player__controls-left">

                    <button
                        className={'cinema-player__toggle-play button-nav'}
                        onClick={togglePlay}
                    >
                        <TogglePlay isPlay={isPlay}/>
                    </button>

                    <div className="cinema-player__volume-range">
                        <button
                            className="cinema-player__volume-range-btn button-nav"
                            onClick={onVolumeUpAndOffHandler}
                        >
                            <VolumeIcon valueVolume={volume.currentVolume}/>
                        </button>
                        <CustomVolumeRange
                            value={volume.currentVolume}
                            onChange={onChangeVolumeRange}
                        />
                    </div>
                    <div className="cinema-player__timer">
                            <span className="cinema-player__timer-current">
                                {
                                    timeConvertor(currentTime)
                                }
                            </span>
                        <span className={"cinema-player__trait"}> / </span>
                        <span className="cinema-player__timer-duration">
                                {
                                    timeConvertor(durationTime)
                                }
                            </span>
                    </div>

                </div>

                <div className="cinema-player__controls-right">
                    {
                        !isFullscreen && (
                            <button
                                className={'cinema-player__picture-in-picture button-nav'}
                                onClick={onTogglePictureInPicture}
                            >
                                <PictureInPictureIcon/>
                            </button>
                        )
                    }
                    <button className={'cinema-player__settings button-nav'}>
                        <SettingsIcon/>
                    </button>
                    <button
                        className={'cinema-player__fullscreen button-nav'}
                        onClick={onFullscreen}
                    >
                        <Fullscreen isFullscreen={isFullscreen}/>
                    </button>
                </div>

            </div>
        </>
    );
};

export {ControlsNavigation};