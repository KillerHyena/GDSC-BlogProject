import React from 'react'
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export default function Textarea(props: TextareaProps) {
  return <textarea className="w-full p-2 border rounded" {...props} />
}
