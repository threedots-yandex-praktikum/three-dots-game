const _RESOURCES_URL = "https://ya-praktikum.tech/api/v2/resources/";

export function generateAvatarLink(avatar: unknown) {
  const avatarLink = avatar ? `${_RESOURCES_URL}${avatar}` : undefined;
  return avatarLink;
}
