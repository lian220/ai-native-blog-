'use client'

import { useEffect, useState } from 'react'

// 반짝이는 별 컴포넌트
function SparkingStar({ delay, size, top, left }: {
  delay: number
  size: number
  top: string
  left: string
}) {
  return (
    <div
      className="absolute animate-twinkle"
      style={{
        top,
        left,
        animationDelay: `${delay}s`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="text-yellow-400 dark:text-yellow-300"
      >
        <path
          d="M12 2L13.09 8.26L19 7L14.74 11.17L19 17L12 14L5 17L9.26 11.17L5 7L10.91 8.26L12 2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

// 떠다니는 도형 컴포넌트
function FloatingShape({
  shape,
  color,
  size,
  duration,
  delay,
  startX,
  startY
}: {
  shape: 'circle' | 'triangle' | 'square'
  color: string
  size: number
  duration: number
  delay: number
  startX: string
  startY: string
}) {
  const shapes = {
    circle: (
      <div
        className={`rounded-full ${color}`}
        style={{ width: size, height: size }}
      />
    ),
    triangle: (
      <div
        className={color}
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid currentColor`,
        }}
      />
    ),
    square: (
      <div
        className={`${color} rotate-45`}
        style={{ width: size, height: size }}
      />
    ),
  }

  return (
    <div
      className="absolute animate-float opacity-60"
      style={{
        left: startX,
        top: startY,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {shapes[shape]}
    </div>
  )
}

// 타이핑 효과 컴포넌트
export function TypingText({
  text,
  className = ''
}: {
  text: string
  className?: string
}) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearInterval(timer)
      clearInterval(cursorTimer)
    }
  }, [text])

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        |
      </span>
    </span>
  )
}

// 네온 글로우 텍스트 컴포넌트
export function NeonText({
  children,
  color = 'pink',
  className = ''
}: {
  children: React.ReactNode
  color?: 'pink' | 'blue' | 'green' | 'purple'
  className?: string
}) {
  const colorClasses = {
    pink: 'text-pink-400 animate-neon-pink',
    blue: 'text-blue-400 animate-neon-blue',
    green: 'text-green-400 animate-neon-green',
    purple: 'text-purple-400 animate-neon-purple',
  }

  return (
    <span className={`${colorClasses[color]} ${className}`}>
      {children}
    </span>
  )
}

// 바운싱 아이콘 컴포넌트
export function BouncingEmoji({
  emoji,
  delay = 0
}: {
  emoji: string
  delay?: number
}) {
  return (
    <span
      className="inline-block animate-bounce-custom"
      style={{ animationDelay: `${delay}s` }}
    >
      {emoji}
    </span>
  )
}

// 메인 애니메이션 배경 컴포넌트
export function AnimeBackground() {
  const stars = [
    { delay: 0, size: 16, top: '10%', left: '5%' },
    { delay: 0.5, size: 12, top: '20%', left: '80%' },
    { delay: 1, size: 20, top: '60%', left: '90%' },
    { delay: 1.5, size: 14, top: '40%', left: '15%' },
    { delay: 2, size: 18, top: '80%', left: '70%' },
  ]

  const shapes = [
    { shape: 'circle' as const, color: 'bg-pink-400/30 dark:bg-pink-500/20', size: 20, duration: 6, delay: 0, startX: '10%', startY: '30%' },
    { shape: 'triangle' as const, color: 'text-blue-400/30 dark:text-blue-500/20', size: 24, duration: 8, delay: 1, startX: '85%', startY: '50%' },
    { shape: 'square' as const, color: 'bg-purple-400/30 dark:bg-purple-500/20', size: 16, duration: 7, delay: 2, startX: '70%', startY: '20%' },
    { shape: 'circle' as const, color: 'bg-green-400/30 dark:bg-green-500/20', size: 14, duration: 5, delay: 0.5, startX: '20%', startY: '70%' },
    { shape: 'triangle' as const, color: 'text-yellow-400/30 dark:text-yellow-500/20', size: 18, duration: 9, delay: 1.5, startX: '50%', startY: '10%' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {stars.map((star, i) => (
        <SparkingStar key={`star-${i}`} {...star} />
      ))}
      {shapes.map((shape, i) => (
        <FloatingShape key={`shape-${i}`} {...shape} />
      ))}
    </div>
  )
}

// 그라데이션 애니메이션 카드
export function GradientCard({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-60 animate-gradient-xy transition duration-300" />
      <div className="relative bg-white dark:bg-neutral-900 rounded-lg p-4">
        {children}
      </div>
    </div>
  )
}

// 파티클 효과 컴포넌트
export function Particles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20 dark:bg-blue-300/20 animate-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.id * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}
