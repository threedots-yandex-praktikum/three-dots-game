//вот здесь не работает
export const localUrl = `${process.env.HOST}/`;
export const getUrlOauth = (clientId:string, redirectUrl = localUrl) => 
`https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;
