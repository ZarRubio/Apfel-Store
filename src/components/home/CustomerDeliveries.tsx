'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/UiIcons';

const customerPhotos = [
  'IMG_5027.PNG', 'IMG_5028.PNG', 'IMG_5029.PNG', 'IMG_5031.PNG', 'IMG_5032.PNG',
  'IMG_5033.PNG', 'IMG_5034.PNG', 'IMG_5035.PNG', 'IMG_5036.PNG', 'IMG_5037.PNG',
  'IMG_5038.PNG', 'IMG_5039.PNG', 'IMG_5040.PNG', 'IMG_5052.PNG', 'IMG_5069.JPG',
  'IMG_5070.JPG', 'IMG_5071.JPG', 'IMG_5072.JPG', 'IMG_5073.JPG',
].map((filename) => `/CLIENTES-20260928T135017Z-1-001/CLIENTES/${filename}`);

export function CustomerDeliveries() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = Math.max(0, Math.min(index, customerPhotos.length - 1));
    const slide = track.children.item(nextIndex) as HTMLElement | null;
    if (!slide) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updatePosition = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const closest = slides.reduce((best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Number.POSITIVE_INFINITY });
      setActiveSlide(closest.index);
      setCanGoBack(track.scrollLeft > 2);
      setCanGoForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
    };
    updatePosition();
    track.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    return () => {
      track.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return <section className="deliveries-section section" aria-labelledby="deliveries-title">
    <div className="container">
      <div className="deliveries-heading">
        <div>
          <span className="eyebrow">CLIENTES APFEL STORE</span>
          <h2 id="deliveries-title">Gracias por elegirnos.</h2>
        </div>
        <p>Algunos momentos de nuestros clientes con sus nuevos equipos.</p>
      </div>

      <div className="deliveries-toolbar">
        <p className="carousel-status" aria-live="polite">{String(activeSlide + 1).padStart(2, '0')} / {String(customerPhotos.length).padStart(2, '0')} · Usa flechas o desliza</p>
        <div className="deliveries-controls" aria-label="Controles de fotos de clientes">
          <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={!canGoBack} aria-label="Ver foto anterior"><ChevronLeftIcon /></button>
          <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={!canGoForward} aria-label="Ver foto siguiente"><ChevronRightIcon /></button>
        </div>
      </div>

      <div ref={trackRef} className="deliveries-carousel" aria-label="Fotos de clientes Apfel Store" aria-live="off">
        {customerPhotos.map((src, index) => <article className="delivery-card" key={src}>
          <div className="delivery-photo-wrap">
            <Image className="delivery-photo" src={src} alt={`Foto de cliente Apfel Store ${index + 1}`} fill sizes="(max-width: 640px) 88vw, (max-width: 900px) 48vw, 33vw" loading={index < 3 ? 'eager' : 'lazy'} />
            <span className="delivery-watermark" aria-hidden="true"><Image src="/images/brand/apfel-logo.jpg" alt="" width={48} height={48} /></span>
          </div>
          <footer><strong>Cliente Apfel Store</strong><span>{String(index + 1).padStart(2, '0')}</span></footer>
        </article>)}
      </div>
    </div>
  </section>;
}
