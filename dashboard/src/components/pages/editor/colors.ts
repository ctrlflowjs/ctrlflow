const colors = [
  "#EF5350", // red
  "#EC407A", // pink
  "#AB47BC", // purple
  "#7E57C2", // deep purple
  "#5C6BC0", // indigo
  "#42A5F5", // blue
  "#29B6F6", // light blue
  "#26C6DA", // cyan
  "#26A69A", // teal
  "#66BB6A", // green
  "#9CCC65", // light green
  "#D4E157", // lime
  "#FFEE58", // yellow
  "#FFCA28", // amber
  "#FFA726", // orange
  "#FF7043", // deep orange
  "#8D6E63", // brown
  "#78909C", // deep blue grey
]

export function pickColor(str) {
  if (!str || str === "?") {
    return "#9E9E9E" // grey
  }
  let hash = hashString(str)
  let colorIndex = Math.abs(hash % colors.length)
  return colors[colorIndex]
}

function hashString(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
