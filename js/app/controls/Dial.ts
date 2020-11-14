import { EBBVector, EBBCircleMetrics } from '../../dom/structs'
import { Pressable } from '../../dom/traits'
import { EventEmitter } from '../../audio'
import { CanvasColor, ColorKey, APP_BACGROUND_COLOR } from '../../dom/color'
import { ContextCollection, GEO } from '../../dom/CanvasEx'
import { angFromPts, getSat } from './util'

export type DialProperties = Record<string, any>

function roundedPoly(ctx: any, points: any, radiusAll:any) {
  var i, x, y, len, p1, p2, p3, v1, v2, sinA, sinA90, radDirection, drawDirection, angle, halfAngle, cRadius, lenOut,radius;
  // convert 2 points into vector form, polar form, and normalised 
  var asVec = function(p: any, pp: any, v: any) {
    v.x = pp.x - p.x;
    v.y = pp.y - p.y;
    v.len = Math.sqrt(v.x * v.x + v.y * v.y);
    v.nx = v.x / v.len;
    v.ny = v.y / v.len;
    v.ang = Math.atan2(v.ny, v.nx);
  }
  radius = radiusAll;
  v1 = {};
  v2 = {};
  len = points.length;
  p1 = points[len - 1];
  // for each point
  for (i = 0; i < len; i++) {
    p2 = points[(i) % len];
    p3 = points[(i + 1) % len];
    //-----------------------------------------
    // Part 1
    asVec(p2, p1, v1);
    asVec(p2, p3, v2);
    sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    angle = Math.asin(sinA);
    //-----------------------------------------
    radDirection = 1;
    drawDirection = false;
    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else {
      if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
    }
    if(p2.radius !== undefined){
        radius = p2.radius;
    }else{
        radius = radiusAll;
    }
    //-----------------------------------------
    // Part 2
    halfAngle = angle / 2;
    //-----------------------------------------

    //-----------------------------------------
    // Part 3
    lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle));
    //-----------------------------------------

    //-----------------------------------------
    // Special part A
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    }
    //-----------------------------------------
    // Part 4
    x = p2.x + v2.nx * lenOut;
    y = p2.y + v2.ny * lenOut;
    //-----------------------------------------
    // Part 5
    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection;
    //-----------------------------------------
    // Part 6
    ctx.arc(x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection);
    //-----------------------------------------
    p1 = p2;
    p2 = p3;
  }
  ctx.closePath();
}

function lerp(initial, ease) {
  let _target = initial
  let _value = initial
  let _ease = ease

  return {
    set target(t) {
      _target = t
    },

    get value() {
      return _value
    },

    update() {
      _value += (_target - _value) * _ease
    },
  }
}

export class Dial extends EventEmitter implements Pressable {

  props: DialProperties = {
    value: 0.5,

    min: 0,
    max: 100,
    step: 1,

    cursor: false,
    thickness: 0.35,
    lineCap: 'butt',
    readOnly: false,
    displayInput: true,

    width: 200,
    height: 200,

    backColor: CanvasColor.EOEOrange,
    color: CanvasColor.Grey8,
    labelColor: '#888',

    angleOffset: 0,
    angleArc: 360,

    className: null,
    activeClass: null
    
    
  }
  
  x0: number = 0
  y0: number = 0
  isPressed: boolean = false
  isDisabled: boolean = false
  colorKey: ColorKey = [-1, '']
  ctxs: ContextCollection = []
  pos: EBBVector = { x: 0, y: 0 }
  center: EBBVector = { x: 0, y: 0 }
  eased: any
  r: number = 50
  arc_weight: number = 5
  outer_arc_radius: number = 20
  outer_arc_diameter: number = 20
  inner_arc_radius: number = 15
  dial_radius: number = 5
  trangle_base: number = 7
  triangle_border_radius: number = 20

  constructor(
    props: DialProperties,
    public label: string,
    public color: CanvasColor,
    public metrics: EBBCircleMetrics,
    ctxs: ContextCollection) {
      super()
  
      Object.assign(this.props, props)
      this.ctxs = ctxs    
      this.x0 = Math.floor(metrics.w / 2)
      this.y0 = Math.floor(metrics.h / 2)
      this.props.backColor = color
      this.eased = lerp(parseInt(this.props.value), 0.2)
  }

  onMouseClick(e: MouseEvent) {
    this.pos.x = e.pageX
    this.pos.y = e.pageY

    const delta = this.pos.x-this.metrics.x
    const v = delta/this.metrics.w

    this.props.value = v
    this.draw()
  
  }

  onMouseMove(e: MouseEvent) {
    console.log(this.metrics)
    this.pos.x = e.pageX  
    this.pos.y = e.pageY

    const delta = this.pos.x-this.metrics.x
    const v = delta/this.metrics.w

    this.props.value = v
    this.draw()
  }

  update() {

  }

  drawDialArc(ctx: CanvasRenderingContext2D, real: boolean) {
    
  
    // Outer
    ctx.beginPath()
    ctx.arc(
      0,
      0,
      this.outer_arc_diameter,
      Math.PI,
      0
    )
    ctx.strokeStyle = real ? this.props.backColor : this.colorKey[1]
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()
    
    // Inner
    ctx.beginPath()
    ctx.arc(
      0, 
      0,
      this.inner_arc_radius,
      Math.PI,
      0
    )
    ctx.fillStyle = real ? this.props.backColor : this.colorKey[1]
    ctx.fill()
    ctx.closePath()
  }
  
  drawDial(ctx: CanvasRenderingContext2D, real: boolean, rotation: number) {
    // ctx.translate(this.r, this.r)
	  ctx.rotate(rotation)

    // circle
    ctx.beginPath()
    
    ctx.arc(
      0, 
      0,
      this.dial_radius,
      2 * Math.PI,
      0
    )
    
    ctx.fillStyle = real ? this.props.color : this.colorKey[1]
    ctx.fill()
    ctx.closePath()
    
    // // triangle
    ctx.beginPath()
    roundedPoly(
      ctx,
      [
        {
          x: 0,
          y: -this.trangle_base / 2
        },
        {
          x: -this.r * 0.65,
          y: 0
        },
        {
          x: 0,
          y: this.trangle_base / 2
        }
      ],
      this.triangle_border_radius
    )
    ctx.fillStyle = this.props.color
    ctx.fill()
    ctx.closePath()
      
  }

  drawLabel() {
    const ctx = this.ctxs[0]

    ctx.fillStyle = CanvasColor.EOEWhite
    ctx.font = '13px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(this.label, this.x0, 0)


  }

  draw() {
    let real = true
    
    for (let ctx of this.ctxs) {
      ctx.save()
      
      ctx.translate(this.metrics.x, this.metrics.y)
     
      ctx.save()
      ctx.fillStyle = real ? APP_BACGROUND_COLOR : this.colorKey[1]
      ctx.fillRect(0,0, this.metrics.w, this.metrics.h)
      // ctx.strokeStyle = 'red'
      // ctx.strokeRect(0,0, this.metrics.w, this.metrics.h)
      
      ctx.restore()
      ctx.save()
      this.drawLabel()  
    
      ctx.translate(this.x0, this.y0)
      this.drawDialArc(ctx, real)
	
      
      this.eased.target = this.props.value
      this.eased.update()
    
      this.drawDial(ctx, real, this.eased.value * Math.PI)
      
      ctx.restore()
      ctx.restore()
      real = false
    }
}
}