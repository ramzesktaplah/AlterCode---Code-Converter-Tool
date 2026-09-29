// Flat Text — Originkit

"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const PX_PER_UNIT = 100

const SUPERSAMPLE = 3

const TILT = 20
const QUALITY = 20
const FOLLOW = 1
const SHEEN = 9

const ELEVATION = (TILT * 4 * Math.PI) / 180
const SEGMENTS = Math.round(32 + QUALITY ** 2 * 0.9)

const FOLLOW_RATE = 3 + FOLLOW * 0.7
const SHEEN_AMOUNT = SHEEN / 20

const DEFAULTS = {
    text: "FLAT",

    font: {
        defaultValue: {"variant":"Bold","fontSize":"140px","textAlign":"center","fontFamily":"Inter","fontWeight":700,"lineHeight":0.95,"letterSpacing":"-0.04em"},
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontWeight: 700,
        fontSize: 140,
        letterSpacing: "-0.04em",
        lineHeight: 0.95,
        textAlign: "center" as const,
    },
    ink: "#00FFFF",
    lift: 4,
    reach: 5,
    drift: 3,
}

export type FontValue = {
    fontFamily?: string
    fontWeight?: number | string
    fontStyle?: string
    fontSize?: number | string
    letterSpacing?: number | string
    lineHeight?: number | string
    textAlign?: string
}

export type Config = {
    text: string
    font: FontValue
    ink: string
    lift: number
    reach: number
    drift: number
}

function clamp(v: number, lo: number, hi: number, fallback: number): number {
    const n = typeof v === "number" && isFinite(v) ? v : fallback
    return Math.max(lo, Math.min(hi, n))
}

function toPx(v: unknown, fallback: number, emBasis: number): number {
    if (typeof v === "number" && isFinite(v)) return v
    if (typeof v === "string") {
        const n = parseFloat(v)
        if (!isFinite(n)) return fallback
        if (v.indexOf("em") >= 0) return n * emBasis
        if (v.indexOf("%") >= 0) return (n / 100) * emBasis
        return n
    }
    return fallback
}

function toRatio(v: unknown, size: number, fallback: number): number {
    if (typeof v === "number" && isFinite(v)) return v > 4 ? v / size : v
    if (typeof v === "string") {
        const n = parseFloat(v)
        if (!isFinite(n)) return fallback
        if (v.indexOf("px") >= 0) return n / size
        if (v.indexOf("%") >= 0) return n / 100
        return n > 4 ? n / size : n
    }
    return fallback
}

function settingsFor(cfg: Config) {
    return {
        reach: clamp(cfg.reach, 1, 20, DEFAULTS.reach) * 0.4,
        lift: clamp(cfg.lift, 0, 20, DEFAULTS.lift) * 0.22,
        drift: clamp(cfg.drift, 0, 20, DEFAULTS.drift) * 0.06,
    }
}

const SHEET_VERTEX = `
uniform vec2  uPoint;
uniform float uReach;
uniform float uLift;
uniform float uSheen;

varying vec2  vUv;
varying float vShade;

const vec3 KEY = vec3(-0.45, 0.3, 0.84);

float easeInOutCubic(float x) {
    return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
}

float easeInOutCubicD(float x) {
    return x < 0.5 ? 12.0 * x * x : 3.0 * pow(2.0 - 2.0 * x, 2.0);
}

void main() {
    vUv = uv;

    vec3 p = position;
    vec2 world = (modelMatrix * vec4(position, 1.0)).xy;

    float r = length(world - uPoint);
    float u = 1.0 - clamp(r / max(uReach, 0.0001), 0.0, 1.0);
    p.z += uLift * easeInOutCubic(u);

    vec2 dir = r > 0.0001 ? (world - uPoint) / r : vec2(0.0);
    float slope = uLift * easeInOutCubicD(u) / max(uReach, 0.0001);
    vec3 n = normalize(vec3(slope * dir, 1.0));

    vec3 k = normalize(KEY);
    float lam = dot(n, k) / k.z;
    vShade = clamp(mix(1.0, lam, uSheen), 0.15, 2.2);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`

const SHEET_FRAGMENT = `
precision highp float;

uniform sampler2D uTex;
uniform vec3      uInk;

varying vec2  vUv;
varying float vShade;

void main() {
    float a = texture2D(uTex, vUv).a;
    if (a < 0.002) discard;
    gl_FragColor = vec4(uInk * vShade, a);
}
`

type TypeTexture = {
    texture: THREE.CanvasTexture
    width: number
    height: number
    pixelHeight: number
}

function getWrappedLines(
    ctx: CanvasRenderingContext2D,
    rawText: string,
    maxWidth?: number
): string[] {
    const rawParagraphs = String(rawText ?? "").split("\n")
    if (!maxWidth || maxWidth <= 0) return rawParagraphs

    const lines: string[] = []
    for (const paragraph of rawParagraphs) {
        if (!paragraph.trim()) {
            lines.push(paragraph)
            continue
        }
        const words = paragraph.split(" ")
        let currentLine = words[0]
        for (let i = 1; i < words.length; i++) {
            const word = words[i]
            const testLine = `${currentLine} ${word}`
            if (ctx.measureText(testLine).width <= maxWidth) {
                currentLine = testLine
            } else {
                lines.push(currentLine)
                currentLine = word
            }
        }
        lines.push(currentLine)
    }
    return lines
}

function buildTypeTexture(
    cfg: Config,
    maxAniso: number,
    containerWidth?: number
): TypeTexture | null {
    const font = cfg.font || DEFAULTS.font
    let size = Math.max(8, toPx(font.fontSize, DEFAULTS.font.fontSize, 16))
    const weight = font.fontWeight ?? DEFAULTS.font.fontWeight
    const style = font.fontStyle ?? "normal"
    const family = font.fontFamily || DEFAULTS.font.fontFamily
    const ratio = toRatio(font.lineHeight, size, 0.95)
    const tracking = toPx(font.letterSpacing, 0, size)
    const align =
        font.textAlign === "left" || font.textAlign === "right"
            ? font.textAlign
            : "center"

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    const setFont = (scale: number, currentSize: number) => {
        ctx.font = `${style} ${weight} ${currentSize * scale}px ${family}`
        if ("letterSpacing" in ctx)
            (ctx as any).letterSpacing = `${tracking * scale}px`
        ctx.textAlign = align
        ctx.textBaseline = "alphabetic"
    }

    setFont(1, size)

    const availableWidth = containerWidth && containerWidth > 40 ? containerWidth - 16 : undefined
    let lines = getWrappedLines(ctx, cfg.text, availableWidth)

    let widest = 1
    for (const line of lines) {
        widest = Math.max(widest, ctx.measureText(line).width)
    }

    if (availableWidth && widest > availableWidth && widest > 0) {
        size = Math.max(14, Math.floor(size * (availableWidth / widest)))
        setFont(1, size)
        lines = getWrappedLines(ctx, cfg.text, availableWidth)
        widest = 1
        for (const line of lines) {
            widest = Math.max(widest, ctx.measureText(line).width)
        }
    }

    const padX = Math.max(8, Math.round(size * 0.16))
    const padY = Math.max(6, Math.round(size * 0.16))
    const lineStep = Math.round(size * ratio)
    const w = widest + padX * 2
    const h = (lines.length - 1) * lineStep + Math.round(size * 1.08) + padY * 2

    const ss = Math.max(0.25, Math.min(SUPERSAMPLE, 4096 / w, 4096 / h))

    canvas.width = Math.max(1, Math.ceil(w * ss))
    canvas.height = Math.max(1, Math.ceil(h * ss))
    setFont(ss, size)
    ctx.fillStyle = "#ffffff"

    const x = align === "left" ? padX : align === "right" ? w - padX : w / 2
    const y0 = padY + Math.round(size * 0.82)
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x * ss, (y0 + i * lineStep) * ss)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    texture.anisotropy = maxAniso
    texture.needsUpdate = true

    return {
        texture,
        width: w / PX_PER_UNIT,
        height: h / PX_PER_UNIT,
        pixelHeight: h,
    }
}

class FlatTextScene {
    private container: HTMLElement
    private cfg: Config
    private renderer: THREE.WebGLRenderer
    private scene = new THREE.Scene()
    private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400)

    private sheet: THREE.Mesh
    private geometry: THREE.PlaneGeometry
    private sheetMat: THREE.ShaderMaterial
    private type: TypeTexture | null = null
    private onHeightChange?: (h: number) => void

    private raycaster = new THREE.Raycaster()
    private floor = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    private ndc = new THREE.Vector2()
    private hitPoint = new THREE.Vector3()

    private point = new THREE.Vector2()
    private target = new THREE.Vector2()
    private amp = 0
    private hovering = false
    private driftT = 0

    private width = 1
    private height = 1
    private frameId = 0
    private lastT = 0
    private disposed = false

    constructor(container: HTMLElement, cfg: Config, onHeightChange?: (h: number) => void) {
        this.container = container
        this.cfg = cfg
        this.onHeightChange = onHeightChange

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.outputColorSpace = THREE.SRGBColorSpace
        const el = this.renderer.domElement
        el.style.position = "absolute"
        el.style.inset = "0"
        el.style.width = "100%"
        el.style.height = "100%"
        el.style.touchAction = "none"
        container.appendChild(el)

        const S = settingsFor(cfg)
        this.type = buildTypeTexture(
            cfg,
            this.renderer.capabilities.getMaxAnisotropy(),
            container.clientWidth || undefined
        )

        if (this.type && this.onHeightChange) {
            this.onHeightChange(this.type.pixelHeight)
        }

        this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2)

        this.sheetMat = new THREE.ShaderMaterial({
            uniforms: {
                uPoint: { value: this.point },
                uReach: { value: S.reach },
                uLift: { value: 0 },
                uTex: { value: this.type?.texture ?? null },
                uInk: { value: new THREE.Color(cfg.ink) },
                uSheen: { value: SHEEN_AMOUNT },
            },
            vertexShader: SHEET_VERTEX,
            fragmentShader: SHEET_FRAGMENT,
            transparent: true,
            depthWrite: false,
            depthTest: false,
            side: THREE.DoubleSide,
        })

        this.sheet = new THREE.Mesh(this.geometry, this.sheetMat)
        this.sheet.frustumCulled = false
        this.scene.add(this.sheet)

        this.rebuildGeometry()
        this.camera.up.set(0, 0, 1)

        el.addEventListener("pointerenter", this.onEnter)
        el.addEventListener("pointerleave", this.onLeave)
        el.addEventListener("pointercancel", this.onLeave)
        el.addEventListener("pointermove", this.onMove)

        const fonts = (document as any).fonts
        if (fonts?.ready) {
            fonts.ready.then(() => {
                if (!this.disposed) this.rebuildType()
            })
        }
    }

    private onEnter = () => {
        this.hovering = true
    }

    private onLeave = () => {
        this.hovering = false
    }

    private onMove = (e: PointerEvent) => {
        const r = this.renderer.domElement.getBoundingClientRect()
        if (!r.width || !r.height) return
        this.ndc.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            -((e.clientY - r.top) / r.height) * 2 + 1
        )
        this.raycaster.setFromCamera(this.ndc, this.camera)

        if (this.raycaster.ray.intersectPlane(this.floor, this.hitPoint)) {
            this.target.set(this.hitPoint.x, this.hitPoint.y)
            this.hovering = true
        }
    }

    private rebuildType() {
        if (this.disposed) return
        const next = buildTypeTexture(
            this.cfg,
            this.renderer.capabilities.getMaxAnisotropy(),
            this.width || undefined
        )
        if (!next) return
        this.type?.texture.dispose()
        this.type = next
        this.sheetMat.uniforms.uTex.value = next.texture
        this.rebuildGeometry()
        if (this.onHeightChange) {
            this.onHeightChange(next.pixelHeight)
        }
    }

    private rebuildGeometry() {
        const w = this.type?.width ?? 4
        const h = this.type?.height ?? 1.5
        this.geometry.dispose()
        this.geometry = new THREE.PlaneGeometry(w, h, SEGMENTS, SEGMENTS)
        this.sheet.geometry = this.geometry

        const align = this.cfg.font?.textAlign || "center"
        if (align === "left") {
            this.sheet.position.x = (-this.width / PX_PER_UNIT + w) / 2
        } else if (align === "right") {
            this.sheet.position.x = (this.width / PX_PER_UNIT - w) / 2
        } else {
            this.sheet.position.x = 0
        }
    }

    setSize(width: number, height: number) {
        if (this.disposed) return
        const prevW = this.width
        this.width = Math.max(1, width)
        this.height = Math.max(1, height)
        this.renderer.setSize(this.width, this.height, false)
        this.updateCamera()

        if (Math.abs(prevW - this.width) > 6) {
            this.rebuildType()
        }
    }

    private updateCamera() {
        const aspect = this.width / this.height
        const spanH = this.height / PX_PER_UNIT

        this.camera.left = (-spanH * aspect) / 2
        this.camera.right = (spanH * aspect) / 2
        this.camera.top = spanH / 2
        this.camera.bottom = -spanH / 2

        this.camera.position.set(
            0,
            -Math.cos(ELEVATION) * 100,
            Math.sin(ELEVATION) * 100
        )
        this.camera.lookAt(0, 0, 0)
        this.camera.updateProjectionMatrix()
    }

    updateConfig(cfg: Config) {
        if (this.disposed) return
        const prev = this.cfg
        this.cfg = cfg
        const S = settingsFor(cfg)

        if (
            cfg.text !== prev.text ||
            JSON.stringify(cfg.font) !== JSON.stringify(prev.font)
        ) {
            this.rebuildType()
        }

        this.sheetMat.uniforms.uReach.value = S.reach
        ;(this.sheetMat.uniforms.uInk.value as THREE.Color).set(cfg.ink)
    }

    start() {
        this.lastT = performance.now()
        const loop = () => {
            if (this.disposed) return
            this.frameId = requestAnimationFrame(loop)
            this.step()
        }
        this.frameId = requestAnimationFrame(loop)
    }

    private step() {
        if (this.disposed) return
        const now = performance.now()
        let dt = (now - this.lastT) / 1000
        this.lastT = now
        if (!isFinite(dt) || dt < 0) dt = 0

        if (dt > 0.05) dt = 0.05

        const S = settingsFor(this.cfg)
        const w = this.type?.width ?? 4
        const h = this.type?.height ?? 1.5

        this.driftT += dt * S.drift
        if (!this.hovering && S.drift > 0) {
            this.target.set(
                this.sheet.position.x + Math.sin(this.driftT) * w * 0.28,
                Math.sin(this.driftT * 1.37) * h * 0.28
            )
        }

        const k = 1 - Math.exp(-dt * FOLLOW_RATE)
        this.point.x += (this.target.x - this.point.x) * k
        this.point.y += (this.target.y - this.point.y) * k

        const wanted = this.hovering || S.drift > 0 ? 1 : 0
        this.amp += (wanted - this.amp) * (1 - Math.exp(-dt * 5))

        this.sheetMat.uniforms.uLift.value = S.lift * this.amp

        this.renderer.render(this.scene, this.camera)
    }

    dispose() {
        this.disposed = true
        cancelAnimationFrame(this.frameId)
        const el = this.renderer.domElement
        el.removeEventListener("pointerenter", this.onEnter)
        el.removeEventListener("pointerleave", this.onLeave)
        el.removeEventListener("pointercancel", this.onLeave)
        el.removeEventListener("pointermove", this.onMove)
        this.geometry.dispose()
        this.sheetMat.dispose()
        this.type?.texture.dispose()
        this.renderer.dispose()
        if (el.parentNode === this.container) this.container.removeChild(el)
    }
}

export interface FlatTextProps {
    text?: string
    font?: FontValue
    ink?: string
    lift?: number
    reach?: number
    drift?: number
    style?: React.CSSProperties
    className?: string
}

function __OriginkitBase_FlatText(props: FlatTextProps) {
    const {
        text = DEFAULTS.text,
        font = DEFAULTS.font as FontValue,
        ink = DEFAULTS.ink,
        lift = DEFAULTS.lift,
        reach = DEFAULTS.reach,
        drift = DEFAULTS.drift,
        style,
        className,
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<FlatTextScene | null>(null)
    const cfgRef = useRef<Config>(null as any)

    // Estimate initial height accurately so there is no layout jump
    const lines = String(text ?? "").split("\n")
    const fontSizePx = typeof font?.fontSize === "number" ? font.fontSize : toPx(font?.fontSize, 56, 16)
    const ratio = toRatio(font?.lineHeight, fontSizePx, 0.95)
    const initialEstHeight = Math.ceil(lines.length * fontSizePx * ratio + fontSizePx * 0.32)

    const [dynamicHeight, setDynamicHeight] = useState<number>(initialEstHeight)

    cfgRef.current = { text, font, ink, lift, reach, drift }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        let scene: FlatTextScene
        try {
            scene = new FlatTextScene(container, cfgRef.current, (pixelH) => {
                setDynamicHeight(pixelH)
            })
        } catch {
            return
        }
        sceneRef.current = scene
        scene.setSize(container.clientWidth, container.clientHeight || dynamicHeight)
        scene.start()

        const ro = new ResizeObserver(() => {
            if (container) {
                scene.setSize(container.clientWidth, container.clientHeight || dynamicHeight)
            }
        })
        ro.observe(container)
        return () => {
            ro.disconnect()
            scene.dispose()
            sceneRef.current = null
        }
    }, [])

    const fontKey = JSON.stringify(font)

    useEffect(() => {
        sceneRef.current?.updateConfig(cfgRef.current)
    }, [text, fontKey, ink, lift, reach, drift])

    const appliedHeight = style?.height ?? `${dynamicHeight}px`

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label={text}
            className={className}
            style={{
                position: "relative",
                width: "100%",
                height: appliedHeight,
                overflow: "hidden",
                ...style,
            }}
        />
    )
}

const __originkitPresetProps = {
  "text": "FLAT",
  "ink": "#00FFFF",
  "lift": 4,
  "reach": 5,
  "drift": 3
};

export function FlatText(props: FlatTextProps) {
  return <__OriginkitBase_FlatText {...(__originkitPresetProps as FlatTextProps)} {...props} />;
}

FlatText.displayName = "Flat Text"

export default FlatText
