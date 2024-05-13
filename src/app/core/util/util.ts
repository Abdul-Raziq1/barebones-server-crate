export function getErrorMessage(error: any) {
    if (error.detail) {
        return error.detail
    }
    return 'Something went wrong'
} 