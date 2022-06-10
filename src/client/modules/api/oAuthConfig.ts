export const localUrl = 'https://local.ya-praktikum.tech:5000/';
export const getUrlOauth = (clientId:string, redirectUrl = localUrl) => 
`https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;