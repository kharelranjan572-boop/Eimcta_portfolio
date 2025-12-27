import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";

const Image = ({ src, alt, caption, rotate = 0 }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start({
                scale: 1,
                opacity: 1,
                rotate: rotate
            });
        }
    }, [controls, inView, rotate]);

    return (
        <motion.div
            ref={ref}
            className="w-full px-4 py-8"
            initial={{ scale: 0.95, opacity: 0, rotate: rotate }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <figure className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                {caption && (
                    <figcaption className="text-center text-gray-700 p-4 text-lg font-medium border-b border-gray-200 bg-gray-50">
                        {caption}
                    </figcaption>
                )}
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover"
                    style={{ transform: `rotate(${rotate}deg)` }}
                />
            </figure>
        </motion.div>
    );
};

export default Image;