import React, { useState, useEffect } from 'react'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

const GallerySection = () => {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const fetchImages = async () => {
    try {
      const listRef = ref(storage, 'images/')
      const res = await listAll(listRef)
      const urls = await Promise.all(res.items.map(itemRef => getDownloadURL(itemRef)))
      // Random sorrend
      const shuffled = urls.sort(() => Math.random() - 0.5)
      setImages(shuffled)
    } catch (err) {
      console.error('Hiba a képek lekérésénél:', err)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleImageUpload = async e => {
    const files = e.target.files
    if (!files.length) return

    setError('')
    setMessage('')

    try {
      for (let i = 0; i < files.length; i++) {
        const fileRef = ref(storage, `images/${files[i].name}`)
        await uploadBytes(fileRef, files[i])
      }
      setMessage('Nagyon hálásak vagyunk, hogy megosztottad ezt a fantasztikus emlék-képet velünk 😊')
      fetchImages()
    } catch (err) {
      console.error('Feltöltési hiba:', err)
      setError('Hiba történt a feltöltés során.')
    }
  }

  const prevImage = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full md:w-2/3 flex flex-col items-center bg-[#FFF0F5] p-10 overflow-y-auto">
      <h2 className="text-5xl font-serif italic text-center text-[#000] mb-6">Galéria</h2>

      {images.length > 0 ? (
        <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center border border-black rounded-md bg-white shadow-lg mb-4">
          <img src={images[currentIndex]} alt="Galéria kép" className="max-h-full max-w-full object-contain" />
          <button onClick={prevImage} className="absolute left-4 text-3xl font-bold">
            {'❮'}
          </button>
          <button onClick={nextImage} className="absolute right-4 text-3xl font-bold">
            {'❯'}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">Még nincsenek képek a galériában.</p>
      )}

      {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <div className="flex flex-col md:flex-row gap-4">
        <label className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md cursor-pointer hover:bg-blue-700">
          📤 Képfeltöltés
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
        </label>
        <a
          href="https://drive.google.com/drive/u/0/folders/1gFZltksM9ZUMVOKgqbynmbZVPDXbYNqf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-600"
        >
          Megnyitás a Drive-ban 📁
        </a>
      </div>
    </div>
  )
}

export default GallerySection
