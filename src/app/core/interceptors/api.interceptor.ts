import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Interceptor que:
 * 1. Adiciona a URL base do backend a todas as requisições HTTP
 * 2. Adiciona o token de autenticação no header Authorization (se existir)
 * 
 * Se a URL da requisição:
 * - começa com 'http://' ou 'https://', não modifica (URL absoluta)
 * - é relativa (ex: '/api/users'), adiciona o prefixo da BACKEND_URL
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const backendUrl = environment.backendUrl;
    const token = sessionStorage.getItem('auth_token');

    let apiReq = req;

    // 1. Adiciona URL base se for relativa
    if (!req.url.startsWith('http://') && !req.url.startsWith('https://')) {
        const url = req.url.startsWith('/') ? req.url.substring(1) : req.url;
        const apiUrl = `${backendUrl}${url}`;

        apiReq = req.clone({
            url: apiUrl
        });
    }

    // 2. Adiciona token de autenticação se existir
    if (token) {
        apiReq = apiReq.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(apiReq);
};
