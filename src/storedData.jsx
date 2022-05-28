export function getAuthHeader() {
    return {'Authorization': localStorage.getItem('myToken')};
}