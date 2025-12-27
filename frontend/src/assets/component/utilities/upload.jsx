import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadFbPost } from '../utilities/SocialMedia/AllApi';

export const UploadForm = memo(({ selectedPage }) => {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        files: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState(null);
    const fileInputRef = useRef(null);

    // Auto-dismiss notifications after 5 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (formData.title.length > 200) newErrors.title = 'Max 200 characters';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        if (formData.message.length > 500) newErrors.message = 'Max 500 characters';
        if (formData.files.length === 0) newErrors.files = 'At least one file required';
        if (formData.files.some(f => f.size > 100 * 1024 * 1024)) newErrors.files = 'Max file size 100MB';
        return newErrors;
    }, [formData]);

    const handleFileChange = useCallback((e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'application/pdf'];
        const validFiles = files.filter(file => validTypes.includes(file.type));

        setErrors(prev => ({ ...prev, files: validFiles.length === files.length ? null : 'Invalid file type' }));
        setFormData(prev => ({ ...prev, files: [...prev.files, ...validFiles].slice(0, 10) }));
        e.target.value = '';
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/[<>]/g, '');
        setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
        setErrors(prev => ({ ...prev, [name]: null }));
    }, []);

    const removeFile = useCallback((index) => {
        setFormData(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    }, []);
    const clearFiles = useCallback(() => {
        setFormData(prev => ({ ...prev, files: [] }));
    }, []);
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length) {
            setErrors(formErrors);
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await UploadFbPost({
                selectedPage,
                title: formData.title,
                description: formData.message,
                files: formData.files
            });
            console.log("Upload response:", response.message);
            if (response.error) {
                setNotification({
                    type: 'error',
                    message: response.message
                });
            } else if (response.success) {
                setNotification({
                    type: 'success',
                    message: response.success.message || `Successfully uploaded ${formData.files.length} file(s)`
                });
                setFormData({ title: '', message: '', files: [] });
                setErrors({});
            } else {
                setNotification({
                    type: 'error',
                    message: 'Unexpected response from server'
                });
            }
        } catch (error) {
            setNotification({
                type: 'error',
                message: 'Upload failed: ' + (error.message || 'Unknown error')
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, selectedPage]);
    const totalSizeMB = (formData.files.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024));
    return (
        <div className="max-w-3xl mx-auto p-4">
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`fixed bottom-4 right-4 p-4-lg shadow-lg ${notification.type === 'success'
                            ? 'bg-green-600'
                            : 'bg-red-600 p-2 rounded-lg'
                            } text-white z-50`}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                    File Upload Center
                </h2>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-300">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <span className={`text-xs ${formData.title.length > 200 ? 'text-red-400' : 'text-gray-400'
                            }`}>
                            {formData.title.length}/200
                        </span>
                    </div>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.title ? 'border-red-500' : 'border-gray-700'
                            } text-white`}
                        placeholder="Enter a title"
                    />
                    {errors.title && (
                        <p className="text-red-400 text-xs">{errors.title}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-300">
                            Description <span className="text-red-400">*</span>
                        </label>
                        <span className={`text-xs ${formData.message.length > 500 ? 'text-red-400' : 'text-gray-400'
                            }`}>
                            {formData.message.length}/500
                        </span>
                    </div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full p-3 rounded-lg bg-gray-800 border ${errors.message ? 'border-red-500' : 'border-gray-700'
                            } text-white`}
                        placeholder="Enter a description"
                    />
                    {errors.message && (
                        <p className="text-red-400 text-xs">{errors.message}</p>
                    )}
                </div>
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">
                        Files <span className="text-red-400">*</span>
                    </label>
                    <motion.label
                        whileHover={{ scale: 1.01 }}
                        className="block border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-800/30 transition-colors"
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                            accept="image/*,video/*,application/pdf"
                        />
                        <div className="space-y-2">
                            <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-gray-400">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                                (Images, Videos, PDFs - Max 100MB each)
                            </p>
                        </div>
                    </motion.label>

                    {errors.files && (
                        <p className="text-red-400 text-xs">{errors.files}</p>
                    )}

                    {formData.files.length > 0 && (
                        <div className="space-y-4 mt-4">
                            <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
                                <div>
                                    <span className="font-medium">
                                        {formData.files.length} file{formData.files.length !== 1 ? 's' : ''} selected
                                    </span>
                                    <span className="text-xs text-gray-400 ml-2">
                                        ({totalSizeMB.toFixed(2)} MB)
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={clearFiles}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {formData.files.map((file, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="relative group aspect-square"
                                    >
                                        {file.type.startsWith('image/') ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                                                <div className="text-center p-2">
                                                    <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        {file.type.startsWith('video/') ? (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        ) : (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        )}
                                                    </svg>
                                                    <p className="text-xs text-gray-400 mt-1 truncate px-1">
                                                        {file.name}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || !formData.files.length}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${isSubmitting
                        ? 'bg-blue-600/70 cursor-not-allowed'
                        : !formData.files.length
                            ? 'bg-gray-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        `Upload ${formData.files.length || ''} File${formData.files.length !== 1 ? 's' : ''}`
                    )}
                </button>
            </form>
        </div>
    );
});