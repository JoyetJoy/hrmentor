export const getRandomPastelColor = () => {
  const getRandomComponent = () => Math.floor(Math.random() * 127 + 128);

  const r = getRandomComponent();
  const g = getRandomComponent();
  const b = getRandomComponent();

  const randomColor = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return randomColor;
};

export const parseDateString = (value) => {
  return value ? new Date(value) : null;
};

export function extractTime(timestamp) {
  return timestamp.split(" ")[1]; // Extracts the time part
}

export const getCurrentDateISO = (dateString) => {
  if (!dateString) return new Date().toISOString().split('T')[0]; // Default to today if no date is provided
  const localDate = new Date(dateString);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // Adjust for timezone shift

  return localDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
};


