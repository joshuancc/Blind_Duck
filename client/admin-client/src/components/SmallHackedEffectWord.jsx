import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SmallHackedEffectWord = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const intervalRef = useRef(null);
    const h1Ref = useRef(null);
    const navigate = useNavigate();

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

    const handleClick = () => {
        window.location.reload();    };

    return (
        
        <h1
            ref={h1Ref}
            onClick={handleClick}
            style={{ 
                fontSize: '2rem', 
                fontFamily: 'Montserrat, monospace',
                cursor: 'pointer',
                color: '#DAA276'
            }}
            data-value="Data Lab Alexander"
        >             <span style={{ color: 'black', fontSize:"bold",fontFamily: 'Montserrat, monospace',
        }}>Data Lab&nbsp;</span>

           Alexander
        </h1>
    );
};

export default SmallHackedEffectWord;
