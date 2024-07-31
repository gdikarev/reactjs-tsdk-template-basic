import { ChangeEvent } from 'react';
import {FileData} from "@/shared/interface/registration.ts";
import FormControl from '@mui/material/FormControl';

type UserPhotos = {
    photos: Array<FileData>
}

type UserPhotosProps = UserPhotos & {
    updateFields: (fields: Partial<UserPhotos>) => void
}

export function UserPhotos({ photos, updateFields }: UserPhotosProps) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
        const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length !== selectedFiles.length) {
            console.error('Please select only image files.');
            return;
        }

        const newFileData = imageFiles.map(file => ({
            file,
            url: URL.createObjectURL(file),
        }));

        updateFields({ photos: [...photos, ...newFileData] });
    };

    const handleDelete = (index: number) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        updateFields({ photos: newPhotos });
    };

    return (
        <FormControl>
                <div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                        {photos.map((data, index) => (
                            <div key={index} style={{
                                position: 'relative',
                                width: '100px',
                                height: '100px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                backgroundColor: '#000000'
                            }}>
                                <img
                                    src={data.url}
                                    alt="Preview"
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                                <button
                                    type={"button"}
                                    onClick={() => handleDelete(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 1 // Повышаем z-index, чтобы кнопка была выше FileInput
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <div style={{
                            position: 'relative',
                            width: '100px',
                            height: '100px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{fontSize: '24px', color: '#888'}}>+</span>
                            <input type={"file"} onChange={handleFileChange} multiple accept="image/*" style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                opacity: 0,
                                cursor: 'pointer'
                            }}/>
                        </div>
                    </div>
                </div>
        </FormControl>
    );
}