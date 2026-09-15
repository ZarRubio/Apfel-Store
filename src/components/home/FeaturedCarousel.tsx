'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';

export function FeaturedCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter products by selected tab
  const filteredProducts = useMemo(() => {
    if (selectedFilter === 'all') return products;
    if (selectedFilter === 'offers') {
      return products.filter((p) => p.offer && p.previousPrice && p.price && p.previousPrice > p.price);
    }
    return products.filter((p) => p.series === selectedFilter);
  }, [products, selectedFilter]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = 0; // reset scroll when filter changes
    const update = () => {
      setEdges({
        start: track.scrollLeft <= 1,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
    };
  }, [filteredProducts.length]);

  function move(direction: number) {
    const track = trackRef.current;
    if (track) {
      track.scrollBy({
        left: direction * (track.clientWidth * 0.75),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  }

  const filterTabs = [
    { id: 'all', label: 'Todos' },
    { id: '18', label: 'Serie 18' },
    { id: '17', label: 'Serie 17' },
    { id: '16', label: 'Serie 16' },
    { id: 'offers', label: '⚡ En Oferta' },
  ];

  return (
    <section className="featured-carousel" aria-label="Productos destacados" aria-roledescription="carrusel">
      {/* Filter Tabs Header */}
      <div className="carousel-filter-bar">
        <div className="carousel-tabs" role="tablist" aria-label="Filtrar modelos en carrusel">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`carousel-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedFilter(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="carousel-nav-arrows">
          <button
            type="button"
            className="carousel-arrow-btn"
            aria-label="Ver productos anteriores"
            disabled={edges.start}
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="carousel-arrow-btn"
            aria-label="Ver productos siguientes"
            disabled={edges.end}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        id="featured-products"
        className="featured-carousel-track"
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Modelos destacados; usa las flechas para desplazarte"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        {filteredProducts.map((product) => (
          <div className="featured-carousel-slide" key={product.id}>
            <ProductCard
              product={product}
              sizes="(max-width: 640px) 85vw, (max-width: 900px) 46vw, 30vw"
            />
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="carousel-controls-bottom">
        <span className="carousel-status">
          Mostrando <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'modelo' : 'modelos'}
        </span>
      </div>
    </section>
  );
}
