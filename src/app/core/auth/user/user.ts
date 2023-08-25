export interface UserToken {
    user?: User,
    claims?: Array<string>;
}

export interface User {
    id?: number;
    name?: string;
    birthDate? : string;
    gender?: string;
    email?: string;
    Active?: string;
    Phone? : string;
    Height? : string;
    Weight? : string;
    Goal? : string;
    profilePhotoUrl?: string;
}
