export const ColorGroups = {
  temp: [
    "rgba(252, 236, 0, 0.6)",
    "rgba(0, 178, 28, 0.48)",
    "rgba(79, 99, 227, 0.2)",
  ],
  wind: [
    "rgba(125, 179, 235, 0.5)",
    "rgba(125, 179, 235, 0.5)",
    "rgba(125, 179, 235, 0)",
  ],
  pressure: [
    "rgba(137, 133, 236, 0.5)",
    "rgba(137, 133, 236, 0.5)",
    "rgba(137, 133, 236, 0)",
  ],
  visibility: [
    "rgba(72, 161, 111, 0.5)",
    "rgba(72, 161, 111, 0.5)",
    "rgba(72, 161, 111, 0.0)",
  ],
};

export const UVLabelGrads = [
  { stop: 0, color: "#6EC05F" }, // Low (green)
  { stop: 0.2, color: "#F7E967" }, // Moderate (yellow)
  { stop: 0.4, color: "#F9C846" }, // High (orange-yellow)
  { stop: 0.6, color: "#F97C3D" }, // Very High (orange)
  { stop: 0.8, color: "#E94F4A" }, // Extreme (red)
  { stop: 1, color: "#B12A90" }, // Ultra (purple)
];
