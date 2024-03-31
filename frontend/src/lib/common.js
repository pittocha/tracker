

export function storeInSessionStorage(token, userId) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId',userId);
};

export function getFromSessionStorage(item) {
    return sessionStorage.getItem(item);
};

export async function getAuthentificatedUser() {
    const defaultReturnObject = { authentificated: false, user: null };
    try {
        const token = getFromSessionStorage('token');
        const userId = getFromSessionStorage('userId');
        if (!token) {
            return defaultReturnObject;
        }
        return {authentificated: true, user: { userId, token }};
    } catch (err) {
        console.error('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
};