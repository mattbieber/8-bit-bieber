import {  EBBVector, 
          EBBAnimationData,
          EBBRenderData,
          EBBDrawingData,
          EBBDirection,
          EBBArea
           } from './structs'


// export class Boundry {
//   metrics: KhanvasMetrics = { x: 0, y: 0, w: 0, h: 0 }
//   

export abstract class SceneNode {

  rd: EBBRenderData
  ad: Record<string, EBBAnimationData>
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D, d: EBBDrawingData) {
    this.ctx = ctx
    this.ad = d.ad
    this.rd = d.rd
  }

 
  shouldUpdate(step: number, anim: string = 'default') : boolean {
    const { ad } = this
    const r = Math.floor(Math.random()*(ad[anim].maxLapse - ad[anim].minLapse) + ad[anim].minLapse)
    let ts = ad[anim].lastAnimatedStep + r  + ad[anim].velocity
    if(anim === 'body') {
    // console.log(`step: ${step} lastAnimatedStep: ${ ad[anim].lastAnimatedStep } vel: ${ad[anim].velocity} r: ${r} ts: ${ts}`)
    }
    
    return step > ts
  }

  abstract draw() : void

  g = (a: any) => {

    for (let entry of a) {
      const [ cmd, data ]: [ cmd:string, data: Array<number> ] = entry
      
      switch (cmd) {
        case 'b':
          // @ts-ignore
          this.ctx.bezierCurveTo(...data)
          break
        case 'l':
          // @ts-ignore
          this.ctx.lineTo(...data)
          break
        case 'r':
          // @ts-ignore
          this.ctx.rect(...data)
          break
        case 'm':
          // @ts-ignore
          this.ctx.moveTo(...data)
          break
        
      }
    }
  }
  
  // willCollide(x: number, y: number, w: number, h: number) : EBBDirection[] {
  //   const { rd } = this

  //   const result = []
    
  //     ((rd.pos.y+rd.dimensions.h) < y)
  //     (rd.pos.y > (y + h)) ||
  //     ((rd.pos.x+rd.dimensions.w) < x) ||
  //     (rd.pos.x > (x+w))
       
    
  // }    

  render(rd: EBBRenderData) {
    this.ctx.save()
    this.rd = rd
    this.draw()
    this.ctx.restore()

  }
}