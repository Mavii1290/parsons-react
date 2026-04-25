// Type definitions and constants for the gym court designer

export const SOLID_COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Red', hex: '#c8102e' },
  { name: 'Dark Red', hex: '#8b0000' },
  { name: 'Orange', hex: '#ff6a13' },
  { name: 'Yellow', hex: '#ffcd00' },
  { name: 'Gold', hex: '#d4a017' },
  { name: 'Light Green', hex: '#78be20' },
  { name: 'Green', hex: '#00703c' },
  { name: 'Dark Green', hex: '#013a20' },
  { name: 'Teal', hex: '#007a87' },
  { name: 'Light Blue', hex: '#6ec1e4' },
  { name: 'Blue', hex: '#0057b7' },
  { name: 'Navy', hex: '#041e42' },
  { name: 'Royal Purple', hex: '#4b2e83' },
  { name: 'Purple', hex: '#6d2077' },
  { name: 'Pink', hex: '#e60073' },
  { name: 'Brown', hex: '#6b3410' },
  { name: 'Gray', hex: '#8a8d8f' },
  { name: 'Silver', hex: '#c0c0c0' },
];

export const WOOD_STAINS = [
  { name: 'Natural Maple', hex: '#e6c79b' },
  { name: 'Light Maple', hex: '#d9b380' },
  { name: 'Honey', hex: '#cc9966' },
  { name: 'Golden Oak', hex: '#c4955a' },
  { name: 'Pecan', hex: '#a87745' },
  { name: 'Warm Cherry', hex: '#a0522d' },
  { name: 'Medium Oak', hex: '#8b6538' },
  { name: 'Walnut', hex: '#6f4e2c' },
  { name: 'Dark Walnut', hex: '#5c3a1e' },
  { name: 'Mahogany', hex: '#4a2810' },
  { name: 'Espresso', hex: '#3b2414' },
  { name: 'Ebony', hex: '#1f1410' },
];

export type FloorType = 'Wood' | 'Synthetic' | 'Rubber';

export const STANDARD_SIZES = {
  'HIGH SCHOOL STANDARD SIZE': { width: 50, length: 84 },
  'UNIVERSITY STANDARD SIZE': { width: 50, length: 94 },
  'CUSTOM SIZE': { width: 50, length: 84 },
  'NO MAIN BASKETBALL COURT': { width: 0, length: 0 },
};

export type MainCourtSize =
  | 'HIGH SCHOOL STANDARD SIZE'
  | 'UNIVERSITY STANDARD SIZE'
  | 'CUSTOM SIZE'
  | 'NO MAIN BASKETBALL COURT';

export interface CourtElements {
  key: boolean;
  keyArch: boolean;
  threePointArch: boolean;
  centerCircle: boolean;
}

export interface LogoData {
  id: string;
  src: string; // base64 data URL
  x: number; // 0-1 relative position
  y: number;
  size: number; // relative size
}

export interface SideCourt {
  id: string;
  lineColor: string;
  elements: CourtElements;
  rotated: boolean;
  x?: number; // absolute position in feet (optional; undefined = auto-layout)
  y?: number;
}

export interface AdditionalSportCourt {
  count: number; // 0-10
  color: string;
  woodStain: string;
  enabled: boolean;
  positions?: { x: number; y: number; rotated: boolean }[];
}

export interface ElementItem {
  type: 'BOWLING_PIN' | 'BASEBALL_BASES' | 'AGILITY_LADDER' | 'AGILITY_DOTS';
  quantity: number;
  color: string;
  enabled: boolean;
  x?: number;
  y?: number;
  rotated?: boolean;
}

export interface CharacterItem {
  id: string;
  char: string;
  size: number;
  color: string;
  x?: number;
  y?: number;
  rotated?: boolean;
}

export interface DesignState {
  // Splash
  gymWidth: number;
  gymLength: number;
  floorType: FloorType;

  // Step 1
  mainCourtSize: MainCourtSize;
  mainCourtWidth: number;
  mainCourtLength: number;
  mainElements: CourtElements;

  // Step 2
  borderThicknessTB: number;
  borderThicknessLR: number;
  borderColorTB: string;
  borderColorLR: string;
  lineColor: string;
  courtInteriorColor: string; // wood stain hex
  keyColor: string;
  keyArchColor: string;
  threePointFillColor: string;
  logos: LogoData[];

  topBorderFont: string;
  topBorderText: string;
  topBorderFontSize: number;
  topBorderTextColor: string;
  leftBorderFont: string;
  leftBorderText: string;
  leftBorderFontSize: number;
  leftBorderTextColor: string;
  fontOrientation: 'Top Inward/Bottom Inward' | 'Top Outward/Bottom Outward' | 'Top Inward/Bottom Outward' | 'Top Outward/Bottom Inward';
  hiddenLayers: string[];

  // Step 3
  sideCourts: SideCourt[];

  // Step 4
  mainVolleyball: AdditionalSportCourt;
  sideVolleyball: AdditionalSportCourt;
  badminton: AdditionalSportCourt;
  pickleball: AdditionalSportCourt;

  // Step 5
  elements: {
    bowlingPin: ElementItem;
    baseballBases: ElementItem;
    agilityLadder: ElementItem;
    agilityDots: ElementItem;
  };
  characters: CharacterItem[];

  // Main court position (for dragging)
  mainCourtX?: number;
  mainCourtY?: number;
  mainCourtRotated: boolean;

  // View
  zoom: number;
  panX: number;
  panY: number;
  gridlines: boolean;
}

export const createDefaultState = (): DesignState => ({
  gymWidth: 110,
  gymLength: 70,
  floorType: 'Wood',

  mainCourtSize: 'HIGH SCHOOL STANDARD SIZE',
  mainCourtWidth: 50,
  mainCourtLength: 84,
  mainElements: {
    key: true,
    keyArch: true,
    threePointArch: true,
    centerCircle: true,
  },

  borderThicknessTB: 2,
  borderThicknessLR: 2,
  borderColorTB: '#e6c79b',
  borderColorLR: '#e6c79b',
  lineColor: '#000000',
  courtInteriorColor: '#e6c79b',
  keyColor: '#e6c79b',
  keyArchColor: '#e6c79b',
  threePointFillColor: '#e6c79b',
  logos: [],

  topBorderFont: 'Arial',
  topBorderText: '',
  topBorderFontSize: 34,
  topBorderTextColor: '#ffffff',
  leftBorderFont: 'Arial',
  leftBorderText: '',
  leftBorderFontSize: 18,
  leftBorderTextColor: '#ffffff',
  fontOrientation: 'Top Inward/Bottom Inward',

  sideCourts: [],

  mainVolleyball: { count: 0, color: '#0057b7', woodStain: '#e6c79b', enabled: false },
  sideVolleyball: { count: 0, color: '#c8102e', woodStain: '#e6c79b', enabled: false },
  badminton: { count: 0, color: '#00703c', woodStain: '#e6c79b', enabled: false },
  pickleball: { count: 0, color: '#ff6a13', woodStain: '#e6c79b', enabled: false },

  elements: {
    bowlingPin: { type: 'BOWLING_PIN', quantity: 0, color: '#000000', enabled: false },
    baseballBases: { type: 'BASEBALL_BASES', quantity: 0, color: '#ffffff', enabled: false },
    agilityLadder: { type: 'AGILITY_LADDER', quantity: 0, color: '#ffcd00', enabled: false },
    agilityDots: { type: 'AGILITY_DOTS', quantity: 0, color: '#c8102e', enabled: false },
  },
  characters: [],

  mainCourtRotated: true,
  hiddenLayers: [],
  zoom: 1,
  panX: 0,
  panY: 0,
  gridlines: false,
});

export const FONT_OPTIONS = ['Arial', 'Georgia', 'Times New Roman', 'Impact', 'Verdana', 'Courier New'];

export const SPORT_SIZES = {
  mainVolleyball: '30 x 60',
  sideVolleyball: '30 x 60',
  badminton: '20 x 44',
  pickleball: '20 x 44',
};