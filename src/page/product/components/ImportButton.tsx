import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { importExcelProduct } from '@/apis'
import { toast } from 'react-toastify'

interface ImportButtonProps {
  fetchData: () => Promise<void>
}

const ImportButton: React.FC<ImportButtonProps> = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const handleEnterClick = async () => {
    if (selectedFile) {
      // Simulate API call
      console.log('Uploading file:', selectedFile)

      try {
        const response = await importExcelProduct(selectedFile)

        if (response) {
          console.log('File uploaded successfully')
          toast.success('File uploaded successfully', { autoClose: 2000 })
          props.fetchData()
        } else {
          console.error('File upload failed')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      }

      handleCloseDialog()
    } else {
      alert('Please select a file first.')
    }
  }

  return (
    <div className='flex items-center justify-center'>
      {/* Nút import */}
      <Button onClick={handleOpenDialog} className='bg-blue-500 text-white'>
        Import
      </Button>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-4'>
            <input
              ref={fileInputRef}
              type='file'
              className='border border-gray-300 rounded p-2 w-full'
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleEnterClick} className='bg-[#0765ff] hover:bg-[#0765ff]/90 text-[#fff]'>
              Enter
            </Button>
            <Button onClick={handleCloseDialog} variant='secondary'>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ImportButton
