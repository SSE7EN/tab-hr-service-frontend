export function getAuthHeader() {
    return {'Authorization': localStorage.getItem('myToken')};
}

export function getCurrentUserId() {
    return parseInt(localStorage.getItem('currentUserId'));
}

export function isSameUser(userId) {
    return localStorage.getItem('currentUserId') == userId;
}

export function isAdmin() {
    return localStorage.getItem('currentUserRole') == 'ADMIN';
}