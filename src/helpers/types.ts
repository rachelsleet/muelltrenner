export const bins = [
  'household',
  'food',
  'recycling',
  'paper',
  'glass'
] as const;

export type Bin = (typeof bins)[number];

export type Item = {
  item_eng: string;
  item_de: string;
  bin_eng: Bin;
  bin_de: string;
};
