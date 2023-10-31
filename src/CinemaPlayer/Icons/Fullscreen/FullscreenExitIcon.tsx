import React, {FC} from 'react';
import {ICinemaIcon} from "../interface";

const FullscreenExitIcon: FC<ICinemaIcon> = (
    {
        className
    }) => {
    return (
        <>
            <svg className={className}
                 xmlns="http://www.w3.org/2000/svg"
                 height="24" viewBox="0 -960 960 960" width="24">
                <path
                    d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/>
            </svg>
        </>
    );
};

export {FullscreenExitIcon};