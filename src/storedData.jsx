export function getAuthHeader() {
    return {'Authorization': localStorage.getItem('myToken')};
}

export function getAdminHeader() {
    return {'Authorization': "Basic aW9wcm9qZWN0LWNsaWVudDppb3Byb2plY3Qtc2VjcmV0"};
}