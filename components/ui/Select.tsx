import React from 'react'
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}
export default function Select({ options, ...props }: SelectProps) {
  return (
    <select className="w-full p-2 border rounded" {...props}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
