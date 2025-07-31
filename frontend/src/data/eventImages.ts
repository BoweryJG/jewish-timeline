// Event image mappings for timeline events
// These will be replaced with actual historical images

export interface EventImage {
  url: string;
  caption: string;
  credit?: string;
}

export interface EventImageSet {
  hero?: EventImage;
  gallery?: EventImage[];
  thumbnail?: string;
}

// Map event IDs or titles to image sets
export const eventImages: Record<string, EventImageSet> = {
  'The Exodus from Egypt': {
    hero: {
      url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&h=600&fit=crop',
      caption: 'Ancient Egyptian pyramids at sunset',
      credit: 'Unsplash'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=600&fit=crop',
        caption: 'Desert landscape representing the journey',
        credit: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
        caption: 'Ancient scrolls and texts',
        credit: 'Unsplash'
      }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400&h=300&fit=crop'
  },
  'Destruction of the First Temple': {
    hero: {
      url: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&h=600&fit=crop',
      caption: 'Ancient ruins in Jerusalem',
      credit: 'Unsplash'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
        caption: 'Archaeological remains',
        credit: 'Unsplash'
      }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=400&h=300&fit=crop'
  },
  'Building of Second Temple': {
    hero: {
      url: 'https://images.unsplash.com/photo-1552423314-cf29ab68ad73?w=1200&h=600&fit=crop',
      caption: 'Jerusalem old city walls',
      credit: 'Unsplash'
    },
    thumbnail: 'https://images.unsplash.com/photo-1552423314-cf29ab68ad73?w=400&h=300&fit=crop'
  },
  'The Great Revolt': {
    hero: {
      url: 'https://images.unsplash.com/photo-1602444225576-2c69c7cec402?w=1200&h=600&fit=crop',
      caption: 'Ancient fortress ruins',
      credit: 'Unsplash'
    },
    thumbnail: 'https://images.unsplash.com/photo-1602444225576-2c69c7cec402?w=400&h=300&fit=crop'
  },
  'Bar Kokhba Revolt': {
    hero: {
      url: 'https://images.unsplash.com/photo-1599423217192-34124d7628e3?w=1200&h=600&fit=crop',
      caption: 'Desert caves and hideouts',
      credit: 'Unsplash'
    },
    thumbnail: 'https://images.unsplash.com/photo-1599423217192-34124d7628e3?w=400&h=300&fit=crop'
  },
  'Spanish Inquisition': {
    hero: {
      url: 'https://images.unsplash.com/photo-1565362845125-3e2e30c27bc9?w=1200&h=600&fit=crop',
      caption: 'Medieval Spanish architecture',
      credit: 'Unsplash'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        caption: 'Ancient manuscripts',
        credit: 'Unsplash'
      }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1565362845125-3e2e30c27bc9?w=400&h=300&fit=crop'
  },
  'Holocaust': {
    hero: {
      url: 'https://images.unsplash.com/photo-1566313491024-3f2c7cf8f225?w=1200&h=600&fit=crop',
      caption: 'Memorial candles',
      credit: 'Unsplash'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&h=600&fit=crop',
        caption: 'Memorial site',
        credit: 'Unsplash'
      }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1566313491024-3f2c7cf8f225?w=400&h=300&fit=crop'
  },
  'Establishment of Israel': {
    hero: {
      url: 'https://images.unsplash.com/photo-1544008355-0c4cb8a3e3e5?w=1200&h=600&fit=crop',
      caption: 'Modern Tel Aviv skyline',
      credit: 'Unsplash'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1537958096546-84e6f521c5de?w=800&h=600&fit=crop',
        caption: 'Israeli flag waving',
        credit: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=800&h=600&fit=crop',
        caption: 'Jerusalem modern and ancient',
        credit: 'Unsplash'
      }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544008355-0c4cb8a3e3e5?w=400&h=300&fit=crop'
  },
  'Six Day War': {
    hero: {
      url: 'https://images.unsplash.com/photo-1547487881-43b09ec81c8f?w=1200&h=600&fit=crop',
      caption: 'Western Wall plaza',
      credit: 'Unsplash'
    },
    thumbnail: 'https://images.unsplash.com/photo-1547487881-43b09ec81c8f?w=400&h=300&fit=crop'
  }
};

// Background images for different eras
export const eraBackgrounds: Record<string, string> = {
  'Ancient': 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1920&h=1080&fit=crop',
  'Classical': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop',
  'Medieval': 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&h=1080&fit=crop',
  'Modern': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop',
  'Contemporary': 'https://images.unsplash.com/photo-1545989253-02cc4f1bf968?w=1920&h=1080&fit=crop'
};

// Decorative elements
export const decorativeAssets = {
  starOfDavid: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01MCAxNUw2NS41IDQ1SDM0LjVMNTAgMTVaIiBmaWxsPSIjRkZENzAwIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8cGF0aCBkPSJNNTAgODVMMzQuNSA1NUg2NS41TDUwIDg1WiIgZmlsbD0iI0ZGRDcwMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPC9zdmc+',
  menorah: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjQ4IiB5PSIzMCIgd2lkdGg9IjQiIGhlaWdodD0iNTAiIGZpbGw9IiNGRkQ3MDAiIGZpbGwtb3BhY2l0eT0iMC4zIi8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQiIGZpbGw9IiNGRkQ3MDAiIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==',
  scroll: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMjAgMjBIMTAwVjYwSDIwVjIwWiIgZmlsbD0iI0ZGRDcwMCIgZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZT0iI0ZGRDcwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRkZENzAwIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI0MCIgcj0iMTUiIGZpbGw9IiNGRkQ3MDAiIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg=='
};