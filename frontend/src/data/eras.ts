export interface Era {
  id: string;
  name: string;
  period: string;
  description: string;
  startYear: number; // Negative for BCE
}

export const eras: Era[] = [
  {
    id: 'biblical',
    name: 'Biblical Era',
    period: '2000 BCE - 516 BCE',
    description: 'From Abraham to the Second Temple',
    startYear: -2000
  },
  {
    id: 'second-temple',
    name: 'Second Temple Period',
    period: '516 BCE - 70 CE',
    description: 'Persian, Greek, and Roman rule',
    startYear: -516
  },
  {
    id: 'diaspora',
    name: 'Early Diaspora',
    period: '70 CE - 1000 CE',
    description: 'Talmudic era and dispersion',
    startYear: 70
  },
  {
    id: 'medieval',
    name: 'Medieval Period',
    period: '1000 - 1500',
    description: 'Golden Age and persecutions',
    startYear: 1000
  },
  {
    id: 'early-modern',
    name: 'Early Modern',
    period: '1500 - 1800',
    description: 'Expulsions and new communities',
    startYear: 1500
  },
  {
    id: 'modern',
    name: 'Modern Era',
    period: '1800 - 1948',
    description: 'Emancipation to Holocaust',
    startYear: 1800
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    period: '1948 - Present',
    description: 'State of Israel and modern Jewry',
    startYear: 1948
  }
];