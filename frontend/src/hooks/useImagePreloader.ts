import { useEffect, useState, useRef } from 'react';

interface ImagePreloaderOptions {
  fadeDuration?: number;
  preloadNext?: number;
}

export function useImagePreloader(imageUrls: string[], options: ImagePreloaderOptions = {}) {
  const { fadeDuration = 1000, preloadNext = 2 } = options;
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (imageCache.current.has(url)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        imageCache.current.set(url, img);
        setLoadedImages(prev => new Set(prev).add(url));
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const preloadImages = async (urls: string[]) => {
    const promises = urls.map(url => preloadImage(url).catch(err => {
      console.error(`Failed to preload image: ${url}`, err);
    }));
    await Promise.all(promises);
  };

  // Preload current and next images
  useEffect(() => {
    if (imageUrls.length === 0) return;

    const imagesToPreload = imageUrls.slice(0, preloadNext + 1);
    preloadImages(imagesToPreload);
  }, [imageUrls, preloadNext]);

  // Check if current image is loaded
  useEffect(() => {
    if (imageUrls.length > 0) {
      const currentUrl = imageUrls[0];
      setCurrentImageLoaded(loadedImages.has(currentUrl));
    }
  }, [imageUrls, loadedImages]);

  // Preload next images as user progresses
  const preloadAhead = (currentIndex: number) => {
    const nextImages = [];
    for (let i = 1; i <= preloadNext; i++) {
      const nextIndex = (currentIndex + i) % imageUrls.length;
      nextImages.push(imageUrls[nextIndex]);
    }
    preloadImages(nextImages);
  };

  const getImageElement = (url: string): HTMLImageElement | undefined => {
    return imageCache.current.get(url);
  };

  const isImageLoaded = (url: string): boolean => {
    return loadedImages.has(url);
  };

  // Progressive image loading with blur-up effect
  const getImageStyle = (url: string): React.CSSProperties => {
    const loaded = isImageLoaded(url);
    return {
      filter: loaded ? 'blur(0px)' : 'blur(20px)',
      transform: loaded ? 'scale(1)' : 'scale(1.1)',
      transition: `all ${fadeDuration}ms ease-out`,
    };
  };

  return {
    loadedImages,
    currentImageLoaded,
    preloadAhead,
    getImageElement,
    isImageLoaded,
    getImageStyle,
    preloadImage,
  };
}

// Hook for lazy loading images with intersection observer
export function useLazyImageLoader(threshold = 0.1) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src && !loadedImages.has(src)) {
              img.src = src;
              img.onload = () => {
                setLoadedImages(prev => new Set(prev).add(src));
                img.classList.add('loaded');
              };
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { threshold }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, loadedImages]);

  const observeImage = (element: HTMLImageElement) => {
    if (observerRef.current && element.dataset.src) {
      observerRef.current.observe(element);
    }
  };

  return { observeImage, loadedImages };
}