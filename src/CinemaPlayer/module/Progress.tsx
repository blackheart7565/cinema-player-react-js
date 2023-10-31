import React, {FC, MouseEvent, useEffect, useRef, useState} from 'react'

interface IProgress {
    setProgressBar: React.Dispatch<React.SetStateAction<number>>
    progressBar: number
    progressBufferedBar: number
    setCurrentTimeProgressBarToVideoCallback: (
        currentTimeProgress: number
    ) => void
    durationTime: number
}

const Progress: FC<IProgress> = (
    {
        setProgressBar,
        progressBar,
        progressBufferedBar,
        setCurrentTimeProgressBarToVideoCallback,
        durationTime,
    }) => {
    const progressRef = useRef<HTMLDivElement>(null)
    const [isProgressMove, setIsProgressMove] = useState<boolean>(false)

    const onVideoProgressHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (isProgressMove) return

        const {width} = e.currentTarget.getBoundingClientRect()
        const {offsetX} = e.nativeEvent

        setCurrentTimeProgressBarToVideoCallback((offsetX / width) * durationTime)
    }
    const onVideoProgressMouseMoveHandler = (
        e: MouseEvent<HTMLDivElement>
    ): void => {
        const progress = progressRef.current
        if (!progress) return

        if (isProgressMove) {
            setProgressBar((e.nativeEvent.offsetX / progress.clientWidth) * 100)
            setCurrentTimeProgressBarToVideoCallback(
                (e.nativeEvent.offsetX / progress.clientWidth) * durationTime
            )
        }
    }
    const onVideoProgressMouseDownHandler = (): void => {
        setIsProgressMove(true)
    }
    const onVideoProgressMouseUpHandler = (): void => {
        setIsProgressMove(false)
    }

    // -------------------------------- Hooks --------------------------------

    useEffect(() => {
        document.addEventListener('mouseup', onVideoProgressMouseUpHandler)
        return (): void => {
            document.removeEventListener('mouseup', onVideoProgressMouseUpHandler)
        }
    }, [])

    return (
        <>
            <div
                className='cinema-player__progress'
                ref={progressRef}
                onClick={onVideoProgressHandler}
                onMouseDown={onVideoProgressMouseDownHandler}
                onMouseMove={onVideoProgressMouseMoveHandler}
                onMouseUp={onVideoProgressMouseUpHandler}
            >
                <div
                    className='cinema-player__progress-bar'
                    style={{
                        width: `${progressBar}%`,
                    }}
                ></div>
                <div
                    className='cinema-player__progress-buffer'
                    style={{
                        width: `${progressBufferedBar}%`,
                    }}
                ></div>
            </div>
        </>
    )
}

export default Progress
