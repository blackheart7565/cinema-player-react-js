import { RefObject, useEffect, useState } from "react";


export const useHCSM = <T extends Element>(playerRef: RefObject<T>) => {
	const [isVisibleMenuControl, setIsVisibleMenuControl] = useState<boolean>(false);

	useEffect(() => {
		const player = playerRef.current;
		if (!player) return;

		const time: number = 2600;

		const onEnter = (): void => setIsVisibleMenuControl(true);
		const onLeave = (): void => setIsVisibleMenuControl(false);
		const onMove = (): void => {
			setIsVisibleMenuControl(true);
			const timerIntervalHideControl = setTimeout(onLeave, time);

			player.addEventListener("mousemove", (): void => {
				clearTimeout(timerIntervalHideControl);
			});
		}

		player.addEventListener("mouseenter", onEnter);
		player.addEventListener("mouseleave", onLeave);
		player.addEventListener("mousemove", onMove);

		return () => {
			player.removeEventListener("mouseenter", onEnter);
			player.removeEventListener("mouseleave", onLeave);
			player.removeEventListener("mousemove", onMove);
		};
	}, [playerRef]);

	return {
		isVisibleMenuControl,
	}
}