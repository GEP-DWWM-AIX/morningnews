export default function (token = '', action) {
    if (action.type === 'getToken') {
        const newToken = action.token;
        console.log(newToken)
        return newToken;
    }else {
        return token;
    }
}