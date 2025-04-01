import React, { useState, useEffect } from 'react';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Google Drive mappa URL-je feltöltéssel
  const DRIVE_UPLOAD_URL = 'https://drive.google.com/drive/u/2/folders/14Xotll1Dr-VPOK-9xNiv1u3Dx1Wl91ZV?upload=true';
  // Google Apps Script URL a képek listázásához
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-lninQPSVBj4ahsLtOUG4SLAiXvVFh0Kx7V5XVBom-ZvoRcvh2NHGEnDb9fs3AgNJ-A/exec';

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SCRIPT_URL}?cache=${Date.now()}`);
      const data = await response.json();
      
      if (!data.success) throw new Error(data.error || 'Ismeretlen hiba');
      
      setImages(data.images || []);
      setError(null);
    } catch (err) {
      console.error('Hiba a képek betöltésekor:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentIndex + 1) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
  };

  const getImageUrl = (image) => {
    return `https://lh3.googleusercontent.com/d/${image.id}=w1200`;
  };

  const handleUploadClick = () => {
    // Megnyitjuk a Google Drive feltöltő felületét
    window.open(DRIVE_UPLOAD_URL, '_blank');
  };

  if (loading) return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center bg-[#FFF0F5] p-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      <span className="ml-4">Képek betöltése...</span>
    </div>
  );

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-8 text-center">
        Galéria
      </h2>
      
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-gray-700 mb-6">
          Kedves Vendégeink! 📸
          <br />
          Kérjük, osszátok meg velünk az esküvőn készült fotóitokat. 
          A képeket a Google Drive mappába tudjátok feltölteni.
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={handleUploadClick}
            className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Képek feltöltése a Drive-ban
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 w-full max-w-2xl">
          <p className="font-bold">Hiba történt</p>
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            OK
          </button>
        </div>
      )}

      {images.length === 0 && !loading && !error && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8 w-full max-w-2xl">
          <p>Még nincsenek képek a galériában. Legyél te az első, aki feltölt!</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group aspect-square"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={`https://lh3.googleusercontent.com/d/${image.id}=w500`}
              alt={image.name || 'Esküvői kép'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://drive.google.com/thumbnail?id=${image.id}&sz=w500`;
              }}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={getImageUrl(selectedImage)}
              alt={selectedImage.name}
              className="max-h-[90vh] max-w-full object-contain mx-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://drive.google.com/uc?export=view&id=${selectedImage.id}`;
              }}
            />
            
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
            >
              ❮
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
            >
              ❯
            </button>
            
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;