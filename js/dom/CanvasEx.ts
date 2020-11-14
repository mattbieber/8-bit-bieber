import { Pressable } from './traits'
import { ColorKey } from './color'
import { Config } from '../app/App'
import {  EBBVector, 
          EBBArea, 
          EBBGeo } from './structs'

/**
 * 🐙
 * @typedef
 * defines an array of clickable canvas elements
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type KhanvasElementRegistry = Array<Pressable>

/**
 * 🐙
 * @typedef
 * defines an array of canvas redering contexts
 * used in shadow canvas pattern
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type ContextCollection = CanvasRenderingContext2D[]

/**
 * 🐙
 * @typedef
 * callback hook for mouse events
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type Hook = (e: MouseEvent) => void

/**
 * 🐙
 * @typedef
 * callback hook for mouse events
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type MouseHook = Record<string, Hook>

/**
 * screen geometry struct
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export const GEO: EBBGeo = {
  clientRect: { w: window.innerWidth, h: window.innerHeight },
  centerPoint: { x: Math.floor(window.innerWidth/2), y: Math.floor(window.innerHeight/2) },
  scale: window.devicePixelRatio || 1,
  offsets: {}
}

/**
 * 🐳 abstract wrapper class for an HTMLCanvasElement and
 * an offscreen hitCanvas for tracking  
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export abstract class CanvasEx {
  
  /** derived properties */
  abstract config: Config
  abstract started: boolean
  abstract wasmChange: (e: CustomEvent<any> | null) => void

  /** derived implementations */
  abstract onMouse(e: MouseEvent, element: Pressable) : void
  abstract layoutChildCanvas(e: CustomEvent<EBBArea> | null) : void
  abstract hasStarted(started: boolean) : void
  

  /** properties */
  private uiElements: KhanvasElementRegistry = []
  private mouseHooks: MouseHook = {}

  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  hitCtx: CanvasRenderingContext2D
  hitCanvas: HTMLCanvasElement
  contexts: ContextCollection = []
  activeElement: Pressable | null = null
  
  /**
   * 
   * @param e MouseEvent - click event
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  handleMouse = (e: MouseEvent) : void => {
    
    if(e.type === 'mousedown') {
     
      const rect = this.canvas.getBoundingClientRect()
      const pos = {
        x: e.clientX * GEO.scale,
        y: (e.clientY - rect.top) * GEO.scale
      }
      
      for (let fn in this.mouseHooks) {
        this.mouseHooks[fn](e)
      }

      const px = this.hitCtx.getImageData(pos.x, pos.y, 1, 1).data
      this.activeElement = this.uiElements[px[0]-1]
    }
    
    if(!this.activeElement) return

    this.onMouse(e, this.activeElement)
  }



  handleMouseDown = (e: MouseEvent) => {
    this.handleMouse(e)
    this.canvas.addEventListener('mousemove', this.handleMouse, false )
  }

  handleMouseUp = (e: MouseEvent) => {
    this.canvas.removeEventListener('mousemove', this.handleMouse, false )
    this.activeElement = null
  }


  /**
   * 
   * @param e MouseEvent - click event
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  hookMouse = (k: string, fn: Hook) => {
    this.mouseHooks[k] = fn
  }

  unhookMouse = (fn: string) => {
    let newhooks: MouseHook = {}
    for(let k in this.mouseHooks) {
      if(k != fn) newhooks[k] = this.mouseHooks[k]  
    }

    this.mouseHooks = newhooks 
    
  }

  /**
   * 
   * @param id string - the DOM id of the canvas
   * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  constructor(public readonly id: string) {
    
    this.canvas = document.getElementById(id) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    
    this.hitCanvas = document.createElement('canvas')
    this.hitCtx = this.hitCanvas.getContext('2d') as CanvasRenderingContext2D

    this.contexts.push(this.ctx, this.hitCtx)

    this.canvas.addEventListener('click', this.handleMouse, false)
    this.canvas.addEventListener('mousedown', this.handleMouseDown, false )
    this.canvas.addEventListener('mouseup', this.handleMouseUp, false )

    // @ts-ignore - custom event name on document is permissible
    document.addEventListener('resizenotification', this.layoutCanvas)
    
    
    
  }

  /**
   * 
   * @param e 
   * - - - - - - - - - - - - - - - - - - - - - - - - - - */
  layoutCanvas = (e: CustomEvent<EBBArea>) => {

    GEO.clientRect = e.detail

    GEO.centerPoint = {
      x: Math.round(GEO.clientRect.w/2),
      y: Math.round(GEO.clientRect.h/2)
    }

    const { scale } = GEO
    const { w, h } = GEO.clientRect

    this.canvas.height = this.hitCanvas.height = scale*h
    this.canvas.width = this.hitCanvas.width = scale*w
      
    this.contexts.forEach(ctx => {
     ctx.scale(scale, scale)
    })

    this.canvas.style.width = this.hitCanvas.style.width = `${ GEO.clientRect.w }px`
    this.canvas.style.height = this.hitCanvas.style.height =`${ GEO.clientRect.h }px`

        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.layoutChildCanvas(e)
  
  }

  registerUIElement(element: any) : ColorKey {
    const key = this.uiElements.push(element)
    const color = `rgb(${key},0,0)`
    return [key, color]
    
  }

  draw() {

  }
}
