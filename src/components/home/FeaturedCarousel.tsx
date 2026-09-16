'use client';

import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';

export function FeaturedCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => setEdges({ start: track.scrollLeft <= 1, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1 });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); track.removeEventListener('scroll', update); };
  }, [products.length]);

  function move(direction: number) {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return <section className="featured-carousel" aria-label="Productos destacados" aria-roledescription="carrusel">
    <div id="featured-products" className="featured-carousel-track" ref={trackRef} tabIndex={0} role="group" aria-label="Modelos destacados; usa las flechas para desplazarte" onKeyDown={(event) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    }}>
      {products.map((product) => <div className="featured-carousel-slide" key={product.id}><ProductCard product={product} sizes="(max-width: 640px) 90vw, (max-width: 900px) 46vw, 32vw" /></div>)}
    </div>
    <div className="carousel-controls"><span className="carousel-status">{products.length} modelos destacados</span><div><button type="button" aria-label="Productos anteriores" aria-controls="featured-products" disabled={edges.start} onClick={() => move(-1)}>←</button><button type="button" aria-label="Productos siguientes" aria-controls="featured-products" disabled={edges.end} onClick={() => move(1)}>→</button></div></div>
  </section>;
}
