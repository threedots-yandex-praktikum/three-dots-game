import {GEOAPIFY_URL} from "client/modules/api/httpTransport/constants";

export async function getGeolocation(cb: (arg0: string[]) => void) {
  if (navigator.geolocation) {
    const res = await fetch(
      GEOAPIFY_URL,
    )
      .then((res) => res.json())
      .then((res) => {
        const country = res.country.name;
        const city = res.state.name;
        return [country, city];
      })
      .catch((err) => {
        console.log(err);
        return ['', ''];
      });
    cb(res);
    return res;
  }
}
