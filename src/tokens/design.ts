export const designTokens = {
  color: {
    ivory: '#f4ede3',
    sand: '#e4d4be',
    taupe: '#c6b29a',
    graphite: '#1f1a17',
    charcoal: '#2b2420',
    bronze: '#9b7a55',
    gold: '#b89466',
    line: 'rgba(31, 26, 23, 0.12)'
  },
  typography: {
    display: "'Cormorant Garamond', 'Times New Roman', serif",
    body: "'Manrope', 'Inter', system-ui, sans-serif",
    ui: "'Inter', system-ui, sans-serif"
  },
  radius: {
    xl: '30px',
    lg: '22px',
    md: '16px',
    sm: '12px'
  },
  shadow: {
    panel: '0 26px 80px rgba(31, 26, 23, 0.11)',
    ambient: '0 12px 28px rgba(31, 26, 23, 0.08)'
  },
  layout: {
    max: '1240px',
    wide: '1360px'
  }
} as const;

export type DesignTokens = typeof designTokens;
