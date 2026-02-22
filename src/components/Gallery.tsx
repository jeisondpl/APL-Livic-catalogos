"use client";

/**
 * Gallery.tsx
 * Galería premium con diseño tipo "Hero Grid" (1 grande + 4 pequeñas).
 * Implementa el diseño de referencia con botón flotante de "Mostrar todas".
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import type { ApartmentPhoto } from "@/data/apartments";

interface GalleryProps {
  photos: ApartmentPhoto[];
}

export default function Gallery({ photos }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Tomamos las primeras 5 para el layout especial
  const heroPhotos = photos.slice(0, 5);
  // Fotos para el modo "ver todas"
  const allPhotos = photos;

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

  if (showAll) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Todas las fotos ({photos.length})</h3>
          <button 
            onClick={() => setShowAll(false)}
            className="text-livic-pink text-sm font-semibold hover:underline"
          >
            Volver a vista previa
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPhotos.map((photo, index) => (
            <button
              key={photo.src}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] overflow-hidden rounded-xl group border border-surface-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </button>
          ))}
        </div>
        {renderLightbox()}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Grid estilo Hero (1 grande + 4 pequeñas) */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 md:gap-3 h-[400px] md:h-[500px] lg:h-[600px]">
        
        {/* Foto 1: Grande Izquierda */}
        <button
          onClick={() => openLightbox(0)}
          className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group border border-surface-300"
        >
          <img
            src={heroPhotos[0].src}
            alt={heroPhotos[0].alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {/* Fotos restantes (2 a 5) */}
        {heroPhotos.slice(1).map((photo, index) => (
          <button
            key={photo.src}
            onClick={() => openLightbox(index + 1)}
            className="relative overflow-hidden rounded-2xl group border border-surface-300 hidden md:block"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            
            {/* El botón de "Mostrar todas" se posiciona sobre la última imagen */}
            {index === 3 && (
              <div className="absolute bottom-4 right-4 z-10">
                <div 
                  onClick={(e) => { e.stopPropagation(); setShowAll(true); }}
                  className="bg-white text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-bold hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Ver todas
                </div>
              </div>
            )}
          </button>
        ))}

        {/* Fallback móvil para fotos 2 y 3 (para que no se vea vacío) */}
        <button
          onClick={() => openLightbox(1)}
          className="md:hidden relative overflow-hidden rounded-2xl group border border-surface-300"
        >
          <img src={heroPhotos[1].src} alt={heroPhotos[1].alt} className="w-full h-full object-cover" />
        </button>
        <button
          onClick={() => openLightbox(2)}
          className="md:hidden relative overflow-hidden rounded-2xl group border border-surface-300"
        >
          <img src={heroPhotos[2].src} alt={heroPhotos[2].alt} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 right-3">
             <div 
                onClick={(e) => { e.stopPropagation(); setShowAll(true); }}
                className="bg-white text-black px-3 py-1.5 rounded-md shadow-lg flex items-center gap-2 text-xs font-bold"
              >
                <LayoutGrid className="w-3 h-3" />
                Ver todas
              </div>
          </div>
        </button>
      </div>

      {renderLightbox()}
    </div>
  );

  function renderLightbox() {
    if (selectedImage === null) return null;
    return (
      <div 
        className="fixed inset-0 z-[100] bg-livic-black/95 flex items-center justify-center backdrop-blur-sm"
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={closeLightbox}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-livic-white/10 hover:bg-livic-white/20 flex items-center justify-center transition-colors z-[110]"
          aria-label="Cerrar galería"
        >
          <X className="w-6 h-6 text-livic-white" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          className="absolute left-2 md:left-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-livic-white/10 hover:bg-livic-white/20 flex items-center justify-center transition-colors group z-[110]"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6 md:w-10 md:h-10 text-livic-white group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          className="absolute right-2 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-livic-white/10 hover:bg-livic-white/20 flex items-center justify-center transition-colors group z-[110]"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-6 h-6 md:w-10 md:h-10 text-livic-white group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="max-w-[90vw] max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
          <img
            src={photos[selectedImage].src}
            alt={photos[selectedImage].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-livic-white/10 backdrop-blur-md text-livic-white text-sm font-medium border border-livic-white/20 tracking-wide">
          {selectedImage + 1} / {photos.length}
        </div>
      </div>
    );
  }
}
