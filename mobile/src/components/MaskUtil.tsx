import { mask, unMask } from "remask";

export const masking = (text: string, maskData: string): string =>{
  return mask(text, [maskData])
}

export const unmasking = (text: string): string =>{
  return unMask(text)
}

