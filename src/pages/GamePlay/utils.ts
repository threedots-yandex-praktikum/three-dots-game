export function random(min: number, max: number) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    const hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRadians(degrees: number) {
  return (Math.PI / 180) * degrees;
}

export function getRadiusFromArea(area: number): number {
  return Math.floor(Math.sqrt(area/Math.PI))
}
