export async function getGeolocation(cb: (arg0: string[]) => void) {
  if (navigator.geolocation) {
    const res = await fetch(
      'https://api.geoapify.com/v1/ipinfo?apiKey=0016d9a8eeab4591849154961e4e7fd3',
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
