import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface TextInputProps {
  containerClassName?: string  | undefined | boolean
  label?: string  | undefined | boolean
  required?: boolean
  disabled?: string  | undefined | boolean
  className?: string  | undefined
  placeholder?: string  | undefined
  type?: HTMLInputTypeAttribute | undefined
  min?: string | number | undefined 
  minLength?: number | undefined 
  max?: string | number | undefined 
  name?: string | undefined
  id?: string | undefined 
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

export default function TextInput({ containerClassName, label, required, disabled, className, placeholder, type, min, minLength, max, name, id, onChange } : TextInputProps) {
  containerClassName = containerClassName || '';
  disabled = disabled || false;
  id = id || '';
  min = min || '';
  minLength = minLength || undefined;
  max = max || '';
  name = name || '';
  required = required || true;
  type = type || undefined;
  return (
    <div className={`${containerClassName} flex flex-col gap-1`}>
      <label htmlFor={id} className="text-gray-500 text-sm">{label} {required === true || required === 'true' ? <span className='text-red-500 text-xs -translate-y-2'>*</span> : ''} </label>
      {required === true || required === 'true' ?
        <input type={type} required={required} id={id} name={name} placeholder={placeholder} min={min} max={max} minLength={minLength} onChange={onChange} className={`outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm bg-transparent focus-within:bg-transparent focus:bg-transparent placeholder-opacity-70 ${className}`} /> :
        <input type={type} id={id} name={name} placeholder={placeholder} min={min} max={max} minLength={minLength} onChange={onChange} className={`outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm bg-transparent focus-within:bg-transparent focus:bg-transparent placeholder-opacity-70 ${className}`} />}
    </div>
  )
}
