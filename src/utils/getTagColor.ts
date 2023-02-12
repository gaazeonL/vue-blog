const defaultColors = [
  "#fff0f6",
  "#f6ffed",
  "#f9f0ff",
  "#fff1f0",
  "#fcffe6",
  "#f0f5ff",
  "#fff2e8",
  "#e6fffb",
  "#fffbe6",
  "#e6f4ff",
  "#fff7e6",
];

export default function (index: number, cusColors?: string[]) {
  const colors = cusColors ? cusColors : defaultColors;
  index = index % colors.length;
  return colors[index];
}
