import {FileData} from "@/shared/interface/userRegistrationData.ts";

type UserData = {
    name: string,
    email: string,
    birthday: string,
    gender: string,
}

type UserPhotos = {
    photos: Array<FileData>
}

type UserPreferences = {
    search_gender: string,
    search_age_from: number,
    search_age_to: number,
}

export type UserRegistrationData = {
    name: string,
    email: string,
    gender: string,
    search_gender: string,
    birthday: string,
    locale: string,
    search_age_from: number,
    search_age_to: number,
    photos: Array<FileData>
}

export type UserDataProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export type UserPhotosProps = UserPhotos & {
    updateFields: (fields: Partial<UserPhotos>) => void,
}

export type UserPreferencesProps = UserPreferences & {
    updateFields: (fields: Partial<UserPreferences>) => void
}