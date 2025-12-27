import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

// This is the component the user provided, with minor adjustments for self-containment.
const VideoPlayer = ({
  src = "https://www.youtube.com/watch?v=zWLykaz3YYM&t=14s",
  title,
  autoPlay = true,
  showTitle = true,
  showSourceInfo = true,
  containerWidth = "80%",
  borderColor = "amber-700",
  bgColor = "amber-200",
  iconColor = "text-amber-800",
  textColor = "text-amber-900"
}) => {
  const [hasError, setHasError] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '-20%' });

  // Auto-play when in view (for autoplay mode)
  useEffect(() => {
    if (autoPlay) {
      if (isInView) {
        setPlayVideo(true);
      } else if (!isInView) {
        setPlayVideo(false);
      }
    }
  }, [isInView, autoPlay]);

  const handleError = () => {
    console.error('Video player error');
    setHasError(true);
  };

  const handlePlayClick = () => {
    setPlayVideo(true);
  };

  // Extract YouTube video ID for thumbnail
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytVideoId = getYouTubeId(src);
  const ytThumbnail = ytVideoId ? `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg` : null;

  return (
    <motion.div
      ref={containerRef}
      className="mx-auto mb-8 p-4"
      style={{ width: containerWidth }}
    >
      {/* Header with title */}
      {showTitle && title && (
        <div className="mb-4 text-center">
          <h2 className="text-2xl text-amber-800 dark:text-white font-bold">
            {title}
          </h2>
        </div>
      )}

      {/* Video Player Container */}
      <motion.div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center md:justify-start">
            <h3 className={`text-lg font-bold ${textColor}`}>Our Videos</h3>
          </div>

          <motion.div
            className={`relative overflow-hidden rounded-lg border-2 border-${borderColor} shadow-md cursor-pointer flex items-center justify-center ${bgColor}`}
            style={{ aspectRatio: '16 / 9' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {playVideo ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0`}
                title="YouTube video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                onError={handleError}
              />
            ) : (
              <>
                <img src={ytThumbnail} alt="YouTube Video Thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40" onClick={handlePlayClick}>
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 bg-opacity-80">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Video URL info with link to original source */}
      {showSourceInfo && (
        <div className="mt-3 p-3 bg-amber-100 dark:bg-amber-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 break-all font-bold">
            <span className="font-semibold">Source:</span>{' '}
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-300 hover:underline"
            >
              {src}
            </a>
          </p>
        

          {/* Link to original page */}
          <div className="mt-2">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-amber-600 dark:text-amber-300 hover:underline text-sm font-bold"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
              </svg>
              Watch on original site
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default VideoPlayer;
