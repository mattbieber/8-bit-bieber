import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Letters } from '../../dom/structs'
import { StartScreenBackgroundColor } from '../startscreen'

export class Logo extends SceneNode {

  draw() {

    
    const { rd, ad, ctx , letters} = this
  
    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    ctx.fillStyle = StartScreenBackgroundColor
    ctx.fillRect(0,0, rd.dimensions.w, rd.dimensions.h)
    
    ctx.translate(rd.offsets.topX, rd.offsets.topY)
    // ctx.strokeRect(0, 0, 650, 200)
    letters['eight']()

    ctx.translate(rd.offsets.typeLg,0)
    letters['dash']()
    ctx.translate(rd.offsets.typeLg,0)
    letters['b']()
    ctx.translate(rd.offsets.typeLg,0)
    letters['i']()
    ctx.translate(rd.offsets.typeLg-30,0)
    letters['t']()
    
    ctx.restore()
    ctx.save()

    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    
    ctx.translate(rd.offsets.bottomX, rd.offsets.bottomY)
    ctx.scale(0.8, 0.8)
    
    letters['b']()
    ctx.translate(rd.offsets.typeSm, 0)
    letters['i']()
    ctx.translate(rd.offsets.typeSm, 0)
    letters['e']()
    ctx.translate(rd.offsets.typeSm, 0)
    letters['b']()
    ctx.translate(rd.offsets.typeSm, 0)
    letters['e']()
    ctx.translate(rd.offsets.typeSm, 0)
    letters['r']()

    ctx.restore()
    
  }

  update(step: number) {
    this.draw()
    
  }

  letters: Letters = {
    'eight': () => {
      const a = [ [ 'm', [ 120.97, 48.41 ] ], [ 'l', [ 112.91, 48.41 ] ], [ 'l', [ 112.91, 40.35 ] ], [ 'l', [ 104.84, 40.35 ] ], [ 'l', [ 104.84, 32.28 ] ], [ 'l', [ 88.71, 32.28 ] ], [ 'l', [ 88.71, 24.21 ] ], [ 'l', [ 72.58, 24.21 ] ], [ 'l', [ 56.45, 24.21 ] ], [ 'l', [ 56.45, 32.28 ] ], [ 'l', [ 48.39, 32.28 ] ], [ 'l', [ 40.32, 32.28 ] ], [ 'l', [ 40.32, 40.35 ] ], [ 'l', [ 32.26, 40.35 ] ], [ 'l', [ 32.26, 48.41 ] ], [ 'l', [ 24.19, 48.41 ] ], [ 'l', [ 24.19, 56.48 ] ], [ 'l', [ 16.13, 56.48 ] ], [ 'l', [ 16.13, 64.55 ] ], [ 'l', [ 8.07, 64.55 ] ], [ 'l', [ 8.07, 80.69 ] ], [ 'l', [ 0, 80.69 ] ], [ 'l', [ 0, 96.83 ] ], [ 'l', [ 8.07, 96.83 ] ], [ 'l', [ 8.07, 104.9 ] ], [ 'l', [ 16.13, 104.9 ] ], [ 'l', [ 16.13, 112.97 ] ], [ 'l', [ 16.13, 121.04 ] ], [ 'l', [ 8.07, 121.04 ] ], [ 'l', [ 8.07, 129.11 ] ], [ 'l', [ 0, 129.11 ] ], [ 'l', [ 0, 145.24 ] ], [ 'l', [ 8.07, 145.24 ] ], [ 'l', [ 8.07, 161.38 ] ], [ 'l', [ 16.13, 161.38 ] ], [ 'l', [ 16.13, 169.45 ] ], [ 'l', [ 24.19, 169.45 ] ], [ 'l', [ 24.19, 177.52 ] ], [ 'l', [ 32.26, 177.52 ] ], [ 'l', [ 40.32, 177.52 ] ], [ 'l', [ 40.32, 185.59 ] ], [ 'l', [ 56.45, 185.59 ] ], [ 'l', [ 72.58, 185.59 ] ], [ 'l', [ 72.58, 177.52 ] ], [ 'l', [ 88.71, 177.52 ] ], [ 'l', [ 88.71, 169.45 ] ], [ 'l', [ 96.78, 169.45 ] ], [ 'l', [ 96.78, 161.38 ] ], [ 'l', [ 104.84, 161.38 ] ], [ 'l', [ 104.84, 153.31 ] ], [ 'l', [ 112.91, 153.31 ] ], [ 'l', [ 112.91, 145.24 ] ], [ 'l', [ 120.97, 145.24 ] ], [ 'l', [ 120.97, 129.11 ] ], [ 'l', [ 129.04, 129.11 ] ], [ 'l', [ 129.04, 121.04 ] ], [ 'l', [ 129.04, 112.97 ] ], [ 'l', [ 120.97, 112.97 ] ], [ 'l', [ 120.97, 104.9 ] ], [ 'l', [ 112.91, 104.9 ] ], [ 'l', [ 112.91, 96.83 ] ], [ 'l', [ 112.91, 88.76 ] ], [ 'l', [ 120.97, 88.76 ] ], [ 'l', [ 120.97, 80.69 ] ], [ 'l', [ 129.04, 80.69 ] ], [ 'l', [ 129.04, 72.62 ] ], [ 'l', [ 129.04, 64.55 ] ], [ 'l', [ 120.97, 64.55 ] ], [ 'l', [ 120.97, 48.41 ] ] ]
      const b = [ [ 'm', [ 129.04, 40.35 ] ], [ 'l', [ 120.97, 40.35 ] ], [ 'l', [ 120.97, 32.28 ] ], [ 'l', [ 112.91, 32.28 ] ], [ 'l', [ 112.91, 24.21 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 104.84, 16.14 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 96.78, 8.07 ] ], [ 'l', [ 80.65, 8.07 ] ], [ 'l', [ 80.65, 0 ] ], [ 'l', [ 64.52, 0 ] ], [ 'l', [ 48.39, 0 ] ], [ 'l', [ 48.39, 8.07 ] ], [ 'l', [ 40.32, 8.07 ] ], [ 'b', [ 40.32, 8.07, 32.26, 8.07, 32.26, 8.07 ] ], [ 'l', [ 32.26, 16.14 ] ], [ 'l', [ 24.19, 16.14 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 16.13, 24.21 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 8.06, 40.35 ] ], [ 'l', [ 8.06, 56.48 ] ], [ 'l', [ 16.13, 56.48 ] ], [ 'l', [ 16.13, 64.55 ] ], [ 'l', [ 24.19, 64.55 ] ], [ 'l', [ 24.19, 72.62 ] ], [ 'l', [ 24.19, 80.69 ] ], [ 'l', [ 16.13, 80.69 ] ], [ 'l', [ 16.13, 88.76 ] ], [ 'l', [ 8.06, 88.76 ] ], [ 'l', [ 8.06, 104.9 ] ], [ 'l', [ 16.13, 104.9 ] ], [ 'l', [ 16.13, 121.04 ] ], [ 'l', [ 24.19, 121.04 ] ], [ 'l', [ 24.19, 129.11 ] ], [ 'l', [ 32.26, 129.11 ] ], [ 'l', [ 32.26, 137.18 ] ], [ 'l', [ 40.32, 137.18 ] ], [ 'l', [ 40.32, 145.24 ] ], [ 'l', [ 48.39, 145.24 ] ], [ 'l', [ 48.39, 153.31 ] ], [ 'l', [ 56.45, 153.31 ] ], [ 'l', [ 64.52, 153.31 ] ], [ 'l', [ 64.52, 161.38 ] ], [ 'l', [ 80.65, 161.38 ] ], [ 'l', [ 96.78, 161.38 ] ], [ 'l', [ 96.78, 153.31 ] ], [ 'l', [ 112.91, 153.31 ] ], [ 'l', [ 112.91, 145.24 ] ], [ 'l', [ 120.97, 145.24 ] ], [ 'l', [ 120.97, 137.18 ] ], [ 'l', [ 129.04, 137.18 ] ], [ 'l', [ 129.04, 121.04 ] ], [ 'l', [ 137.1, 121.04 ] ], [ 'l', [ 137.1, 112.97 ] ], [ 'l', [ 137.1, 104.9 ] ], [ 'l', [ 129.04, 104.9 ] ], [ 'l', [ 129.04, 96.83 ] ], [ 'l', [ 120.97, 96.83 ] ], [ 'l', [ 120.97, 88.76 ] ], [ 'l', [ 120.97, 80.69 ] ], [ 'l', [ 129.04, 80.69 ] ], [ 'l', [ 129.04, 72.62 ] ], [ 'l', [ 137.1, 72.62 ] ], [ 'l', [ 137.1, 64.55 ] ], [ 'l', [ 137.1, 56.48 ] ], [ 'l', [ 129.04, 56.48 ] ], [ 'l', [ 129.04, 40.35 ] ] ]
      const c = [ [ 'm', [ 80.65, 56.48 ] ], [ 'l', [ 72.58, 56.48 ] ], [ 'l', [ 72.58, 64.55 ] ], [ 'l', [ 64.52, 64.55 ] ], [ 'l', [ 56.45, 64.55 ] ], [ 'l', [ 56.45, 56.48 ] ], [ 'l', [ 48.39, 56.48 ] ], [ 'l', [ 48.39, 40.35 ] ], [ 'l', [ 56.45, 40.35 ] ], [ 'l', [ 56.45, 32.28 ] ], [ 'l', [ 64.52, 32.28 ] ], [ 'l', [ 72.58, 32.28 ] ], [ 'l', [ 72.58, 40.35 ] ], [ 'l', [ 80.65, 40.35 ] ], [ 'l', [ 80.65, 56.48 ] ] ] 
      const d = [ [ 'm', [ 80.65, 104.9 ] ], [ 'l', [ 72.58, 104.9 ] ], [ 'l', [ 72.58, 112.97 ] ], [ 'l', [ 64.52, 112.97 ] ], [ 'l', [ 56.45, 112.97 ] ], [ 'l', [ 56.45, 104.9 ] ], [ 'l', [ 48.39, 104.9 ] ], [ 'l', [ 48.39, 88.76 ] ], [ 'l', [ 56.45, 88.76 ] ], [ 'l', [ 56.45, 80.69 ] ], [ 'l', [ 64.52, 80.69 ] ], [ 'l', [ 72.58, 80.69 ] ], [ 'l', [ 72.58, 88.76 ] ], [ 'l', [ 80.65, 88.76 ] ], [ 'l', [ 80.65, 104.9 ] ] ] 
      const e = [ [ 'm', [ 104.84, 64.55 ] ], [ 'l', [ 104.84, 56.48 ] ], [ 'l', [ 112.91, 56.48 ] ], [ 'l', [ 112.91, 40.35 ] ], [ 'l', [ 104.84, 40.35 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 96.78, 24.21 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 80.65, 16.14 ] ], [ 'l', [ 80.65, 8.07 ] ], [ 'l', [ 64.52, 8.07 ] ], [ 'l', [ 48.39, 8.07 ] ], [ 'l', [ 48.39, 16.14 ] ], [ 'l', [ 40.32, 16.14 ] ], [ 'l', [ 32.26, 16.14 ] ], [ 'l', [ 32.26, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 40.35 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 16.13, 56.48 ] ], [ 'l', [ 24.19, 56.48 ] ], [ 'l', [ 24.19, 64.55 ] ], [ 'l', [ 32.26, 64.55 ] ], [ 'l', [ 32.26, 80.69 ] ], [ 'l', [ 24.19, 80.69 ] ], [ 'l', [ 24.19, 88.76 ] ], [ 'l', [ 16.13, 88.76 ] ], [ 'l', [ 16.13, 104.9 ] ], [ 'l', [ 24.19, 104.9 ] ], [ 'l', [ 24.19, 121.04 ] ], [ 'l', [ 32.26, 121.04 ] ], [ 'l', [ 32.26, 129.11 ] ], [ 'l', [ 40.32, 129.11 ] ], [ 'l', [ 48.39, 129.11 ] ], [ 'l', [ 48.39, 137.17 ] ], [ 'l', [ 64.52, 137.17 ] ], [ 'b', [ 64.52, 137.18, 80.65, 137.18, 80.65, 137.18 ] ], [ 'l', [ 80.65, 129.11 ] ], [ 'l', [ 96.78, 129.11 ] ], [ 'l', [ 96.78, 121.04 ] ], [ 'l', [ 104.84, 121.04 ] ], [ 'l', [ 104.84, 104.9 ] ], [ 'l', [ 112.91, 104.9 ] ], [ 'l', [ 112.91, 88.76 ] ], [ 'l', [ 104.84, 88.76 ] ], [ 'l', [ 104.84, 80.69 ] ], [ 'l', [ 96.78, 80.69 ] ], [ 'l', [ 96.78, 64.55 ] ], [ 'l', [ 104.84, 64.55 ] ] ]
      const f = [ [ 'm', [ 80.65, 104.9 ] ], [ 'l', [ 72.58, 104.9 ] ], [ 'l', [ 72.58, 112.97 ] ], [ 'l', [ 64.52, 112.97 ] ], [ 'l', [ 64.52, 121.04 ] ], [ 'l', [ 72.58, 121.04 ] ], [ 'l', [ 80.65, 121.04 ] ], [ 'l', [ 80.65, 112.97 ] ], [ 'l', [ 88.71, 112.97 ] ], [ 'l', [ 88.71, 96.83 ] ], [ 'l', [ 80.65, 96.83 ] ], [ 'l', [ 80.65, 104.9 ] ] ]
      const g = [ [ 'm', [ 80.65, 56.48 ] ], [ 'l', [ 72.58, 56.48 ] ], [ 'l', [ 72.58, 64.55 ] ], [ 'l', [ 64.52, 64.55 ] ], [ 'l', [ 64.52, 72.62 ] ], [ 'l', [ 80.65, 72.62 ] ], [ 'l', [ 80.65, 64.55 ] ], [ 'l', [ 88.71, 64.55 ] ], [ 'l', [ 88.71, 48.42 ] ], [ 'l', [ 80.65, 48.42 ] ], [ 'l', [ 80.65, 56.48 ] ] ] 
      const h = [ [ 'm', [ 24.19, 121.04 ] ], [ 'l', [ 32.26, 121.04 ] ], [ 'l', [ 32.26, 112.97 ] ], [ 'l', [ 24.19, 112.97 ] ], [ 'l', [ 24.19, 121.04 ] ] ]
      const i = [ [ 'm', [ 88.71, 24.21 ] ], [ 'l', [ 96.78, 24.21 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 88.71, 16.14 ] ], [ 'l', [ 88.71, 24.21 ] ] ] 
      const j = [ [ 'm', [ 72.58, 16.14 ] ], [ 'l', [ 80.65, 16.14 ] ], [ 'l', [ 80.65, 8.07 ] ], [ 'l', [ 64.52, 8.07 ] ], [ 'l', [ 64.52, 8.07 ] ], [ 'l', [ 48.39, 8.07 ] ], [ 'l', [ 48.39, 16.14 ] ], [ 'l', [ 40.32, 16.14 ] ], [ 'l', [ 32.26, 16.14 ] ], [ 'l', [ 32.26, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 40.35 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 16.13, 56.48 ] ], [ 'l', [ 24.19, 56.48 ] ], [ 'l', [ 24.19, 48.42 ] ], [ 'l', [ 32.26, 48.42 ] ], [ 'l', [ 32.26, 32.28 ] ], [ 'l', [ 40.32, 32.28 ] ], [ 'l', [ 40.32, 24.21 ] ], [ 'l', [ 48.39, 24.21 ] ], [ 'l', [ 56.45, 24.21 ] ], [ 'l', [ 56.45, 16.14 ] ], [ 'l', [ 72.58, 16.14 ] ] ]
      const k = [ [ 'm', [ 32.26, 80.69 ] ], [ 'l', [ 24.19, 80.69 ] ], [ 'l', [ 24.19, 88.76 ] ], [ 'l', [ 16.13, 88.76 ] ], [ 'l', [ 16.13, 104.9 ] ], [ 'l', [ 24.19, 104.9 ] ], [ 'l', [ 24.19, 96.83 ] ], [ 'l', [ 32.26, 96.83 ] ], [ 'l', [ 32.26, 88.76 ] ], [ 'l', [ 40.32, 88.76 ] ], [ 'l', [ 40.32, 72.62 ] ], [ 'l', [ 32.26, 72.62 ] ], [ 'l', [ 32.26, 80.69 ] ] ]

      const { ctx } = this
      ctx.save()
      ctx.globalCompositeOperation = 'multiply'
      
      ctx.beginPath()
      this.g(a)
      ctx.closePath()
      
      ctx.fillStyle = CanvasColor.Grey2
      ctx.fill()
  
      ctx.restore() 
      
      ctx.beginPath()
      this.g(b)
      ctx.closePath()
      
      ctx.fillStyle = CanvasColor.Black
      ctx.fill()
      
      ctx.beginPath()
      this.g(c)
      ctx.closePath()
      
      this.g(d)
      ctx.closePath()
      
      this.g(e)
      ctx.closePath()
      
      ctx.fillStyle = CanvasColor.Red
      ctx.fill()
      
      ctx.beginPath()
      this.g(f)
      ctx.closePath()
      
      this.g(g)
      ctx.closePath()
  
      this.g(h)
      ctx.closePath()
  
      this.g(i)
      ctx.closePath()
  
      this.g(j)
      ctx.closePath()
  
      this.g(k)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Yellow
      ctx.fill()
      
    },
    'dash': () => {
      const a = [ [ 'm', [ 122.34, 59.59 ] ], [ 'l', [ 112.97, 59.59 ] ], [ 'l', [ 112.97, 67.66 ] ], [ 'l', [ 96.83, 67.66 ] ], [ 'l', [ 96.83, 59.59 ] ], [ 'l', [ 8.07, 59.59 ] ], [ 'l', [ 8.07, 67.66 ] ], [ 'l', [ 0, 67.66 ] ], [ 'l', [ 0, 99.92 ] ], [ 'l', [ 8.07, 99.92 ] ], [ 'l', [ 8.07, 107.98 ] ], [ 'l', [ 16.14, 107.98 ] ], [ 'l', [ 16.14, 116.05 ] ], [ 'l', [ 24.21, 116.05 ] ], [ 'l', [ 24.21, 124.11 ] ], [ 'l', [ 112.97, 124.11 ] ], [ 'l', [ 112.97, 116.05 ] ], [ 'l', [ 122.34, 116.05 ] ], [ 'l', [ 122.34, 59.59 ] ] ]
      const b = [ [ 'm', [ 27.14, 58 ] ], [ 'l', [ 27.14, 66.06 ] ], [ 'l', [ 19.07, 66.06 ] ], [ 'l', [ 19.07, 74.13 ] ], [ 'l', [ 11, 74.13 ] ], [ 'l', [ 11, 106.39 ] ], [ 'l', [ 19.07, 106.39 ] ], [ 'l', [ 19.07, 114.45 ] ], [ 'l', [ 107.83, 114.45 ] ], [ 'l', [ 107.83, 106.39 ] ], [ 'l', [ 113.52, 106.39 ] ], [ 'l', [ 113.52, 58 ] ], [ 'l', [ 27.14, 58 ] ] ] 
      const c = [ [ 'r', [19.88, 73.74, 88.75, 32.25 ] ] ] 
      const d = [ [ 'm', [ 25.4, 73.72 ] ], [ 'l', [ 19.86, 73.72 ] ], [ 'l', [ 19.86, 105.98 ] ], [ 'l', [ 80.88, 105.98 ] ], [ 'l', [ 80.88, 97.91 ] ], [ 'l', [ 25.4, 97.91 ] ], [ 'l', [ 25.4, 73.72 ] ] ]
      
      const { ctx } = this

      ctx.save()
      ctx.translate(20, 20)
      ctx.scale(0.7,0.7)

      ctx.save()
      
      ctx.globalCompositeOperation = 'multiply'
      ctx.beginPath()
      this.g(a)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Grey2
      ctx.fill()
      ctx.restore()
  
      ctx.beginPath()
      this.g(b)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Black
      ctx.fill()
  
      ctx.beginPath()
      this.g(c)
      ctx.fillStyle = CanvasColor.Red
      ctx.fill()
  
      ctx.beginPath()
      this.g(d)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Yellow
      ctx.fill()
      ctx.restore()
    },
    'b': () => {
  
      const a = [ [ 'm', [ 96.78, 161.38 ] ], [ 'l', [ 104.84, 161.38 ] ], [ 'l', [ 104.84, 153.31 ] ], [ 'l', [ 112.91, 153.31 ] ], [ 'l', [ 112.91, 145.24 ] ], [ 'l', [ 120.97, 145.24 ] ], [ 'l', [ 120.97, 137.17 ] ], [ 'l', [ 129.04, 137.17 ] ], [ 'l', [ 129.04, 112.97 ] ], [ 'l', [ 120.97, 112.97 ] ], [ 'l', [ 120.97, 104.9 ] ], [ 'l', [ 112.91, 104.9 ] ], [ 'l', [ 112.91, 88.76 ] ], [ 'l', [ 120.97, 88.76 ] ], [ 'l', [ 120.97, 80.69 ] ], [ 'l', [ 129.04, 80.69 ] ], [ 'l', [ 129.04, 56.48 ] ], [ 'l', [ 120.97, 56.48 ] ], [ 'l', [ 120.97, 48.41 ] ], [ 'l', [ 112.91, 48.41 ] ], [ 'l', [ 112.91, 40.35 ] ], [ 'l', [ 104.84, 40.35 ] ], [ 'l', [ 104.84, 32.28 ] ], [ 'l', [ 96.78, 32.28 ] ], [ 'l', [ 96.78, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 32.28 ] ], [ 'l', [ 16.13, 32.28 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 8.06, 40.35 ] ], [ 'l', [ 8.06, 48.41 ] ], [ 'l', [ 0, 48.41 ] ], [ 'l', [ 0, 177.52 ] ], [ 'l', [ 8.06, 177.52 ] ], [ 'l', [ 8.06, 185.59 ] ], [ 'l', [ 80.65, 185.59 ] ], [ 'l', [ 80.65, 177.52 ] ], [ 'l', [ 88.71, 177.52 ] ], [ 'l', [ 88.71, 169.45 ] ], [ 'l', [ 96.78, 169.45 ] ], [ 'l', [ 96.78, 161.38 ] ] ]
      const b = [ [ 'm', [ 16.13, 0 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 8.06, 8.07 ] ], [ 'l', [ 8.06, 137.17 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 16.13, 145.24 ] ], [ 'l', [ 24.19, 145.24 ] ], [ 'l', [ 24.19, 153.31 ] ], [ 'l', [ 32.26, 153.31 ] ], [ 'l', [ 32.26, 161.38 ] ], [ 'l', [ 104.84, 161.38 ] ], [ 'l', [ 104.84, 153.31 ] ], [ 'l', [ 112.91, 153.31 ] ], [ 'l', [ 112.91, 145.24 ] ], [ 'l', [ 120.97, 145.24 ] ], [ 'l', [ 120.97, 137.17 ] ], [ 'l', [ 129.04, 137.17 ] ], [ 'l', [ 129.04, 129.1 ] ], [ 'l', [ 137.1, 129.1 ] ], [ 'l', [ 137.1, 104.9 ] ], [ 'l', [ 129.04, 104.9 ] ], [ 'l', [ 129.04, 96.83 ] ], [ 'l', [ 120.97, 96.83 ] ], [ 'l', [ 120.97, 80.69 ] ], [ 'l', [ 129.04, 80.69 ] ], [ 'l', [ 129.04, 72.62 ] ], [ 'l', [ 137.1, 72.62 ] ], [ 'l', [ 137.1, 48.41 ] ], [ 'l', [ 129.04, 48.41 ] ], [ 'l', [ 129.04, 40.34 ] ], [ 'l', [ 120.97, 40.34 ] ], [ 'l', [ 120.97, 32.28 ] ], [ 'l', [ 112.91, 32.28 ] ], [ 'l', [ 112.91, 24.21 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 104.84, 16.14 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 96.78, 8.07 ] ], [ 'l', [ 88.71, 8.07 ] ], [ 'l', [ 88.71, 0 ] ], [ 'l', [ 16.13, 0 ] ] ]
      const c = [ [ 'm', [ 80.65, 56.48 ] ], [ 'l', [ 72.58, 56.48 ] ], [ 'l', [ 72.58, 64.55 ] ], [ 'l', [ 48.39, 64.55 ] ], [ 'l', [ 48.39, 24.21 ] ], [ 'l', [ 72.58, 24.21 ] ], [ 'l', [ 72.58, 32.28 ] ], [ 'l', [ 80.65, 32.28 ] ], [ 'l', [ 80.65, 56.48 ] ] ]
      const d = [ [ 'm', [ 80.65, 112.97 ] ], [ 'l', [ 72.58, 112.97 ] ], [ 'l', [ 72.58, 121.04 ] ], [ 'l', [ 48.39, 121.04 ] ], [ 'l', [ 48.39, 80.69 ] ], [ 'l', [ 72.58, 80.69 ] ], [ 'l', [ 72.58, 88.76 ] ], [ 'l', [ 80.65, 88.76 ] ], [ 'l', [ 80.65, 112.97 ] ] ]
      const e = [ [ 'm', [ 104.84, 32.28 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 96.78, 24.21 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 88.71, 16.14 ] ], [ 'l', [ 88.71, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 88.71, 137.17 ] ], [ 'l', [ 88.71, 129.1 ] ], [ 'l', [ 96.78, 129.1 ] ], [ 'l', [ 96.78, 121.04 ] ], [ 'l', [ 104.84, 121.04 ] ], [ 'l', [ 104.84, 112.97 ] ], [ 'l', [ 112.91, 112.97 ] ], [ 'l', [ 112.91, 88.76 ] ], [ 'l', [ 104.84, 88.76 ] ], [ 'l', [ 104.84, 80.69 ] ], [ 'l', [ 96.78, 80.69 ] ], [ 'l', [ 96.78, 64.55 ] ], [ 'l', [ 104.84, 64.55 ] ], [ 'l', [ 104.84, 56.48 ] ], [ 'l', [ 112.91, 56.48 ] ], [ 'l', [ 112.91, 32.28 ] ], [ 'l', [ 104.84, 32.28 ] ] ]
      const f = [ [ 'm', [ 80.65, 112.97 ] ], [ 'l', [ 72.58, 112.97 ] ], [ 'l', [ 72.58, 121.04 ] ], [ 'l', [ 56.45, 121.04 ] ], [ 'l', [ 56.45, 129.11 ] ], [ 'l', [ 80.65, 129.11 ] ], [ 'l', [ 80.65, 121.04 ] ], [ 'l', [ 88.71, 121.04 ] ], [ 'l', [ 88.71, 96.83 ] ], [ 'l', [ 80.65, 96.83 ] ], [ 'l', [ 80.65, 112.97 ] ] ]
      const g = [ [ 'm', [ 80.65, 56.48 ] ], [ 'l', [ 72.58, 56.48 ] ], [ 'l', [ 72.58, 64.55 ] ], [ 'l', [ 56.45, 64.55 ] ], [ 'l', [ 56.45, 72.62 ] ], [ 'l', [ 80.65, 72.62 ] ], [ 'l', [ 80.65, 64.55 ] ], [ 'l', [ 88.71, 64.55 ] ], [ 'l', [ 88.71, 40.35 ] ], [ 'l', [ 80.65, 40.35 ] ], [ 'l', [ 80.65, 56.48 ] ] ] 
      const h = [ [ 'm', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 24.19, 137.17 ] ], [ 'l', [ 24.19, 16.14 ] ], [ 'l', [ 88.71, 16.14 ] ], [ 'l', [ 88.71, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ] ] 
      
      const { ctx } = this

      ctx.save()
      ctx.globalCompositeOperation = 'multiply'
      
      ctx.beginPath()
      this.g(a)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Grey2
      ctx.fill()
      ctx.restore()
  
      ctx.beginPath()
      this.g(b)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Black
      ctx.fill()
  
      ctx.beginPath()
      this.g(c)
      ctx.closePath()
  
      this.g(d)
      ctx.closePath()
  
      this.g(e)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Red
      ctx.fill()
  
      ctx.beginPath()
      this.g(f)
      ctx.closePath()
  
      this.g(g)
      ctx.closePath()
  
      this.g(h)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Yellow
      ctx.fill()
  
    },
    'i': () => {
      const a = [ [ 'm', [ 72.58, 185.59 ] ], [ 'l', [ 72.58, 177.52 ] ], [ 'l', [ 80.65, 177.52 ] ], [ 'l', [ 80.65, 169.45 ] ], [ 'l', [ 88.71, 169.45 ] ], [ 'l', [ 88.71, 161.38 ] ], [ 'l', [ 96.78, 161.38 ] ], [ 'l', [ 96.78, 145.24 ] ], [ 'l', [ 88.71, 145.24 ] ], [ 'l', [ 88.71, 137.17 ] ], [ 'l', [ 80.65, 137.17 ] ], [ 'l', [ 80.65, 56.48 ] ], [ 'l', [ 88.71, 56.48 ] ], [ 'l', [ 88.71, 48.41 ] ], [ 'l', [ 96.78, 48.41 ] ], [ 'l', [ 96.78, 32.28 ] ], [ 'l', [ 88.71, 32.28 ] ], [ 'l', [ 88.71, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 32.28 ] ], [ 'l', [ 16.13, 32.28 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 8.06, 40.35 ] ], [ 'l', [ 8.06, 48.41 ] ], [ 'l', [ 0, 48.41 ] ], [ 'l', [ 0, 64.55 ] ], [ 'l', [ 8.06, 64.55 ] ], [ 'l', [ 8.06, 72.62 ] ], [ 'l', [ 16.13, 72.62 ] ], [ 'l', [ 16.13, 153.31 ] ], [ 'l', [ 8.06, 153.31 ] ], [ 'l', [ 8.06, 161.38 ] ], [ 'l', [ 0, 161.38 ] ], [ 'l', [ 0, 177.52 ] ], [ 'l', [ 8.06, 177.52 ] ], [ 'l', [ 8.06, 185.59 ] ], [ 'l', [ 72.58, 185.59 ] ] ]
      const b = [ [ 'm', [ 16.13, 0 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 8.06, 8.07 ] ], [ 'l', [ 8.06, 24.21 ] ], [ 'l', [ 16.13, 24.21 ] ], [ 'l', [ 16.13, 32.28 ] ], [ 'l', [ 24.19, 32.28 ] ], [ 'l', [ 24.19, 112.97 ] ], [ 'l', [ 16.13, 112.97 ] ], [ 'l', [ 16.13, 121.04 ] ], [ 'l', [ 8.06, 121.04 ] ], [ 'l', [ 8.06, 137.17 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 16.13, 145.24 ] ], [ 'l', [ 24.19, 145.24 ] ], [ 'l', [ 24.19, 153.31 ] ], [ 'l', [ 32.26, 153.31 ] ], [ 'l', [ 32.26, 161.38 ] ], [ 'l', [ 96.78, 161.38 ] ], [ 'l', [ 96.78, 153.31 ] ], [ 'l', [ 104.84, 153.31 ] ], [ 'l', [ 104.84, 137.17 ] ], [ 'l', [ 96.78, 137.17 ] ], [ 'l', [ 96.78, 129.1 ] ], [ 'l', [ 88.71, 129.1 ] ], [ 'l', [ 88.71, 48.41 ] ], [ 'l', [ 96.78, 48.41 ] ], [ 'l', [ 96.78, 40.34 ] ], [ 'l', [ 104.84, 40.34 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 96.78, 24.21 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 88.71, 16.14 ] ], [ 'l', [ 88.71, 8.07 ] ], [ 'l', [ 80.65, 8.07 ] ], [ 'l', [ 80.65, 0 ] ], [ 'l', [ 16.13, 0 ] ] ]
      const c = [ [ 'm', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 24.21 ] ], [ 'l', [ 32.26, 24.21 ] ], [ 'l', [ 32.26, 121.04 ] ], [ 'l', [ 16.13, 121.04 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 80.65, 137.17 ] ], [ 'l', [ 80.65, 121.04 ] ], [ 'l', [ 64.52, 121.04 ] ], [ 'l', [ 64.52, 24.21 ] ], [ 'l', [ 80.65, 24.21 ] ], [ 'l', [ 80.65, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ] ]
      const d = [ [ 'm', [ 32.26, 121.04 ] ], [ 'l', [ 16.13, 121.04 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 24.19, 137.17 ] ], [ 'l', [ 24.19, 129.1 ] ], [ 'l', [ 40.32, 129.1 ] ], [ 'l', [ 40.32, 32.28 ] ], [ 'l', [ 32.26, 32.28 ] ], [ 'l', [ 32.26, 121.04 ] ] ]
      const e = [ [ 'm', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 16.14 ] ], [ 'l', [ 80.65, 16.14 ] ], [ 'l', [ 80.65, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ] ]
      const f = [ [ 'm', [ 72.58, 129.1 ] ], [ 'l', [ 80.65, 129.1 ] ], [ 'l', [ 80.65, 121.04 ] ], [ 'l', [ 72.58, 121.04 ] ], [ 'l', [ 72.58, 129.1 ] ] ]
      
      const { ctx } = this

      ctx.save()
      ctx.globalCompositeOperation = 'multiply'
  
      ctx.beginPath()
      this.g(a)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Grey2
      ctx.fill()
      ctx.restore()
  
      ctx.beginPath()
      this.g(b)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Black
      ctx.fill()
  
      ctx.beginPath()
      this.g(c)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Red
      ctx.fill()
  
      ctx.beginPath()
      this.g(d)
      ctx.closePath()
  
      this.g(e)
      ctx.closePath()
  
      this.g(f)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Yellow
      ctx.fill()
  
    },  
    't': () => {
      const a = [ [ 'm', [ 120.97, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 32.28 ] ], [ 'l', [ 16.13, 32.28 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 8.06, 40.35 ] ], [ 'l', [ 8.06, 48.41 ] ], [ 'l', [ 0, 48.41 ] ], [ 'l', [ 0, 64.55 ] ], [ 'l', [ 8.06, 64.55 ] ], [ 'l', [ 8.06, 72.62 ] ], [ 'l', [ 32.26, 72.62 ] ], [ 'l', [ 32.26, 177.52 ] ], [ 'l', [ 40.32, 177.52 ] ], [ 'l', [ 40.32, 185.59 ] ], [ 'l', [ 72.58, 185.59 ] ], [ 'l', [ 72.58, 177.52 ] ], [ 'l', [ 80.65, 177.52 ] ], [ 'l', [ 80.65, 169.45 ] ], [ 'l', [ 88.71, 169.45 ] ], [ 'l', [ 88.71, 161.38 ] ], [ 'l', [ 96.78, 161.38 ] ], [ 'l', [ 96.78, 72.62 ] ], [ 'l', [ 104.84, 72.62 ] ], [ 'l', [ 104.84, 64.55 ] ], [ 'l', [ 112.91, 64.55 ] ], [ 'l', [ 112.91, 56.48 ] ], [ 'l', [ 120.97, 56.48 ] ], [ 'l', [ 120.97, 48.41 ] ], [ 'l', [ 129.04, 48.41 ] ], [ 'l', [ 129.04, 32.28 ] ], [ 'l', [ 120.97, 32.28 ] ], [ 'l', [ 120.97, 24.21 ] ] ]
      const b = [ [ 'm', [ 16.13, 0 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 8.06, 8.07 ] ], [ 'l', [ 8.06, 24.21 ] ], [ 'l', [ 16.13, 24.21 ] ], [ 'l', [ 16.13, 32.28 ] ], [ 'l', [ 24.19, 32.28 ] ], [ 'l', [ 24.19, 40.34 ] ], [ 'l', [ 32.26, 40.34 ] ], [ 'l', [ 32.26, 48.41 ] ], [ 'l', [ 40.32, 48.41 ] ], [ 'l', [ 40.32, 137.17 ] ], [ 'l', [ 48.39, 137.17 ] ], [ 'l', [ 48.39, 145.24 ] ], [ 'l', [ 56.45, 145.24 ] ], [ 'l', [ 56.45, 153.31 ] ], [ 'l', [ 64.52, 153.31 ] ], [ 'l', [ 64.52, 161.38 ] ], [ 'l', [ 96.78, 161.38 ] ], [ 'l', [ 96.78, 153.31 ] ], [ 'l', [ 104.84, 153.31 ] ], [ 'l', [ 104.84, 48.41 ] ], [ 'l', [ 129.04, 48.41 ] ], [ 'l', [ 129.04, 40.34 ] ], [ 'l', [ 137.1, 40.34 ] ], [ 'l', [ 137.1, 24.21 ] ], [ 'l', [ 129.04, 24.21 ] ], [ 'l', [ 129.04, 16.14 ] ], [ 'l', [ 120.97, 16.14 ] ], [ 'l', [ 120.97, 8.07 ] ], [ 'l', [ 112.91, 8.07 ] ], [ 'l', [ 112.91, 0 ] ], [ 'l', [ 16.13, 0 ] ] ] 
      const c = [ [ 'm', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 24.21 ] ], [ 'l', [ 48.39, 24.21 ] ], [ 'l', [ 48.39, 137.17 ] ], [ 'l', [ 80.65, 137.17 ] ], [ 'l', [ 80.65, 24.21 ] ], [ 'l', [ 112.91, 24.21 ] ], [ 'l', [ 112.91, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ] ]
      const d = [ [ 'm', [ 48.39, 137.18 ] ], [ 'l', [ 56.45, 137.18 ] ], [ 'l', [ 56.45, 32.28 ] ], [ 'l', [ 48.39, 32.28 ] ], [ 'l', [ 48.39, 137.18 ] ] ] 
      const e = [ [ 'm', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 24.21 ] ], [ 'l', [ 24.2, 24.21 ] ], [ 'l', [ 24.2, 16.14 ] ], [ 'l', [ 112.91, 16.14 ] ], [ 'l', [ 112.91, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ] ]
      
      const { ctx } = this

      ctx.save()
      ctx.globalCompositeOperation = 'multiply'
      
      ctx.beginPath()
      this.g(a)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Grey2
      ctx.fill()
      ctx.restore()
  
      ctx.beginPath()
      this.g(b)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Black
      ctx.fill()
  
      ctx.beginPath()
      this.g(c)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Red
      ctx.fill()
  
      ctx.beginPath()
      this.g(d)
      ctx.closePath()
  
      this.g(e)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Yellow
      ctx.fill()
  
    },
    'e': () => {
      const a = [ [ 'm', [ 96.78, 169.45 ] ], [ 'l', [ 104.84, 169.45 ] ], [ 'l', [ 104.84, 161.38 ] ], [ 'l', [ 112.91, 161.38 ] ], [ 'l', [ 112.91, 145.24 ] ], [ 'l', [ 104.84, 145.24 ] ], [ 'l', [ 104.84, 137.17 ] ], [ 'l', [ 64.52, 137.17 ] ], [ 'l', [ 64.52, 129.1 ] ], [ 'l', [ 72.58, 129.1 ] ], [ 'l', [ 72.58, 121.04 ] ], [ 'l', [ 80.65, 121.04 ] ], [ 'l', [ 80.65, 112.97 ] ], [ 'l', [ 88.71, 112.97 ] ], [ 'l', [ 88.71, 104.9 ] ], [ 'l', [ 96.78, 104.9 ] ], [ 'l', [ 96.78, 88.76 ] ], [ 'l', [ 88.71, 88.76 ] ], [ 'l', [ 88.71, 80.69 ] ], [ 'l', [ 64.52, 80.69 ] ], [ 'l', [ 64.52, 72.62 ] ], [ 'l', [ 88.71, 72.62 ] ], [ 'l', [ 88.71, 64.55 ] ], [ 'l', [ 96.78, 64.55 ] ], [ 'l', [ 96.78, 56.48 ] ], [ 'l', [ 104.84, 56.48 ] ], [ 'l', [ 104.84, 48.41 ] ], [ 'l', [ 112.91, 48.41 ] ], [ 'l', [ 112.91, 32.28 ] ], [ 'l', [ 104.84, 32.28 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 32.28 ] ], [ 'l', [ 16.13, 32.28 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 8.06, 40.35 ] ], [ 'l', [ 8.06, 48.41 ] ], [ 'l', [ 0, 48.41 ] ], [ 'l', [ 0, 177.52 ] ], [ 'l', [ 8.06, 177.52 ] ], [ 'l', [ 8.06, 185.59 ] ], [ 'l', [ 88.71, 185.59 ] ], [ 'l', [ 88.71, 177.52 ] ], [ 'l', [ 96.78, 177.52 ] ], [ 'l', [ 96.78, 169.45 ] ] ] 
      const b = [ [ 'm', [ 16.13, 0 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 8.06, 8.07 ] ], [ 'l', [ 8.06, 137.17 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 16.13, 145.24 ] ], [ 'l', [ 24.19, 145.24 ] ], [ 'l', [ 24.19, 153.31 ] ], [ 'l', [ 32.26, 153.31 ] ], [ 'l', [ 32.26, 161.38 ] ], [ 'l', [ 112.91, 161.38 ] ], [ 'l', [ 112.91, 153.31 ] ], [ 'l', [ 120.97, 153.31 ] ], [ 'l', [ 120.97, 137.17 ] ], [ 'l', [ 112.91, 137.17 ] ], [ 'l', [ 112.91, 129.1 ] ], [ 'l', [ 104.84, 129.1 ] ], [ 'l', [ 104.84, 121.04 ] ], [ 'l', [ 96.78, 121.04 ] ], [ 'l', [ 96.78, 112.97 ] ], [ 'l', [ 72.58, 112.97 ] ], [ 'l', [ 72.58, 104.9 ] ], [ 'l', [ 96.78, 104.9 ] ], [ 'l', [ 96.78, 96.83 ] ], [ 'l', [ 104.84, 96.83 ] ], [ 'l', [ 104.84, 80.69 ] ], [ 'l', [ 96.78, 80.69 ] ], [ 'l', [ 96.78, 72.62 ] ], [ 'l', [ 88.71, 72.62 ] ], [ 'l', [ 88.71, 64.55 ] ], [ 'l', [ 80.65, 64.55 ] ], [ 'l', [ 80.65, 56.48 ] ], [ 'l', [ 72.58, 56.48 ] ], [ 'l', [ 72.58, 48.41 ] ], [ 'l', [ 112.91, 48.41 ] ], [ 'l', [ 112.91, 40.34 ] ], [ 'l', [ 120.97, 40.34 ] ], [ 'l', [ 120.97, 24.21 ] ], [ 'l', [ 112.91, 24.21 ] ], [ 'l', [ 112.91, 16.14 ] ], [ 'l', [ 104.84, 16.14 ] ], [ 'l', [ 104.84, 8.07 ] ], [ 'l', [ 96.78, 8.07 ] ], [ 'l', [ 96.78, 0 ] ], [ 'l', [ 16.13, 0 ] ] ]
      const c = [ [ 'm', [ 96.78, 24.21 ] ], [ 'l', [ 96.78, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 96.78, 137.17 ] ], [ 'l', [ 96.78, 121.04 ] ], [ 'l', [ 48.39, 121.04 ] ], [ 'l', [ 48.39, 80.69 ] ], [ 'l', [ 80.65, 80.69 ] ], [ 'l', [ 80.65, 64.55 ] ], [ 'l', [ 48.39, 64.55 ] ], [ 'l', [ 48.39, 24.21 ] ], [ 'l', [ 96.78, 24.21 ] ] ]
      const d = [ [ 'm', [ 56.45, 129.11 ] ], [ 'l', [ 96.78, 129.11 ] ], [ 'l', [ 96.78, 121.04 ] ], [ 'l', [ 56.45, 121.04 ] ], [ 'l', [ 56.45, 129.11 ] ] ] 
      const e = [ [ 'm', [ 56.45, 72.62 ] ], [ 'l', [ 80.65, 72.62 ] ], [ 'l', [ 80.65, 64.55 ] ], [ 'l', [ 56.45, 64.55 ] ], [ 'l', [ 56.45, 72.62 ] ] ]
      const f = [ [ 'm', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 24.19, 137.17 ] ], [ 'l', [ 24.19, 16.14 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 96.78, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ] ]
      
      const { ctx } = this

      ctx.save()
      ctx.globalCompositeOperation = 'multiply'
      
      ctx.beginPath()
      this.g(a)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Grey2
      ctx.fill()
      ctx.restore()
  
      ctx.beginPath()
      this.g(b)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Black
      ctx.fill()
  
      ctx.beginPath()
      this.g(c)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Red
      ctx.fill()
  
      ctx.beginPath()
      this.g(d)
      ctx.closePath()
  
      this.g(e)
      ctx.closePath()
  
      this.g(f)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Yellow
      ctx.fill()
  
    },
    'r': () => {
      const a = [ [ 'm', [ 120.97, 48.41 ] ], [ 'l', [ 112.91, 48.41 ] ], [ 'l', [ 112.91, 40.35 ] ], [ 'l', [ 104.84, 40.35 ] ], [ 'l', [ 104.84, 32.28 ] ], [ 'l', [ 96.78, 32.28 ] ], [ 'l', [ 96.78, 24.21 ] ], [ 'l', [ 24.19, 24.21 ] ], [ 'l', [ 24.19, 32.28 ] ], [ 'l', [ 16.13, 32.28 ] ], [ 'l', [ 16.13, 40.35 ] ], [ 'l', [ 8.06, 40.35 ] ], [ 'l', [ 8.06, 48.41 ] ], [ 'l', [ 0, 48.41 ] ], [ 'l', [ 0, 177.52 ] ], [ 'l', [ 8.06, 177.52 ] ], [ 'l', [ 8.06, 185.59 ] ], [ 'l', [ 40.32, 185.59 ] ], [ 'l', [ 40.32, 177.52 ] ], [ 'l', [ 48.39, 177.52 ] ], [ 'l', [ 48.39, 169.45 ] ], [ 'l', [ 56.45, 169.45 ] ], [ 'l', [ 56.45, 161.38 ] ], [ 'l', [ 64.52, 161.38 ] ], [ 'l', [ 64.52, 177.52 ] ], [ 'l', [ 72.58, 177.52 ] ], [ 'l', [ 72.58, 185.59 ] ], [ 'l', [ 104.84, 185.59 ] ], [ 'l', [ 104.84, 177.52 ] ], [ 'l', [ 112.91, 177.52 ] ], [ 'l', [ 112.91, 169.45 ] ], [ 'l', [ 120.97, 169.45 ] ], [ 'l', [ 120.97, 161.38 ] ], [ 'l', [ 129.04, 161.38 ] ], [ 'l', [ 129.04, 137.17 ] ], [ 'l', [ 120.97, 137.17 ] ], [ 'l', [ 120.97, 129.1 ] ], [ 'l', [ 112.91, 129.1 ] ], [ 'l', [ 112.91, 121.04 ] ], [ 'l', [ 104.84, 121.04 ] ], [ 'l', [ 104.84, 112.97 ] ], [ 'l', [ 112.91, 112.97 ] ], [ 'l', [ 112.91, 104.9 ] ], [ 'l', [ 120.97, 104.9 ] ], [ 'l', [ 120.97, 96.83 ] ], [ 'l', [ 129.04, 96.83 ] ], [ 'l', [ 129.04, 56.48 ] ], [ 'l', [ 120.97, 56.48 ] ], [ 'l', [ 120.97, 48.41 ] ] ]
      const b = [ [ 'm', [ 16.13, 0 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 8.06, 8.07 ] ], [ 'l', [ 8.06, 137.17 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 16.13, 145.24 ] ], [ 'l', [ 24.19, 145.24 ] ], [ 'l', [ 24.19, 153.31 ] ], [ 'l', [ 32.26, 153.31 ] ], [ 'l', [ 32.26, 161.38 ] ], [ 'l', [ 64.52, 161.38 ] ], [ 'l', [ 64.52, 153.31 ] ], [ 'l', [ 72.58, 153.31 ] ], [ 'l', [ 72.58, 137.17 ] ], [ 'l', [ 80.65, 137.17 ] ], [ 'l', [ 80.65, 145.24 ] ], [ 'l', [ 88.71, 145.24 ] ], [ 'l', [ 88.71, 153.31 ] ], [ 'l', [ 96.78, 153.31 ] ], [ 'l', [ 96.78, 161.38 ] ], [ 'l', [ 129.04, 161.38 ] ], [ 'l', [ 129.04, 153.31 ] ], [ 'l', [ 137.1, 153.31 ] ], [ 'l', [ 137.1, 129.1 ] ], [ 'l', [ 129.04, 129.1 ] ], [ 'l', [ 129.04, 121.04 ] ], [ 'l', [ 120.97, 121.04 ] ], [ 'l', [ 120.97, 112.97 ] ], [ 'l', [ 112.91, 112.97 ] ], [ 'l', [ 112.91, 104.9 ] ], [ 'l', [ 120.97, 104.9 ] ], [ 'l', [ 120.97, 96.83 ] ], [ 'l', [ 129.04, 96.83 ] ], [ 'l', [ 129.04, 88.76 ] ], [ 'l', [ 137.1, 88.76 ] ], [ 'l', [ 137.1, 48.41 ] ], [ 'l', [ 129.04, 48.41 ] ], [ 'l', [ 129.04, 40.34 ] ], [ 'l', [ 120.97, 40.34 ] ], [ 'l', [ 120.97, 32.28 ] ], [ 'l', [ 112.91, 32.28 ] ], [ 'l', [ 112.91, 24.21 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 104.84, 16.14 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 96.78, 8.07 ] ], [ 'l', [ 88.71, 8.07 ] ], [ 'l', [ 88.71, 0 ] ], [ 'l', [ 16.13, 0 ] ] ] 
      const c = [ [ 'm', [ 80.65, 72.62 ] ], [ 'l', [ 72.58, 72.62 ] ], [ 'l', [ 72.58, 80.69 ] ], [ 'l', [ 48.39, 80.69 ] ], [ 'l', [ 48.39, 24.21 ] ], [ 'l', [ 72.58, 24.21 ] ], [ 'l', [ 72.58, 32.28 ] ], [ 'l', [ 80.65, 32.28 ] ], [ 'l', [ 80.65, 72.62 ] ] ] 
      const d = [ [ 'm', [ 104.84, 32.28 ] ], [ 'l', [ 104.84, 24.21 ] ], [ 'l', [ 96.78, 24.21 ] ], [ 'l', [ 96.78, 16.14 ] ], [ 'l', [ 88.71, 16.14 ] ], [ 'l', [ 88.71, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 137.17 ] ], [ 'l', [ 48.39, 137.17 ] ], [ 'l', [ 48.39, 96.83 ] ], [ 'l', [ 64.52, 96.83 ] ], [ 'l', [ 64.52, 104.9 ] ], [ 'l', [ 72.58, 104.9 ] ], [ 'l', [ 72.58, 112.97 ] ], [ 'l', [ 80.65, 112.97 ] ], [ 'l', [ 80.65, 137.17 ] ], [ 'l', [ 112.91, 137.17 ] ], [ 'l', [ 112.91, 112.97 ] ], [ 'l', [ 104.84, 112.97 ] ], [ 'l', [ 104.84, 104.9 ] ], [ 'l', [ 96.78, 104.9 ] ], [ 'l', [ 96.78, 96.83 ] ], [ 'l', [ 88.71, 96.83 ] ], [ 'l', [ 88.71, 88.76 ] ], [ 'l', [ 96.78, 88.76 ] ], [ 'l', [ 96.78, 80.69 ] ], [ 'l', [ 104.84, 80.69 ] ], [ 'l', [ 104.84, 72.62 ] ], [ 'l', [ 112.91, 72.62 ] ], [ 'l', [ 112.91, 32.28 ] ], [ 'l', [ 104.84, 32.28 ] ] ] 
      const e = [ [ 'm', [ 80.65, 137.18 ] ], [ 'l', [ 88.71, 137.18 ] ], [ 'l', [ 88.71, 121.04 ] ], [ 'l', [ 80.65, 121.04 ] ], [ 'l', [ 80.65, 137.18 ] ] ] 
      const f = [ [ 'm', [ 80.65, 72.62 ] ], [ 'l', [ 72.58, 72.62 ] ], [ 'l', [ 72.58, 80.69 ] ], [ 'l', [ 56.45, 80.69 ] ], [ 'l', [ 56.45, 88.76 ] ], [ 'l', [ 80.65, 88.76 ] ], [ 'l', [ 80.65, 80.69 ] ], [ 'l', [ 88.71, 80.69 ] ], [ 'l', [ 88.71, 40.35 ] ], [ 'l', [ 80.65, 40.35 ] ], [ 'l', [ 80.65, 72.62 ] ] ] 
      const g = [ [ 'm', [ 16.13, 8.07 ] ], [ 'l', [ 16.13, 137.18 ] ], [ 'l', [ 24.19, 137.18 ] ], [ 'l', [ 24.19, 16.14 ] ], [ 'l', [ 88.71, 16.14 ] ], [ 'l', [ 88.71, 8.07 ] ], [ 'l', [ 16.13, 8.07 ] ] ] 
      
      const { ctx } = this

      ctx.save()
      ctx.globalCompositeOperation = 'multiply'
      
      ctx.beginPath()
      this.g(a)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Grey2
      ctx.fill()
      ctx.restore()
  
      ctx.beginPath()
      this.g(b)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Black
      ctx.fill()
  
      ctx.beginPath()
      this.g(c)
      ctx.closePath()
  
      this.g(d)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Red
      ctx.fill()
  
      ctx.beginPath()
      this.g(e)
      ctx.closePath()
  
      this.g(f)
      ctx.closePath()
  
      this.g(g)
      ctx.closePath()
  
      ctx.fillStyle = CanvasColor.Yellow
      ctx.fill()
  
    }
  }
}

