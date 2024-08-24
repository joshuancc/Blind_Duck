import React, { useEffect, useRef } from 'react';

const HackedEffectWord = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const intervalRef = useRef(null);
    const h1Ref = useRef(null);

    useEffect(() => {
        const handleMouseOver = (event) => {
            let iteration = 0;

            clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }

                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(intervalRef.current);
                }

                iteration += 1 / 3;
            }, 30);
        };

        const h1Element = h1Ref.current;
        if (h1Element) {
            h1Element.addEventListener('mouseover', handleMouseOver);
        }

        return () => {
            if (h1Element) {
                h1Element.removeEventListener('mouseover', handleMouseOver);
            }
            clearInterval(intervalRef.current);
        };
    }, [letters]);

    return (
        <div>
            <h1
                ref={h1Ref}
                style={{ fontSize: '5rem', fontFamily: 'Space Mono, monospace' }}
                data-value="ALEXANDER"
            >
                Alexander
            </h1>
        </div>
    );
};

export default HackedEffectWord;
