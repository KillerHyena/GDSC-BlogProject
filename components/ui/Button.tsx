import React from 'react'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}
export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'px-4 py-2 rounded font-semibold '
  const variants = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-200 text-gray-900',
    danger: 'bg-red-600 text-white'
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
