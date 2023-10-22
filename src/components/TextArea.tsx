import React, { ChangeEventHandler } from 'react'

interface TextAreaProps {
  label?: string  | undefined | boolean
  required?: boolean
  disabled?: boolean  | undefined
  className?: string  | undefined
  placeholder?: string  | undefined
  maxLength?: number | undefined 
  name?: string | undefined
  id?: string | undefined 
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}

  
  export default function TextArea({required, disabled, className, placeholder, name, id, maxLength, label, onChange} : TextAreaProps) {
  disabled = disabled || false;
  id = id || '';
  maxLength = maxLength || undefined;
  name = name || '';
  required = required || true;
  <label htmlFor={id} className="text-gray-500 text-sm">{label} {required === true ? <span className='text-red-500 text-xs -translate-y-2'>*</span> : ''} </label>
  if(required){
    return <textarea cols={30} rows={7} id={id} name={name} disabled={disabled} required={required} maxLength={maxLength} onChange={onChange} className={`outline-none placeholder-opacity-70 text-slate-700 text-sm  bg-transparent border border-slate-200 rounded-[.25rem] py-2 px-4 w-full ${className}`} placeholder={placeholder} ></textarea> 
  }
  else  return <textarea cols={30} rows={7} id={id} name={name} disabled={disabled} maxLength={maxLength} onChange={onChange} className={`outline-none placeholder-opacity-70 text-slate-700 text-sm  bg-transparent border border-slate-200 rounded-[.25rem] py-2 px-4 w-full ${className}`} placeholder={placeholder} ></textarea>
}
