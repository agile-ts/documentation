import React, {useEffect, useState} from "react";

export interface WindowSizeInterface {windowWidth: number, windowHeight: number, scrollHeight: number}

export function useWindowSize(): WindowSizeInterface {

    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<WindowSizeInterface>({
        windowWidth: undefined,
        windowHeight: undefined,
        scrollHeight: undefined
    });

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                scrollHeight: Math.max(
                    body.scrollHeight,
                    body.offsetHeight,
                    html.clientHeight,
                    html.scrollHeight,
                    html.offsetHeight,
                  )
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}