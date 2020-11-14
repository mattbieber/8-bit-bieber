import { AudioEventType, Callback, EventEmitter, SubscriberRegistry} from '../../audio/events'
import { CanvasColor, ColorKey } from '../../dom/color'
import { EBBCircleMetrics, EBBRectMetrics, EBBVector } from '../../dom/structs'
import { Pressable } from '../../dom/traits'
import { ContextCollection, GEO } from '../../dom/CanvasEx'
import { roundedRect, radToDeg, normalizeVal, normalizeTan } from './util'


/**
 * 🐙
 * @typedef
 * defines dictionary of overridable knob settings
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type KnobValueChangeCallback = (args: {rad: number, deg: number, value: number}) => void

/**
 * 🐙
 * @typedef
 * defines dictionary of overridable knob settings
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type KnobProperties = {
  backColor: CanvasColor,
  color: CanvasColor,
  showMarkers: boolean,
  showValue: boolean,
  showCenterDot: boolean,
  minValue: number,
  maxValue: number,
  radius: number,
  onValueChangeCallback: KnobValueChangeCallback,
  ang_degrees: number,
  normalizedValue: number,
  tickColor: CanvasColor,
  step: number,
  scaleWidth: number,
  fillWidth: number,
  knobWidth: number,
  startAngle: number,
  endAngle: number
}

/**
 * 🐳 Knob class
 * @extends EventEmitter
 * @implements Pressable
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export class Knob extends EventEmitter implements Pressable {
  
  // subscribers: SubscriberRegistry = {}
  private cache: Path2D = new Path2D()
  private cache2: Path2D = new Path2D()

  props: KnobProperties = {
    backColor: CanvasColor.Black,
    color: CanvasColor.Grey8,
    showMarkers: false,
    showValue: false,
    showCenterDot: true,
    minValue: 0,
    maxValue: 360,
    radius: 80,
    // @ts-ignore
    onValueChangeCallback: (args) => { 
      return 
    },
    tickColor: CanvasColor.Black,
    ang_degrees: 0,
    normalizedValue: 0,
    step: 50,
    scaleWidth: 34,
    fillWidth: 20,
    knobWidth: 42,
    startAngle: 0.75 * Math.PI + 0.000001,
    endAngle: 0
  }

  x0: number = 0
  y0: number = 0
  colorKey: ColorKey = [-1, '']
  isPressed: boolean = false
  isDisabled: boolean = false
  ctxs: ContextCollection = []
  fill1 = CanvasColor.EOEWhite
  fill2 = CanvasColor.EOEOrange
  fill3 = CanvasColor.EOEBrown
  scale: EBBVector = { x: 0, y: 0 }
  value: number = 300

/**
  * Knob constructor
  * @param props { KnobProperties } - knob configuration settings
  * @param metrics { EBBCircleMetics } - metrics
  * @param ctxs { ContextCollection } - visible & offscreen convas contexts
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  constructor(props: KnobProperties, private metrics: EBBCircleMetrics, ctxs: ContextCollection) {
    super()

    Object.assign(this.props, props)
    this.ctxs = ctxs    
    this.x0 = metrics.w / 2
    this.y0 = metrics.h / 2 

  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  onMouseMove(e: MouseEvent) {

    let x = e.clientX-this.metrics.x
    let y = e.clientY-this.metrics.y
    
    this.calculateAngles({ x, y })
    this.draw()
    this.emit(AudioEventType.Toggle, ['asd'])

    // this.emit(AudioEventType.Toggle, ['asd'])
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  onMouseClick(e: MouseEvent) {
   
   this.onMouseMove(e)
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  update() {

  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  animate = () => {
   
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  markers() {

    const ctx = this.ctxs[0]
    ctx.save()
    const { props, metrics } = this
    ctx.translate(this.metrics.x+60, this.metrics.y+10)
    
    ctx.scale(this.scale.x*0.7, this.scale.y*0.7)

    roundedRect(ctx, { x: 197.3, y: -0.03, w: 5.5, h: 48.1, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()



    ctx.save()
    ctx.translate(185.35, 31.62)
    ctx.rotate(-5 * Math.PI / 180)
    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(170.7, 33.57)
    ctx.rotate(-10 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(156.3, 36.77)
    ctx.rotate(-15 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(142.25, 41.17)
    ctx.rotate(-20 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(128.65, 46.82)
    ctx.rotate(-25.05 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(115.55, 53.67)
    ctx.rotate(-30.05 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(103.1, 61.57)
    ctx.rotate(-35 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.translate(91.4, 70.52)
    ctx.rotate(-40 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(75.55, 75.52)
    ctx.rotate(45 * Math.PI / 180)

    roundedRect(ctx, { x: -24.05, y: -2.75, w: 48.1, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(70.6, 91.37)
    ctx.rotate(39.95 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(61.6, 103.07)
    ctx.rotate(35 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(53.7, 115.52)
    ctx.rotate(30 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(46.9, 128.57)
    ctx.rotate(25.05 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(41.25, 142.22)
    ctx.rotate(20 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(36.8, 156.27)
    ctx.rotate(15 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(33.6, 170.67)
    ctx.rotate(10 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(31.7, 185.27)
    ctx.rotate(5 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()


    //// Bezier Drawing
    ctx.beginPath()
    ctx.moveTo(48.09, 200.02)
    ctx.lineTo(48.09, 200.02)
    ctx.bezierCurveTo(48.09, 201.54, 46.86, 202.77, 45.35, 202.77)
    ctx.lineTo(2.75, 202.77)
    ctx.bezierCurveTo(1.23, 202.77, -0, 201.54, -0, 200.02)
    ctx.bezierCurveTo(-0, 198.5, 1.23, 197.27, 2.75, 197.27)
    ctx.lineTo(45.35, 197.27)
    ctx.bezierCurveTo(46.86, 197.27, 48.09, 198.5, 48.09, 200.02)
    ctx.closePath()
    ctx.fillStyle = props.tickColor
    ctx.fill()



    ctx.save()
    ctx.translate(31.7, 214.77)
    ctx.rotate(-5 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(33.6, 229.37)
    ctx.rotate(-10 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(36.8, 243.77)
    ctx.rotate(-15 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(41.25, 257.82)
    ctx.rotate(-20 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(46.9, 271.47)
    ctx.rotate(-25 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(53.7, 284.52)
    ctx.rotate(-30 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(61.6, 296.97)
    ctx.rotate(-35 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(70.6, 308.67)
    ctx.rotate(-40 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(75.6, 324.47)
    ctx.rotate(45 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -24.05, w: 5.5, h: 48.1, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(323.35, 324.67)
    ctx.rotate(45 * Math.PI / 180)

    roundedRect(ctx, { x: -24.05, y: -2.75, w: 48.1, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(329.55, 308.67)
    ctx.rotate(39.95 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(338.5, 296.97)
    ctx.rotate(35 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(346.45, 284.52)
    ctx.rotate(30.05 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(353.25, 271.47)
    ctx.rotate(25.05 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(358.9, 257.82)
    ctx.rotate(19.95 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(363.35, 243.77)
    ctx.rotate(15 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(366.5, 229.37)
    ctx.rotate(10 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(368.45, 214.77)
    ctx.rotate(5 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    roundedRect(ctx, { x: 351.9, y: 197.27, w: 48.1, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()



    ctx.save()
    ctx.translate(368.45, 185.27)
    ctx.rotate(-5 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(366.5, 170.67)
    ctx.rotate(-10 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(363.35, 156.27)
    ctx.rotate(-14.95 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(358.9, 142.22)
    ctx.rotate(-20 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(353.25, 128.57)
    ctx.rotate(-25 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(346.45, 115.52)
    ctx.rotate(-30.05 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(338.5, 103.07)
    ctx.rotate(-35 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(329.55, 91.37)
    ctx.rotate(-40 * Math.PI / 180)

    roundedRect(ctx, { x: -17.18, y: -2.75, w: 34.35, h: 5.5, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(324.55, 75.52)
    ctx.rotate(45 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -24.05, w: 5.5, h: 48.1, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(308.7, 70.52)
    ctx.rotate(40 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(297, 61.57)
    ctx.rotate(35 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(284.6, 53.67)
    ctx.rotate(30 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(271.5, 46.82)
    ctx.rotate(25 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(257.85, 41.17)
    ctx.rotate(20 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(243.8, 36.77)
    ctx.rotate(15 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(229.4, 33.57)
    ctx.rotate(10 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()



    ctx.save()
    ctx.translate(214.8, 31.62)
    ctx.rotate(5.05 * Math.PI / 180)

    roundedRect(ctx, { x: -2.75, y: -17.18, w: 5.5, h: 34.35, r: 2.75 })
    ctx.fillStyle = props.tickColor
    ctx.fill()

    ctx.restore()


    //// Bezier 4 Drawing
    ctx.beginPath()
    ctx.moveTo(86.99, 356.67)
    ctx.lineTo(86.99, 338.97)
    ctx.lineTo(90.51, 338.97)
    ctx.lineTo(94.71, 351.5)
    ctx.bezierCurveTo(95.09, 352.67, 95.37, 353.54, 95.55, 354.12)
    ctx.bezierCurveTo(95.75, 353.48, 96.07, 352.53, 96.49, 351.29)
    ctx.lineTo(100.73, 338.97)
    ctx.lineTo(103.88, 338.97)
    ctx.lineTo(103.88, 356.67)
    ctx.lineTo(101.63, 356.67)
    ctx.lineTo(101.63, 341.85)
    ctx.lineTo(96.48, 356.67)
    ctx.lineTo(94.37, 356.67)
    ctx.lineTo(89.25, 341.6)
    ctx.lineTo(89.25, 356.67)
    ctx.lineTo(86.99, 356.67)
    ctx.closePath()
    ctx.fillStyle = props.tickColor
    ctx.fill()



    ctx.beginPath()
    ctx.rect(108.07, 338.97, 2.35, 17.7)
    ctx.fillStyle = props.tickColor
    ctx.fill()


    //// Bezier 5 Drawing
    ctx.beginPath()
    ctx.moveTo(114.51, 356.67)
    ctx.lineTo(114.51, 338.97)
    ctx.lineTo(116.92, 338.97)
    ctx.lineTo(126.22, 352.87)
    ctx.lineTo(126.22, 338.97)
    ctx.lineTo(128.46, 338.97)
    ctx.lineTo(128.46, 356.67)
    ctx.lineTo(126.06, 356.67)
    ctx.lineTo(116.76, 342.76)
    ctx.lineTo(116.76, 356.67)
    ctx.lineTo(114.51, 356.67)
    ctx.closePath()
    ctx.fillStyle = props.tickColor
    ctx.fill()


    //// Bezier 6 Drawing
    ctx.beginPath()
    ctx.moveTo(258.07, 356.67)
    ctx.lineTo(258.07, 338.97)
    ctx.lineTo(261.59, 338.97)
    ctx.lineTo(265.79, 351.5)
    ctx.bezierCurveTo(266.17, 352.67, 266.45, 353.54, 266.63, 354.12)
    ctx.bezierCurveTo(266.83, 353.48, 267.15, 352.53, 267.57, 351.29)
    ctx.lineTo(271.81, 338.97)
    ctx.lineTo(274.96, 338.97)
    ctx.lineTo(274.96, 356.67)
    ctx.lineTo(272.71, 356.67)
    ctx.lineTo(272.71, 341.85)
    ctx.lineTo(267.56, 356.67)
    ctx.lineTo(265.45, 356.67)
    ctx.lineTo(260.33, 341.6)
    ctx.lineTo(260.33, 356.67)
    ctx.lineTo(258.07, 356.67)
    ctx.closePath()
    ctx.fillStyle = props.tickColor
    ctx.fill()


    //// Bezier 7 Drawing
    ctx.beginPath()
    ctx.moveTo(281.91, 349.4)
    ctx.lineTo(287.91, 349.4)
    ctx.lineTo(286.06, 344.5)
    ctx.bezierCurveTo(285.5, 343.01, 285.08, 341.79, 284.81, 340.83)
    ctx.bezierCurveTo(284.58, 341.96, 284.26, 343.09, 283.85, 344.21)
    ctx.lineTo(281.91, 349.4)
    ctx.closePath()
    ctx.moveTo(276.8, 356.67)
    ctx.lineTo(283.6, 338.97)
    ctx.lineTo(286.12, 338.97)
    ctx.lineTo(293.37, 356.67)
    ctx.lineTo(290.7, 356.67)
    ctx.lineTo(288.64, 351.31)
    ctx.lineTo(281.23, 351.31)
    ctx.lineTo(279.29, 356.67)
    ctx.lineTo(276.8, 356.67)
    ctx.closePath()
    ctx.fillStyle = props.tickColor
    ctx.fill()


    //// Bezier 8 Drawing
    ctx.beginPath()
    ctx.moveTo(293.44, 356.67)
    ctx.lineTo(300.29, 347.45)
    ctx.lineTo(294.25, 338.97)
    ctx.lineTo(297.04, 338.97)
    ctx.lineTo(300.25, 343.51)
    ctx.bezierCurveTo(300.92, 344.45, 301.4, 345.18, 301.68, 345.68)
    ctx.bezierCurveTo(302.07, 345.04, 302.54, 344.37, 303.08, 343.67)
    ctx.lineTo(306.64, 338.97)
    ctx.lineTo(309.19, 338.97)
    ctx.lineTo(302.97, 347.31)
    ctx.lineTo(309.67, 356.67)
    ctx.lineTo(306.78, 356.67)
    ctx.lineTo(302.32, 350.36)
    ctx.bezierCurveTo(302.07, 349.99, 301.81, 349.6, 301.55, 349.17)
    ctx.bezierCurveTo(301.15, 349.82, 300.87, 350.26, 300.7, 350.5)
    ctx.lineTo(296.26, 356.67)
    ctx.lineTo(293.44, 356.67)
    ctx.closePath()
    ctx.fillStyle = props.tickColor
    ctx.fill()
    
    ctx.restore()
    ctx.restore()

  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  render(p: number) {
    let real = true
    
    const ctx = this.ctxs[0]
    ctx.save()
    ctx.translate(this.metrics.x, this.metrics.y)
    const { x, y } = this.scale
    ctx.scale(x, y)
    // ctx.strokeRect(0, 0, this.metrics.w, this.metrics.h)
   

      // // back
      // const m1: EBBRectMetrics = { x: 43, y: 37, w: 98, h: 98 }
      // oval(ctx, m1)
      // ctx.fillStyle = this.fill3
      // ctx.fill()

      // ctx.strokeStyle = this.fill1
      // ctx.lineWidth = 8
      // ctx.stroke()

    ctx.restore()
    

    this.setSliderValue(this.value) //this.props.minValue

  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  setSliderValue(value: number) {
    let { props } = this
    
    if (value <= props.minValue) {
      props.endAngle = props.startAngle
      props.ang_degrees = 0
      props.normalizedValue = 0
    } else if (value >= 220) {
      props.endAngle = props.endAngle
      props.ang_degrees = 360
      props.normalizedValue = 220
    } else {
      value = (value / props.step >> 0) * props.step

      props.endAngle = 2 * Math.PI * (value - props.minValue) / (props.maxValue - props.minValue) - Math.PI / 2
      props.ang_degrees = radToDeg(normalizeTan(props.endAngle))
      props.normalizedValue = value
    
    }
  
      this.draw()
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  draw() {
    const { x, y, w, h } = this.metrics
    let real = true
    
    for (let ctx of this.ctxs) {
      
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = CanvasColor.EOEBrown
      ctx.fillRect(0, 0, w, h)
      // ctx.strokeStyle = 'red'
      // ctx.strokeRect(0, 0, w, h)
      
      ctx.scale(this.scale.x, this.scale.y)
      this.drawScale(real)
      this.drawData(real)
      // this.drawKnob(real)
      
      this.props.onValueChangeCallback({
        'rad': this.props.endAngle, 
        'deg': this.props.ang_degrees, 
        'value': this.props.normalizedValue
      })
    
      if(this.props.showCenterDot) {
        // this.drawCenterDot(real)

      }
    
      if(this.props.showValue) {
        this.drawValue(real)
      }

      ctx.restore()
      real = false
      
    }

    if(this.props.showMarkers) {
      this.markers()
    }
    


  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  drawValue(real: boolean) {
    const { props, metrics } = this
    const ctx = real ? this.ctxs[0] : this.ctxs[1]
    const color = real ? props.backColor : this.colorKey[1]
    
    const sz = 50
    ctx.font = `${ sz }px Digital Display`
    ctx.fillStyle = CanvasColor.EOEOrange
    
    let shift = props.normalizedValue > 99 ? 32 : 22
    if(props.normalizedValue<10) shift = 10
    ctx.fillText(props.normalizedValue.toString(), (metrics.w/2-shift), (metrics.h/2+10))

  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  drawScale(real: boolean) {
    
    const { props } = this
    const ctx = real ? this.ctxs[0] : this.ctxs[1]
    const color = real ? props.backColor : this.colorKey[1]
   
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.arc(this.x0, this.y0, props.radius, 0, 2*Math.PI)
    ctx.lineWidth = props.scaleWidth
    ctx.stroke()
   
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  drawCenterDot (real: boolean) {
    
    const { props } = this
    const ctx = real ? this.ctxs[0] : this.ctxs[1]
    const color = real ? props.backColor : this.colorKey[1]

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.arc(this.x0, this.y0, this.props.radius, 0, Math.PI*2, false)
    ctx.lineWidth = 1
    ctx.fillStyle = color
    ctx.fill()
  
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  drawData(real: boolean) {

    const { props } = this
    const ctx = real ? this.ctxs[0] : this.ctxs[1]
    const color = real ? props.color : this.colorKey[1]
    ctx.beginPath()
    ctx.strokeStyle = color

    ctx.arc(this.x0, this.y0, props.radius, props.startAngle, props.endAngle, false)
    ctx.lineWidth = props.fillWidth
    ctx.stroke()
    
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  drawKnob(real: boolean) {

    const { props } = this
    const ctx = real ? this.ctxs[0] : this.ctxs[1]
    const color = real ? props.color : this.colorKey[1]

    ctx.beginPath()
    ctx.strokeStyle = color
    
    console.log(Math.cos(props.endAngle) * props.radius + this.x0)
    console.log(Math.sin(props.endAngle) * props.radius + this.y0)

    ctx.arc(
      Math.cos(props.endAngle) * props.radius + this.x0,
      Math.sin(props.endAngle) * props.radius + this.y0,
      props.knobWidth / 2,
      0, Math.PI * 2, false
    )
    
    ctx.lineWidth = 1
    ctx.fillStyle = color
    ctx.fill()
    
   
    
  }

/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  calculateAngles(v: EBBVector) {
    const { props } = this
    // console.log(v)
    let max = props.maxValue,
        min = props.minValue,
        step = props.step,
        endAngle = Math.atan2(v.y - this.y0, v.x - this.x0),
        ang_degrees = radToDeg(normalizeTan(endAngle)),
        normalizedValue = normalizeVal(endAngle) * (max - min) / (2 * Math.PI) + min

        if(normalizedValue > 260) return
    
        normalizedValue = (normalizedValue / step >> 0) * step
        props.endAngle = endAngle
        props.ang_degrees = ang_degrees
        props.normalizedValue = normalizedValue

      return {
        normalizedValue: (normalizedValue / step >> 0) * step,
        endAngle: endAngle,
        ang_degrees: ang_degrees
      }
      
        
  }
}