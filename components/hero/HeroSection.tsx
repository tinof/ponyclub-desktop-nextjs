'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Simple ripple effect parameters
    const ripples: { x: number; y: number; radius: number; alpha: number }[] = []

    function addRipple() {
      ripples.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        alpha: 0.5,
      })
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      ripples.forEach((ripple, i) => {
        ripple.radius += 0.5
        ripple.alpha -= 0.005
        if (ripple.alpha <= 0) {
          ripples.splice(i, 1)
        } else {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`
          ctx.lineWidth = 2
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
          ctx.stroke()
        }
      })
    }

    function animate() {
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Add ripples periodically
    const intervalId = setInterval(addRipple, 800)

    animate()

    // Resize handler
    function handleResize() {
      if (!canvas) return // Add null check for canvas
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervalId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none absolute inset-0 mix-blend-soft-light'
      style={{ zIndex: 25 }}
    />
  )
}

export default function HeroSection() {
  const { scrollY } = useScroll()
  // Parallax title slides in from below as user scrolls down 0 to 300px
  const y = useTransform(scrollY, [0, 300], [100, 0])
  const opacity = useTransform(scrollY, [0, 300], [0, 1])

  return (
    <section className='relative h-[80vh] w-full overflow-hidden'>
      {/* Video Background */}
      <video
        src='/videos/hero-loop.mp4'
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        className='absolute inset-0 h-full w-full object-cover'
      />
      {/* Ripple effect canvas */}
      <RippleCanvas />

      {/* Overlay gradient */}
      <div
        className={`
          absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent
          to-black/40
        `}
      />

      {/* Parallax Title */}
      <motion.div
        style={{ y, opacity }}
        className={`
        absolute bottom-20 z-20 flex w-full justify-center
      `}
      >
        <h1
          className={`
            text-5xl font-extrabold text-white drop-shadow-lg select-none
            md:text-7xl
          `}
        >
          The Full Pony Club Experience
        </h1>
      </motion.div>

      {/* Scroll Prompt */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`
          absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col
          items-center text-white select-none
        `}
      >
        <span className='mb-2 text-lg font-semibold'>Adventure begins here</span>
        <svg
          className='h-8 w-8 animate-bounce'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'></path>
        </svg>
      </motion.div>
    </section>
  )
}
