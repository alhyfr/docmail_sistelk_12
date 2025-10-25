import React from 'react'
import Anak from '../assets/anak.png'

/**
 * Modern Loading Component
 * @param {string} variant - 'spinner' | 'dots' | 'pulse' | 'bars' | 'runner'
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} color - 'blue' | 'green' | 'purple' | 'pink' | 'gray'
 * @param {boolean} fullScreen - Show loading in full screen
 * @param {string} text - Optional loading text
 */
function Loading({ 
  variant = 'spinner', 
  size = 'md', 
  color = 'blue',
  fullScreen = false,
  text = ''
}) {
  // Size configurations
  const sizes = {
    sm: { spinner: 'w-6 h-6', dot: 'w-2 h-2', bar: 'w-1 h-8', text: 'text-sm' },
    md: { spinner: 'w-10 h-10', dot: 'w-3 h-3', bar: 'w-1.5 h-12', text: 'text-base' },
    lg: { spinner: 'w-16 h-16', dot: 'w-4 h-4', bar: 'w-2 h-16', text: 'text-lg' },
    xl: { spinner: 'w-24 h-24', dot: 'w-5 h-5', bar: 'w-2.5 h-20', text: 'text-xl' }
  }

  // Color configurations
  const colors = {
    blue: 'border-blue-600 bg-blue-600',
    green: 'border-green-600 bg-green-600',
    purple: 'border-purple-600 bg-purple-600',
    pink: 'border-pink-600 bg-pink-600',
    gray: 'border-gray-600 bg-gray-600'
  }

  // Spinner variant
  const SpinnerVariant = () => (
    <div className={`${sizes[size].spinner} border-4 border-gray-200 ${colors[color]} border-t-transparent rounded-full animate-spin`} />
  )

  // Dots variant
  const DotsVariant = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizes[size].dot} ${colors[color]} rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )

  // Pulse variant
  const PulseVariant = () => (
    <div className="relative">
      <div className={`${sizes[size].spinner} ${colors[color]} rounded-full animate-ping opacity-75 absolute`} />
      <div className={`${sizes[size].spinner} ${colors[color]} rounded-full opacity-75`} />
    </div>
  )

  // Bars variant
  const BarsVariant = () => (
    <div className="flex space-x-1.5 items-end">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${sizes[size].bar} ${colors[color]} rounded-sm animate-pulse`}
          style={{ 
            animationDelay: `${i * 0.15}s`,
            height: size === 'sm' ? '2rem' : size === 'md' ? '3rem' : size === 'lg' ? '4rem' : '5rem'
          }}
        />
      ))}
    </div>
  )

  // Runner variant - lingkaran dengan orang berlari
  const RunnerVariant = () => {
    const sizeMap = {
      sm: { container: 'w-16 h-16', runner: 'w-8 h-8' },
      md: { container: 'w-24 h-24', runner: 'w-12 h-12' },
      lg: { container: 'w-32 h-32', runner: 'w-16 h-16' },
      xl: { container: 'w-40 h-40', runner: 'w-20 h-20' }
    }

    const colorMap = {
      blue: { ring: 'border-blue-600', runner: 'text-blue-600' },
      green: { ring: 'border-green-600', runner: 'text-green-600' },
      purple: { ring: 'border-purple-600', runner: 'text-purple-600' },
      pink: { ring: 'border-pink-600', runner: 'text-pink-600' },
      gray: { ring: 'border-gray-600', runner: 'text-gray-600' }
    }

    return (
      <div className="relative flex items-center justify-center">
        {/* Rotating outer circle */}
        <div className={`${sizeMap[size].container} border-4 border-gray-200 ${colorMap[color].ring} border-t-transparent rounded-full animate-spin`} />
        
        {/* Runner icon in center */}
        <div className="absolute flex items-center justify-center">
          <img src={Anak} alt="Runner" className={`${sizeMap[size].runner} ${colorMap[color].runner}`} />
        </div>
      </div>
    )
  }

  // Select variant component
  const LoadingVariant = () => {
    switch (variant) {
      case 'dots':
        return <DotsVariant />
      case 'pulse':
        return <PulseVariant />
      case 'bars':
        return <BarsVariant />
      case 'runner':
        return <RunnerVariant />
      default:
        return <SpinnerVariant />
    }
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <LoadingVariant />
      {text && (
        <p className={`${sizes[size].text} text-gray-700 font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}

export default Loading