import {z} from 'zod';
import {UserRegistrationData} from "@/shared/type/userRegistrationData.ts";

const MIN_PHOTOS = 1;
const MAX_PHOTOS = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function getStepValidationSchema(data: UserRegistrationData, currentStepIndex: number) {
    switch (currentStepIndex) {
        case 0:
            return z.object({
                name: z.string().min(1, "Name is required"),
                email: z.string().email("Invalid email address"),
                gender: z.any().refine(
                    () => data.gender?.length === 1,
                    `Please select gender`
                )
                // birthday: z.string().date("Birthday is required"),
            })
        case 1:
            return z.object({
                photos: z
                    .any()
                    .refine(
                        () => data.photos?.length >= MIN_PHOTOS,
                        `Please provide at least ${MIN_PHOTOS} photo.`
                    )
                    .refine(
                        () => data.photos?.length <= MAX_PHOTOS,
                        `Please select max ${MAX_PHOTOS} photos.`
                    )
                    .refine(() => data.photos.every(photo => photo.file.size <= MAX_FILE_SIZE),
                        'Max image size is 5MB.')
                    .refine(
                        () => data.photos.every(photo => ACCEPTED_IMAGE_MIME_TYPES.includes(photo.file.type)),
                        'Only .jpg, .jpeg, .png and .webp formats are supported.'
                    ),
            })
        case 2:
            return z.object({
                search_gender: z
                    .any()
                    .refine(
                        () => data.search_gender?.length === 1,
            `Please select search gender`
                    ),
            })
        default: {
            return null
        }
    }
}