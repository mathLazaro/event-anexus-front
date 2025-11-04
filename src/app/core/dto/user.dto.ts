export enum UserType {
    ORGANIZER = 'ORGANIZER',
    REGULAR = 'REGULAR'
}

export interface UserDto {
    id?: string;
    department?: string;
    email: string;
    name: string;
    password?: string;
    telephone_number: string;
    type: UserType;
}

// DTO global para criação de usuário — utilizado em toda a plataforma.
