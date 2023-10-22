import React from 'react'

export default function TextArea({required, disabled, className, placeholder, name, id, onChange}) {
    required = required || true;
    disabled = disabled || false;
    name = name || '';
    id = id || '';
  return (
    <textarea cols="30" rows="7" id={id} name={name} required={required} onChange={onChange} className={`outline-none placeholder-opacity-70 text-slate-700 text-sm  bg-transparent border border-slate-200 rounded-[.25rem] py-2 px-4 w-full ${className}`} placeholder={placeholder} ></textarea>
  )
}
