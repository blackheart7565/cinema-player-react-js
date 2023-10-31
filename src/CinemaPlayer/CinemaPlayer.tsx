import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react'

import './CinemaPlayer.scss'
import { usePiP } from './PiP/hook/usePiP'
import { ICinemaPlayer, IVideoElement } from './interface'
import { CinemaPlayerLoader } from './module/CinemaPlayerLoader/CinemaPlayerLoader'
import { ControlsNavigation } from './module/ControlsNavigation'
import Progress from './module/Progress'

export const CinemaPlayer: FC<ICinemaPlayer> = ({
    url,
    isFastRewindForwardBtn,
}) => {
    // -------------------------------- References --------------------------------
    const videoRef = useRef<IVideoElement>(null)
    const cinemaPlayerContainerRef = useRef<HTMLDivElement>(null)
    const { togglePiP, disablePiP } = usePiP(videoRef, { autoPIP: false })

    // -------------------------------- States --------------------------------
    const [isPlay, setIsPlay] = useState<boolean>(true)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [durationTime, setDurationTime] = useState<number>(0)
    const [progressBar, setProgressBar] = useState<number>(0)
    const [progressBufferedBar, setProgressBufferedBar] = useState<number>(0)
    const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false)
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
    const [isPictureInPicture, setIsPictureInPicture] = useState<boolean>(false)

    // -------------------------------- Functions --------------------------------

    const togglePlay = useCallback((): void => {
        const videoEl = videoRef.current
        if (!videoEl) return

        videoEl.paused ? videoEl.play() : videoEl.pause()
    }, [videoRef.current?.paused])
    const onVideoPlayHandler = (): void => {
        const video = videoRef.current
        if (!video) return
        setIsPlay(video.paused)

        if (isVideoLoading) {
            setIsVideoLoading(false)
        }
    }
    const onVideoPauseHandler = (): void => {
        const video = videoRef.current
        if (!video) return
        setIsPlay(video.paused)

        if (isVideoLoading) {
            setIsVideoLoading(false)
        }
    }
    const onVideoLoadedData = (e: ChangeEvent<HTMLVideoElement>): void => {
        setDurationTime(e.target.duration)
    }
    const onVideoTimeUpdate = (e: ChangeEvent<HTMLVideoElement>): void => {
        setCurrentTime(e.target.currentTime)
        setProgressBar((e.target.currentTime / e.target.duration) * 100)

        if (isVideoLoading) {
            setIsVideoLoading(false)
        }
    }

    const onVideoLoading = (): void => {
        if (isPlay) {
            setIsPlay(false)
        }
        setIsVideoLoading(true)
    }
    const onVideoProgress = (): void => {
        const video = videoRef.current
        if (!video) return

        if (!video.buffered.length) return

        let progressBufferEnd = video.buffered.end(video.buffered.length - 1)
        let progressBuffer = (progressBufferEnd / video.duration) * 100

        setProgressBufferedBar(progressBuffer)
    }

    // set current time progress bar in video
    const setCurrentTimeProgressBarToVideoCallback = (
        currentTimeProgress: number
    ): void => {
        const video = videoRef.current
        if (!video) return

        video.currentTime = currentTimeProgress
    }
    const setVolumeToVideoCallback = (volumeValue: number): void => {
        const video = videoRef.current
        if (!video) return
        video.volume = volumeValue
    }

    const onFullscreenHandler = async (): Promise<void> => {
        const cinemaPlayerContainer = cinemaPlayerContainerRef.current
        if (!cinemaPlayerContainer) return

        if (document.fullscreenElement == null && !isFullscreen) {
            if (isPictureInPicture) {
                await disablePiP();
            }
            await cinemaPlayerContainer.requestFullscreen()
            setIsFullscreen(true)
        } else {
            await document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onEnterPIP = () => setIsPictureInPicture(true);
        const onLeavePIP = () => setIsPictureInPicture(false);

        video.addEventListener("enterpictureinpicture", onEnterPIP);
        video.addEventListener("leavepictureinpicture", onLeavePIP);
        return () => {
            video.removeEventListener("enterpictureinpicture", onEnterPIP);
            video.removeEventListener("leavepictureinpicture", onLeavePIP);
        };
    }, [videoRef?.current]);

    // -------------------------------- Hooks --------------------------------

    return (
        <>
            <div
                className='cinema-player'
                id={'cinema_player'}
                ref={cinemaPlayerContainerRef}
            >
                <CinemaPlayerLoader isLoading={isVideoLoading} />
                <video
                    className={'cinema-player__main-video'}
                    id={'main-video'}
                    ref={videoRef}
                    preload={'metadata'}
                    onClick={togglePlay}
                    onPlay={onVideoPlayHandler}
                    onPause={onVideoPauseHandler}
                    onWaiting={onVideoLoading}
                    onProgress={onVideoProgress}
                    onTimeUpdate={onVideoTimeUpdate}
                    onLoadedData={onVideoLoadedData}
                >
                    <source src={`${url}`} type='video/mp4' />
                    {/* <source src={`${url}#t=2`} type='video/mp4' /> */}
                </video>

                <div className={'cinema-player__controls'}>
                    <Progress
                        setProgressBar={setProgressBar}
                        progressBar={progressBar}
                        progressBufferedBar={progressBufferedBar}
                        setCurrentTimeProgressBarToVideoCallback={setCurrentTimeProgressBarToVideoCallback}
                        durationTime={durationTime}
                    />

                    <ControlsNavigation
                        isPlay={isPlay}
                        currentTime={currentTime}
                        durationTime={durationTime}
                        setVolumeToVideoCallback={setVolumeToVideoCallback}
                        togglePlay={togglePlay}
                        isFullscreen={isFullscreen}
                        onFullscreen={onFullscreenHandler}
                        onTogglePictureInPicture={togglePiP}
                        isFastRewindForwardBtn={isFastRewindForwardBtn}
                    />
                </div>
            </div>
        </>
    )
}
