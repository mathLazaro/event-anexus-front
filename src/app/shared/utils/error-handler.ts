/**
 * Interface para estrutura de erro do backend
 */
export interface BackendError {
    error: string;
    details: Array<{ [key: string]: string }>;
}

/**
 * Extrai mensagens de erro do formato do backend
 * @param error - Objeto de erro do HttpClient
 * @returns Mensagem de erro formatada
 */
export function extractErrorMessage(error: any): string {
    // Verifica se tem a estrutura de erro do backend
    if (error?.error?.details && Array.isArray(error.error.details)) {
        const details = error.error.details;

        // Extrai todas as mensagens de erro dos campos
        const messages: string[] = [];

        details.forEach((detail: any) => {
            Object.keys(detail).forEach((field) => {
                const fieldName = translateFieldName(field);
                const errorMsg = detail[field];
                messages.push(`${fieldName}: ${errorMsg}`);
            });
        });

        return messages.join('\n') || 'Erro ao processar solicitação';
    }

    // Fallback para outros formatos de erro
    if (error?.error?.message) {
        return error.error.message;
    }

    if (error?.message) {
        return error.message;
    }

    return 'Erro desconhecido. Tente novamente.';
}

/**
 * Extrai erros específicos de campos para exibir no formulário
 * @param error - Objeto de erro do HttpClient
 * @returns Objeto com erros por campo
 */
export function extractFieldErrors(error: any): { [key: string]: string } {
    const fieldErrors: { [key: string]: string } = {};

    if (error?.error?.details && Array.isArray(error.error.details)) {
        error.error.details.forEach((detail: any) => {
            Object.keys(detail).forEach((field) => {
                fieldErrors[field] = detail[field];
            });
        });
    }

    return fieldErrors;
}

/**
 * Traduz nomes de campos do inglês para português
 * @param field - Nome do campo em inglês
 * @returns Nome do campo em português
 */
function translateFieldName(field: string): string {
    const translations: { [key: string]: string } = {
        'email': 'E-mail',
        'password': 'Senha',
        'name': 'Nome',
        'telephone_number': 'Telefone',
        'department': 'Departamento',
        'type': 'Tipo de usuário',
        'current_password': 'Senha atual',
        'new_password': 'Nova senha',
        'confirm_password': 'Confirmação de senha',
        'confirmPassword': 'Confirmação de senha'
    };

    return translations[field] || field.charAt(0).toUpperCase() + field.slice(1);
}

/**
 * Verifica se o erro é de campo duplicado
 * @param error - Objeto de erro do HttpClient
 * @param field - Nome do campo a verificar
 * @returns true se o campo está duplicado
 */
export function isDuplicateFieldError(error: any, field: string): boolean {
    if (!error?.error?.details || !Array.isArray(error.error.details)) {
        return false;
    }

    return error.error.details.some((detail: any) => {
        return detail[field]?.toLowerCase().includes('duplicado') ||
            detail[field]?.toLowerCase().includes('já existe') ||
            detail[field]?.toLowerCase().includes('already exists');
    });
}

/**
 * Formata erro para exibição em modal
 * @param error - Objeto de erro do HttpClient
 * @returns Objeto com título e mensagem formatados
 */
export function formatErrorForModal(error: any): { title: string; message: string } {
    const message = extractErrorMessage(error);

    // Verifica se é erro de validação
    if (error?.error?.details && Array.isArray(error.error.details)) {
        return {
            title: 'Erro de validação',
            message: message
        };
    }

    // Erro de duplicação
    if (message.toLowerCase().includes('duplicado') ||
        message.toLowerCase().includes('já existe')) {
        return {
            title: 'Dados duplicados',
            message: message
        };
    }

    // Erro de autenticação
    if (error?.status === 401 || error?.status === 403) {
        return {
            title: 'Erro de autenticação',
            message: message || 'Você não tem permissão para realizar esta ação'
        };
    }

    // Erro de servidor
    if (error?.status >= 500) {
        return {
            title: 'Erro no servidor',
            message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.'
        };
    }

    // Erro genérico
    return {
        title: 'Erro',
        message: message
    };
}
