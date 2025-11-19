import { dict } from "./dict";

type ExtractNames<T> = {
  [OuterK in keyof T]: {
    [InnerK in keyof T[OuterK]]: T[OuterK][InnerK] extends readonly [
      string,
      infer Name
    ]
      ? Name
      : never;
  }[keyof T[OuterK]];
}[keyof T];

type AllElementNames = ExtractNames<typeof dict>;

type DICOMElementMap = {
  [K in AllElementNames]?: any;
};

export type { DICOMElementMap };
