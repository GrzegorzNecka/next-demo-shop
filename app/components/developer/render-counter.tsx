import React, { useRef } from "react";

export const RenderCounter = (title: string) => {
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;

    return (
        <div>
            Renders: {renderCounter.current}, {title}
        </div>
    );
};
