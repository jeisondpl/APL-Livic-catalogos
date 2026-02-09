"use client";
/**
 * Gallery.tsx
 * Galería premium con grid mejorado, efectos hover y lightbox con iconos.
 * Client component para manejo de estado y navegación.
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { ApartmentPhoto } from "@/data/apartments";

interface GalleryProps {
  photos: ApartmentPhoto[];
  /** Máximo de fotos visibles en la cuadrícula antes de "Ver todas" */
  maxVisible?: number;
}

export default function Gallery({ photos, maxVisible = 12 }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visiblePhotos = showAll ? photos : photos.slice(0, maxVisible);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const goToPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === photos.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <>
      {/* Grid de imágenes mejorado */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {visiblePhotos.map((photo, index) => (
          <button
            key={photo.src}
            onClick={() => openLightbox(index)}
            className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer border border-surface-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-livic-pink"
            aria-label={`Ver foto: ${photo.alt}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay en hover */}
            <div className="absolute inset-0 bg-livic-black/0 group-hover:bg-livic-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="w-12 h-12 rounded-full bg-livic-white/20 backdrop-blur-sm flex items-center justify-center border border-livic-white/30">
                <Plus className="w-8 h-8 text-livic-white" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Botón "Ver todas las fotos" con estilo mejorado */}
      {!showAll && photos.length > maxVisible && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-surface-300 text-livic-pink text-sm font-semibold hover:bg-surface-100 transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-livic-pink"
          >
            Ver todas las fotos ({photos.length})
          </button>
        </div>
      )}

      {/* Lightbox Modal con iconos Lucide */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-livic-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Botón cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-livic-white/10 hover:bg-livic-white/20 flex items-center justify-center transition-colors z-[110]"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6 text-livic-white" />
          </button>

          {/* Navegación - Anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 md:left-8 w-14 h-14 rounded-full bg-livic-white/10 hover:bg-livic-white/20 flex items-center justify-center transition-colors group"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-10 h-10 text-livic-white group-hover:-translate-x-1 transition-transform" />
          </button>
          
          {/* Navegación - Siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 md:right-8 w-14 h-14 rounded-full bg-livic-white/10 hover:bg-livic-white/20 flex items-center justify-center transition-colors group"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="w-10 h-10 text-livic-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Imagen central */}
          <div className="max-w-[90vw] max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Contador inferior */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-livic-white/10 backdrop-blur-md text-livic-white text-sm font-medium border border-livic-white/20 tracking-wide">
            {selectedImage + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}