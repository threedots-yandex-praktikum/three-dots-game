import {YANDEX_CLOUD_HOST, YANDEX_OAUTH_HOST} from "client/modules/api/httpTransport/constants";

export const getUrlOauth = (clientId:string, redirectUrl = YANDEX_CLOUD_HOST) =>
`https://${YANDEX_OAUTH_HOST}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;
