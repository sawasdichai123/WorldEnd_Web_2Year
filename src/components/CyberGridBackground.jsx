import { useEffect, useRef } from 'react'

const CyberGridBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let offset = 0

        // Configuration
        const gridSize = 40 // Base grid size
        const speed = 0.5   // Movement speed
        const horizonY = canvas.height * 0.4 // Horizon line position (0.0 to 1.0)

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const drawGrid = () => {
            const w = canvas.width
            const h = canvas.height

            // Clear screen
            ctx.fillStyle = '#050510' // Match bg-darker
            ctx.fillRect(0, 0, w, h)

            // Horizon Gradient (The "Sun" Glow)
            const gradient = ctx.createLinearGradient(0, 0, 0, h)
            gradient.addColorStop(0, '#0f0f1e')
            gradient.addColorStop(0.4, 'rgba(139, 92, 246, 0.1)') // Purple glow at horizon
            gradient.addColorStop(1, '#050510')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, w, h)

            ctx.lineWidth = 1
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)' // Cyan grid lines
            ctx.beginPath()

            // Vertical Perspective Lines
            // They converge to the center of the horizon
            const centerX = w / 2
            const vanishingPointY = h * 0.2 // Slightly above horizon for dramatic effect
            const numVerticalLines = 30

            for (let i = -numVerticalLines; i <= numVerticalLines; i++) {
                // Calculate x position at bottom
                // We use a non-linear distribution to simulate infinite width
                const x = centerX + (i * w * 0.05) * (w / 200)

                ctx.moveTo(centerX, vanishingPointY)
                ctx.lineTo(x, h)
            }

            // Horizontal Moving Lines
            // Perspective transform: lines get closer together as they go up
            // y = h - (h - horizon) / z

            // "z" moves from 1 (close) to infinity (far)
            // We simulate movement by added offset to z

            offset = (offset + speed) % gridSize

            // Draw horizontal lines
            // We iterate "logic distance" and map to screen Y
            for (let z = 0; z < 1000; z += gridSize) {
                // Effective z position with movement
                const currentZ = z - offset
                if (currentZ <= 0) continue

                // Perspective projection for Y
                // Simple faux-3D: y scales with 1/z
                // We want lines to bunch up at the top (horizon)

                // Height from bottom (0 to h)
                // Using an exponential scale to simulate depth
                const p = (currentZ % 1000) / 1000 // 0 to 1

                // Y position: Start at bottom (h), go up to horizon (h * 0.4)
                // Linear doesn't look 3D. Let's use 1/z style or just exponential

                // Let's use a simpler loop for visual effect rather than true 3D math relative to Z
                // Just moving lines down
            }

            // Re-doing horizontal lines with simpler visual logic
            // Draw lines from bottom up to horizon, spacing decreases exponentially

            const time = Date.now() / 1000
            const moveOffset = (time * 100) % 100

            for (let i = 0; i < 40; i++) {
                // Non-linear y distribution
                // 0 = bottom, 1 = horizon
                const t = (i * 50 + moveOffset)
                const perspective = 1000 / (t + 100) // Objects get smaller/closer at distance

                // Map perspective (10...0) to Y (bottom...horizon)
                // This is tricky to get right without a full 3D engine, let's try a direct approach

                // Approach 3: Just drawing horizontal lines at calculated Y positions
                // y = Horizon + (Bottom - Horizon) / Z
            }
        }

        const drawGridFixed = () => {
            const w = canvas.width
            const h = canvas.height
            const horizon = h * 0.3

            ctx.fillStyle = '#050510'
            ctx.fillRect(0, 0, w, h)

            // Glow
            const g = ctx.createRadialGradient(w / 2, horizon, 10, w / 2, h, w)
            g.addColorStop(0, 'rgba(139, 92, 246, 0.2)')
            g.addColorStop(0.5, 'rgba(5, 5, 16, 0.0)')
            ctx.fillStyle = g
            ctx.fillRect(0, 0, w, h)

            ctx.beginPath()
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)'

            // Vertical Lines
            const cx = w / 2
            const fov = 1.6
            for (let i = -20; i <= 20; i++) {
                // Angle from center
                const spacing = w * 1.5
                const xBot = cx + i * (w / 10)
                ctx.moveTo(cx + i * 2, horizon) // Converge near center at top
                ctx.lineTo(xBot * fov, h)
            }

            // Horizontal Lines (Moving)
            offset = (offset + speed * 2) % 100

            // We draw from z=1 (near) to z=10 (far)
            for (let z = 1; z < 20; z += 0.5) {
                // Apply movement to Z
                // We need a continuous flow. 
                // Let's conceptually map Z to screenspace Y

                // Y = Horizon + yBase / Z
                const movement = (offset / 100)
                const effectiveZ = z - movement
                if (effectiveZ < 0.1) continue;

                const yBase = h - horizon
                const y = horizon + (yBase / effectiveZ)

                // Opacity fades in distance
                const alpha = Math.min(1, (1 / effectiveZ) * 1.5)

                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.2})`
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.stroke()
            }

            ctx.stroke()
        }

        const animate = () => {
            drawGridFixed()
            animationFrameId = requestAnimationFrame(animate)
        }

        resizeCanvas()
        animate()

        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return <canvas ref={canvasRef} className="particle-canvas" />
}

export default CyberGridBackground
