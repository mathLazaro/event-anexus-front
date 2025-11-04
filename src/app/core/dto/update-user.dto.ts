export interface UpdateUserDto {
    name?: string;
    telephone_number?: string;
    type?: 'ORGANIZER' | 'REGULAR';
    department?: string;
}

export interface UpdatePasswordDto {
    current_password: string;
    new_password: string;
}
