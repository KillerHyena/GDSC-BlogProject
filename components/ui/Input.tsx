import React from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export default function Input(props: InputProps) {
  return <input className="w-full p-2 border rounded" {...props} />
}
