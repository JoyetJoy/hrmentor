export const getRandomPastelColor = () => {
  const base = 255; // Use a high base value for pastel colors

  const getRandomComponent = () => Math.floor(Math.random() * 127 + 128);

  const r = getRandomComponent();
  const g = getRandomComponent();
  const b = getRandomComponent();

  const randomColor = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return randomColor;
};
