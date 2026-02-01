import { useRef, useEffect, useState } from 'react'
import './FallingParticles.css'

const FallingParticles = ({ color = '#8B5CF6' }) => {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const animationFrameRef = useRef(null)
    const currentColorRef = useRef({ r: 139, g: 92, b: 246 })
    const targetColorRef = useRef({ r: 139, g: 92, b: 246 })

    // Hex to RGB converter
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 139, g: 92, b: 246 }
    }

    // Update target color when prop changes
    useEffect(() => {
        targetColorRef.current = hexToRgb(color)
    }, [color])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let particles = particlesRef.current

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        class Particle {
            constructor() {
                this.reset()
                this.opacity = Math.random() * 0.6 + 0.3
                this.baseSize = Math.random() * 2.5 + 1
                this.targetOpacity = this.opacity
            }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.speedX = Math.random() * 0.4 - 0.2
                this.speedY = Math.random() * 0.4 - 0.2
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                // Smooth opacity transition
                this.opacity += (this.targetOpacity - this.opacity) * 0.1

                // Wrap around
                if (this.x > canvas.width) this.x = 0
                if (this.x < 0) this.x = canvas.width
                if (this.y > canvas.height) this.y = 0
                if (this.y < 0) this.y = canvas.height
            }

            draw(rgb) {
                ctx.fillStyle = `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${this.opacity})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            particles = []
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000)
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
            particlesRef.current = particles
        }

        const connect = (rgb) => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        const opacity = (1 - distance / 100) * 0.3 * Math.min(particles[a].opacity, particles[b].opacity)
                        ctx.strokeStyle = `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            // Smooth color interpolation
            const speed = 0.05 // Transition speed (lower = slower, smoother)
            currentColorRef.current.r += (targetColorRef.current.r - currentColorRef.current.r) * speed
            currentColorRef.current.g += (targetColorRef.current.g - currentColorRef.current.g) * speed
            currentColorRef.current.b += (targetColorRef.current.b - currentColorRef.current.b) * speed

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(particle => {
                particle.update()
                particle.draw(currentColorRef.current)
            })

            connect(currentColorRef.current)
            animationFrameRef.current = requestAnimationFrame(animate)
        }

        resizeCanvas()
        init()
        animate()

        const handleResize = () => {
            resizeCanvas()
            init()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    )
}

export default FallingParticles
