import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../../img/caro2.jpg';
import img2 from '../../img/caro3.jpg';

const ImageGallery3D = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const images = [
        {
            id: 1,
            src: img1,
            title: 'Nature',
            description: 'Beautiful natural landscape'
        },
        {
            id: 2,
            src: img2,
            title: 'City',
            description: 'Urban cityscape view'
        },
        {
            id: 3,
            src: img1,
            title: 'Architecture',
            description: 'Modern building design'
        },
        {
            id: 4,
            src: img1,
            title: 'Technology',
            description: 'Cutting-edge tech devices'
        },
        {
            id: 5,
            src: img1,
            title: 'Travel',
            description: 'Adventure travel destination'
        },
        {
            id: 6,
            src: 'https://source.unsplash.com/random/800x600?food',
            title: 'Food',
            description: 'Delicious gourmet dish'
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div 
            className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8"
            style={{ fontFamily: "'Arial Narrow', Arial, sans-serif", fontWeight: 'bold' }}
        >
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl text-center text-gray-800 mb-4">
                    Our Gallery
                </h1>
                <hr className="border-t-2 border-orange-300 w-24 mx-auto mb-12" />

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {images.map((image) => (
                        <motion.div
                            key={image.id}
                            variants={item}
                            className="relative"
                            onClick={() => setSelectedId(image.id)}
                            onHoverStart={() => setHoveredId(image.id)}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            <motion.div
                                className="overflow-hidden rounded-xl shadow-2xl cursor-pointer"
                                whileHover={{ scale: 1.03 }}
                                initial={{ rotateY: 0, rotateX: 0 }}
                                animate={{
                                    rotateY: hoveredId === image.id ? 5 : 0,
                                    rotateX: hoveredId === image.id ? -5 : 0,
                                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px'
                                }}
                            >
                                <motion.img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-64 object-cover"
                                    initial={{ opacity: 0.9 }}
                                    whileHover={{ opacity: 1 }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    <div>
                                        <h3 className="text-white text-xl">{image.title}</h3>
                                        <p className="text-gray-200">{image.description}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl w-full"
                            initial={{ scale: 0.8, rotateY: 30, opacity: 0 }}
                            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                            exit={{ scale: 0.8, rotateY: -30, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '2000px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images.find(img => img.id === selectedId).src}
                                alt={images.find(img => img.id === selectedId).title}
                                className="w-full max-h-screen object-contain rounded-lg shadow-2xl"
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-white text-3xl">
                                    {images.find(img => img.id === selectedId).title}
                                </h2>
                                <p className="text-gray-300 mt-2">
                                    {images.find(img => img.id === selectedId).description}
                                </p>
                                <button
                                    className="mt-4 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition"
                                    onClick={() => setSelectedId(null)}
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageGallery3D;