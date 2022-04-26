import { random } from "./utils";
import { sizeCanvas } from "./settingsGame";
import { getRadiusFromArea } from "./utils";

const minRadiusDot = 5;
const maxRadiusDot = 40;
const colorsDot: string[] = ["#FF4903", "#4378B", "#00E691", "#8157D1", "#000"];
const countColor = colorsDot.length - 1;
const speed = 5

export class Dot {
  radius: number = random(minRadiusDot, maxRadiusDot);
  private xyMax = sizeCanvas - this.radius;
  private xyMin = 0 + this.radius;
  x: number = random(this.xyMin, this.xyMax)
  y: number = random(this.xyMin, this.xyMax)
  color = colorsDot[random(0, countColor)]
  private speedX = random(-speed, speed) / this.getSpeedFactor()
  private speedY =  random(-speed, speed) / this.getSpeedFactor()

  //для создания новых точек переиспользуя старые.
  isActive = true
  transitionRadius: number | null = null

  getSpeedFactor (): number {
    // TODO нужна другая зависмость
   return this.radius / 3.5;
  }

  updateCoordinates () {
    const isBorderCanvasX = (this.x >= sizeCanvas - this.radius) || (this.x <= 0 + this.radius)
    const isBorderCanvasY = this.y >= sizeCanvas - this.radius || (this.y <= 0 + this.radius)
    if (isBorderCanvasX) {
      this.speedX *= (-1 )
    }
    if (isBorderCanvasY) {
      this.speedY *= (-1 )
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  getAreaCircle () {
    const radius =  this.transitionRadius || this.radius
    return Math.PI * radius * radius;
  }

  setTransitionRadius (area: number) {
    this.transitionRadius = getRadiusFromArea(area);
  }

  increaseRadius () {
    if (!this.transitionRadius) {
      return
    }
    if (this.radius < this.transitionRadius) {        
      this.radius = this.radius + (this.transitionRadius - this.radius) * 0.05
    }
    else if (this.radius >= this.transitionRadius) {
      this.transitionRadius = null
    }
  }

  toggleActive() {
    this.isActive = !this.isActive
  }

  rebound () {
    this.speedY *= -1;
    this.speedX *= -1;
  }
  
}
