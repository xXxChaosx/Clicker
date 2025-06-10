export const CASE_COST = 100;
export const WHEEL_COST = 200;

export const calculatePrestigeGain = (credits) => {
  return Math.floor(credits / 1000);
};
