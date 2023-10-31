import React, {FC} from 'react';
import {ICinemaIcon} from "../interface";

const PlayIcon: FC<ICinemaIcon> = (
    {
        className
    }) => {
    return (
        <>
            <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24"
                 viewBox="0 -960 960 960" width="24">
                <path
                    d="M320-200v-560l440 280-440 280Z"/>
            </svg>
        </>
    );
};

export {PlayIcon};