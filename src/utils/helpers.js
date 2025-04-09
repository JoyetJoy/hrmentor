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
  if (!dateString) return new Date().toISOString().split("T")[0]; // Default to today if no date is provided
  const localDate = new Date(dateString);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // Adjust for timezone shift

  return localDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
};

export const formatDateRange = (startDate) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };

  const formattedStartDate = new Date(startDate).toLocaleDateString(
    "en-GB",
    options,
  );
  return formattedStartDate;
};

export function formatLastMessageTime(isoTime) {
  const msgDate = new Date(isoTime);
  const today = new Date();

  const isToday =
    msgDate.getDate() === today.getDate() &&
    msgDate.getMonth() === today.getMonth() &&
    msgDate.getFullYear() === today.getFullYear();

  if (isToday) {
    // Format time as HH:mm (24-hour)
    const hours = msgDate.getHours().toString().padStart(2, "0");
    const minutes = msgDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // Format as dd/MM/yyyy
    const day = msgDate.getDate().toString().padStart(2, "0");
    const month = (msgDate.getMonth() + 1).toString().padStart(2, "0");
    const year = msgDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
