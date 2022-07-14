import {RESOURCES_URL} from "client/modules/api/httpTransport/constants";


export function generateAvatarLink(avatar: unknown) {
  const avatarLink = avatar ? `${RESOURCES_URL}${avatar}` : undefined;
  return avatarLink;
}
