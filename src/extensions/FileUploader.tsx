import React, { useState } from 'react';
import { storage } from '../firebase'; // Assuming you've initialized Firebase storage here
import { Button, FormLabel, TextField } from '@mui/material';

interface FileUploaderProps {
    onUploadSuccess?: (url: string) => void;
    hasImage?: boolean;
    imageUrl?: string;
    label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess, hasImage, imageUrl, label }) => {
    const [file, setFile] = useState<File | null>(null);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const fileURL = await fileRef.getDownloadURL();
            setDownloadURL(fileURL);
            if (onUploadSuccess) {
                onUploadSuccess(fileURL);
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* label */}
            <FormLabel>{label}</FormLabel>
            <TextField type="file" onChange={handleFileChange} onAbort={() => {setFile(null)}}/>
            
            {hasImage && imageUrl && (
                <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{ width: '40%', height: 'auto', marginTop: '10px' }}
                />
            )}
            {downloadURL && (
                <img
                src={downloadURL}
                alt="Uploaded"
                style={{ width: '40%', height: 'auto', marginTop: '10px' }}
            />
            )}
            <Button variant="contained" onClick={handleUpload} style={{ marginTop: '10px' }} disabled={!file}>
                {hasImage ? 'Upload New Image' : 'Upload File'}
            </Button>
        </div>
    );
};

export { FileUploader };
