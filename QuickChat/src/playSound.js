export const playSound = (filePath) => {
  const audio = new Audio(filePath);
  audio.play().catch((err) => console.error("Sound error:", err));
};
