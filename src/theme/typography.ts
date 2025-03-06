export const typography = {
  fonts: {
    primary: 'Poppins',
    secondary: 'Roboto',
  },
  sizes: {
    h1: 24,
    h2: 20,
    h3: 18,
    body: 16,
    caption: 14,
  },
  weights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

export const createTextStyle = (
  size: keyof typeof typography.sizes,
  font: keyof typeof typography.fonts = 'primary',
  weight: keyof typeof typography.weights = 'regular'
) => ({
  fontSize: typography.sizes[size],
  fontFamily: `${typography.fonts[font]}-${typography.weights[weight]}`,
}); 