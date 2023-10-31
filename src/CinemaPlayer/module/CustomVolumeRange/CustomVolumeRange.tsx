import React, {ChangeEvent, FC,} from 'react';

import './CustomVolumeRange.scss';

type IVolumeTypes = {
    value: number,
}

interface ICustomVolumeRange extends IVolumeTypes {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const CustomVolumeRange: FC<ICustomVolumeRange> = (
    {
        onChange
        , value
    }) => {

    return (
        <div className="range">
            <div className="range__content">

                <div className="range__slider">
                    <div
                        className="range__slider-line"
                        id="range-line"
                        style={{
                            width: `${value}%`
                        }}
                    />
                </div>

                <input
                    type="range"
                    className="range__input"
                    id="range-input"
                    min="0"
                    max="100"
                    value={value}
                    step="1"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export {CustomVolumeRange};