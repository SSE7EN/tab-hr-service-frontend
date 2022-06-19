export function getAuthHeader() {
    return {'Authorization': localStorage.getItem('myToken')};
}

export function getAdminHeader() {
    return {'Authorization': "Basic aW9wcm9qZWN0LWNsaWVudDppb3Byb2plY3Qtc2VjcmV0"};
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