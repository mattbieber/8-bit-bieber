
import { EBBCircleMetrics, EBBRectMetrics } from '../../dom/structs'

export const roundedRect = (ctx: CanvasRenderingContext2D, metrics: EBBCircleMetrics) => {

  const { x, y, w, h, r } = metrics

  ctx.beginPath()
  ctx.arc(x+r, y+r, r, Math.PI, 1.5*Math.PI)
  ctx.arc(x+w-r, y+r, r, 1.5*Math.PI, 2*Math.PI)
  ctx.arc(x+w-r, y+h-r, r, 0, 0.5*Math.PI)
  ctx.arc(x+r, y+h-r, r, 0.5*Math.PI, Math.PI)
  ctx.closePath()
}


export const oval = (ctx: CanvasRenderingContext2D, metrics: EBBRectMetrics) => {

  const { x, y, w, h } = metrics
  
  ctx.save()
  ctx.beginPath()
  ctx.translate(x, y)
  ctx.scale(w/2, h/2)
  ctx.arc(1, 1, 1, 0, 2*Math.PI, false)
  ctx.closePath()
  ctx.restore()
}

/**
 * converts radians to deg
 * @param r {float} - radians to convert 
 * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
export const radToDeg = (r: number) => {
  return r * 180 / Math.PI
}

/**
 * calculates tangent
 * @param ang { number } 
 * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
export const normalizeTan = (ang: number) => {  
  return ang + Math.PI / 2 > 0 ? ang + Math.PI / 2 : (2 * Math.PI + ang + Math.PI / 2)
}
/**
 * calculates knob val from position
 * @param ang { number } 
 * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
export const normalizeVal = (ang: number) => {
  return ang - Math.PI*0.75> 0 ? ang - Math.PI*0.75 : (2 * Math.PI + ang - Math.PI*0.75)
}

/**
 * converts deg to radians
 * @param n {number} - deg to convert 
 * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
export const degToRad = (n: number) => (n * Math.PI)/180;
  

export const angFromPts = (x1: number, y1: number, x2: number, y2: number, inRadians: boolean) => {
  var angleRadians = Math.atan2(y2 - y1, x2 - x1);
  return inRadians?angleRadians:radToDeg(angleRadians);
}

export const getSat = (start: number, angle: number, distance: number, isX: boolean) => start+Math[isX?"cos":"sin"](degToRad(angle))*distance;