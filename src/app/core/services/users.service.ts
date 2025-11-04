import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto, UpdatePasswordDto } from '../dto/update-user.dto';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) { }

    /**
     * Busca um usuário por ID
     */
    getUserById(userId: string): Observable<UserDto> {
        return this.http.get<UserDto>(`/users/${userId}`);
    }

    /**
     * Atualiza os dados do usuário
     */
    updateUser(userData: UpdateUserDto): Observable<UserDto> {
        return this.http.put<UserDto>(`/users/`, userData);
    }

    /**
     * Atualiza a senha do usuário
     */
    updatePassword(passwordData: UpdatePasswordDto): Observable<any> {
        return this.http.patch(`/users/`, passwordData);
    }

    /**
     * Exclui o usuário
     */
    deleteUser(): Observable<any> {
        return this.http.delete(`/users/`);
    }

    /**
     * Busca o perfil do usuário logado
     */
    getCurrentUser(): Observable<UserDto> {
        return this.http.get<UserDto>('/users/1');
    }
}