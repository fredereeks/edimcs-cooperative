import React, { ChangeEventHandler } from 'react'

interface TextAreaProps {
  containerClassName?: string | undefined | boolean
  label?: string | undefined | boolean
  required?: boolean
  disabled?: boolean | undefined
  className?: string | undefined
  placeholder?: string | undefined
  maxLength?: number | undefined
  name?: string | undefined
  id?: string | undefined
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}


export default function TextArea({ containerClassName, required, disabled, className, placeholder, name, id, maxLength, label, onChange }: TextAreaProps) {
  containerClassName = containerClassName || '';
  disabled = disabled || false;
  id = id || '';
  maxLength = maxLength || undefined;
  name = name || '';
  required = required || true;
  return (

    <div className={`${containerClassName} flex flex-col gap-1`}>
      <label htmlFor={id} className="text-gray-500 text-sm">{label} {required === true || required === 'true' ? <span className='text-red-500 text-xs -translate-y-2'>*</span> : ''} </label>
      {required ?
        <textarea cols={30} rows={7} id={id} name={name} disabled={disabled} required={required} maxLength={maxLength} onChange={onChange} className={`outline-none placeholder-opacity-70 text-slate-700 text-sm  bg-transparent border border-slate-300 rounded-[.25rem] py-2 px-4 w-full ${className}`} placeholder={placeholder} ></textarea>
        : <textarea cols={30} rows={7} id={id} name={name} disabled={disabled} maxLength={maxLength} onChange={onChange} className={`outline-none placeholder-opacity-70 text-slate-700 text-sm  bg-transparent border border-slate-300 rounded-[.25rem] py-2 px-4 w-full ${className}`} placeholder={placeholder} ></textarea>}
    </div>
  )
}
