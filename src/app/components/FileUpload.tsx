'use client'

import { useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export default function FileUpload() {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debugger
        if (e.target.files) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleUpload = async (selectedFile: File) => {
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                toast.success('Knowledge base updated successfully');
                console.log('File uploaded successfully');
            } else {
                toast.error('Failed to upload');
                console.error('File upload failed');
            }
        } catch (error) {
            toast.error('Error uploading file');
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <label className="cursor-pointer transition-colors">
            {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
            ) : (
                <PaperClipIcon className="h-6 w-6 text-gray-600" />
            )}
            <input
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
            />
        </label>
    );
}
