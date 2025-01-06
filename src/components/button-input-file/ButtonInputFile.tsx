'use client'

import React, { useRef, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'

interface ButtonInputFileProps {
  onFileSelect: (file: File) => void
  buttonText?: string
}

export function ButtonInputFile({ onFileSelect, buttonText = 'Select File' }: ButtonInputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div>
      <Button type='button' onClick={handleButtonClick}>
        {buttonText}
      </Button>
      <input type='file' ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  )
}
