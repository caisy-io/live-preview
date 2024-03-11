type HexColor = string;

const farben: HexColor[] = [
  "#FF0000", // Rot
  "#00FF00", // Grün
  "#0000FF", // Blau
  "#FFFF00", // Gelb
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#800000", // Dunkelrot
  "#008000", // Dunkelgrün
  "#000080", // Dunkelblau
  "#808000", // Olive
  "#800080", // Lila
  "#008080", // Teal
  "#FF4500", // Orangerot
  "#7CFC00", // Rasengrün
  "#4169E1", // Königsblau
  "#FF1493", // Tiefrosa
  "#32CD32", // Limettengrün
  "#8B008B", // Dunkelmagenta
  "#FF6347", // Tomatenrot
  "#1E90FF", // Dodgerblau
];

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export const getCollaborationColor = (input: string) => {
  if (!input) {
    return "#000000";
  }
  const hash = hashCode(input);
  const index = Math.abs(hash) % farben.length;
  // console.log(` getCollaborationColor ${input} ${hash} ${farben[index]}`);
  return farben[index];
};
