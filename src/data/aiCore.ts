export interface DashboardPanel {
  label: string;
  value: string;
  position: [number, number, number];
  color: string;
}

export const DASHBOARD_PANELS: DashboardPanel[] = [
  { label: "AI Accuracy", value: "98.7%", position: [-3.4, 1.6, 0.4], color: "#FF5559" },
  { label: "Neural Activity", value: "92%", position: [3.3, 1.9, -0.6], color: "#292D50" },
  { label: "Quantum Processing", value: "Active", position: [-3.6, -1.3, -0.3], color: "#292D50" },
  { label: "Cloud Status", value: "Online", position: [3.5, -1.6, 0.5], color: "#FF5559" },
  { label: "Projects", value: "500+", position: [-2.6, 0.1, 1.6], color: "#FF5559" },
  { label: "Research", value: "24", position: [2.7, -0.2, 1.7], color: "#292D50" },
];

export interface TechObject {
  kind: "chip" | "cube" | "cylinder" | "satellite" | "core" | "helix" | "crystal" | "hex" | "fragment";
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}

export const TECH_OBJECTS: TechObject[] = [
  { kind: "chip", position: [-3.1, 0.9, -0.8], scale: 0.32, color: "#FF5559", speed: 1.1 },
  { kind: "cube", position: [3.0, 1.1, 0.7], scale: 0.28, color: "#292D50", speed: 0.9 },
  { kind: "cylinder", position: [-2.9, -0.9, 0.9], scale: 0.3, color: "#171A36", speed: 1.3 },
  { kind: "satellite", position: [2.8, -1.0, -0.7], scale: 0.3, color: "#FF7376", speed: 0.8 },
  { kind: "core", position: [0, 2.4, -1.2], scale: 0.26, color: "#FF5559", speed: 1.0 },
  { kind: "helix", position: [0, -2.3, 1.0], scale: 0.3, color: "#292D50", speed: 1.2 },
  { kind: "crystal", position: [-1.9, 1.9, 1.4], scale: 0.24, color: "#FF7376", speed: 1.4 },
  { kind: "hex", position: [2.0, -1.9, -1.3], scale: 0.28, color: "#171A36", speed: 0.7 },
  { kind: "fragment", position: [1.8, 2.1, 1.2], scale: 0.22, color: "#292D50", speed: 1.5 },
];
