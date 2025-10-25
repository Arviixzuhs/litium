import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

export interface ImageFile {
  id: string
  file?: File | null
  imageURL: string
}

interface ImageUploadContextType {
  images: ImageFile[]
  currentIndex: number
  isDragging: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  formData: FormData
  appendField: (key: string, value: any) => void
  resetFormData: () => void
  handleFiles: (files: FileList | null) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent) => void
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeImage: (id: string) => void
  nextImage: () => void
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>
  previousImage: () => void
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(undefined)

export const ImageUploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<ImageFile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 🔹 Nuevo: mantenemos un FormData global dentro del provider
  const [formData] = useState<FormData>(() => new FormData())

  /** 🔹 Agrega o actualiza campos en el formData */
  const appendField = useCallback(
    (key: string, value: any) => {
      formData.delete(key) // limpiar valores anteriores

      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}[]`, v))
      } else {
        formData.append(key, value)
      }
    },
    [formData],
  )

  /** 🔹 Limpia el formData */
  const resetFormData = useCallback(() => {
    for (const key of Array.from(formData.keys())) {
      formData.delete(key)
    }
    setImages([])
  }, [formData])

  /** 🔹 Manejo de imágenes */
  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))

    const newImages: ImageFile[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      imageURL: URL.createObjectURL(file),
    }))

    setImages((prev) => [...prev, ...newImages])
  }, [])

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (images.length === 0) setIsDragging(true)
    },
    [images.length],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (images.length > 0) return
      const files = e.dataTransfer.files
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))
      if (imageFiles.length !== files.length) alert('Solo se permiten archivos de imagen')
      if (imageFiles.length > 0) {
        const fileList = new DataTransfer()
        imageFiles.forEach((file) => fileList.items.add(file))
        handleFiles(fileList.files)
      }
    },
    [handleFiles, images.length],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files),
    [handleFiles],
  )

  const removeImage = useCallback(
    (id: string) => {
      setImages((prev) => {
        const filtered = prev.filter((img) => img.id !== id)
        const imageToRemove = prev.find((img) => img.id === id)
        if (imageToRemove) URL.revokeObjectURL(imageToRemove.imageURL)
        return filtered
      })
      setCurrentIndex((prev) => Math.max(0, Math.min(prev, images.length - 2)))
    },
    [images.length],
  )

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const previousImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  /** 🔹 Cada vez que cambien las imágenes, actualizamos el FormData */
  useEffect(() => {
    formData.delete('images')
    images.forEach((img) => {
      if (img.file) {
        formData.append('images', img.file)
      }
    })
  }, [images, formData])

  return (
    <ImageUploadContext.Provider
      value={{
        images,
        currentIndex,
        isDragging,
        fileInputRef,
        formData,
        appendField,
        resetFormData,
        setImages,
        handleFiles,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileInput,
        removeImage,
        nextImage,
        previousImage,
        setCurrentIndex,
        setIsDragging,
      }}
    >
      {children}
    </ImageUploadContext.Provider>
  )
}

export const useImageUpload = () => {
  const context = useContext(ImageUploadContext)
  if (!context) throw new Error('useImageUpload must be used within an ImageUploadProvider')
  return context
}
