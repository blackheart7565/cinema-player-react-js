import {RefObject, useCallback, useEffect} from "react";
import {closePiP, isInPiP, openPiP} from "../PiP";


interface IOptions {
    autoPIP: boolean;
}

interface IValue {
    enablePiP: () => Promise<void>,
    disablePiP: () => Promise<void>,
    togglePiP: () => Promise<void>,
}

const defaultOptions: IOptions = {
    autoPIP: true
}

export const usePiP = (
    videoElement: RefObject<HTMLVideoElement>,
    options = defaultOptions
): IValue => {

    const disablePiP = useCallback(async () => {
        await closePiP(videoElement.current)
            .catch(console.warn)
    }, [videoElement]);

    const enablePiP = useCallback(async () => {
        await openPiP(videoElement.current)
            .catch(console.warn)
    }, [videoElement]);

    const handleVisibility = useCallback(async () => {
        if (document.visibilityState === "visible") {
            await disablePiP();
        } else {
            await enablePiP();
        }
    }, [disablePiP, enablePiP])

    const togglePiP = useCallback(async () => {
        if (isInPiP()) {
            await disablePiP();
        } else {
            await enablePiP();
        }
    }, [enablePiP, disablePiP])


    useEffect(() => {
        if (!options.autoPIP) return

        const video = videoElement.current;

        if (video && "autoPictureInPicture" in video) {
            // @ts-ignore
            video.autoPictureInPicture = true;
        }

        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [options.autoPIP, videoElement, handleVisibility])

    return {
        enablePiP,
        disablePiP,
        togglePiP
    };
}