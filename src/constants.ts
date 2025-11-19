import { dict, TDICOMDictionary } from "./dict";

type CreateTagMap<T extends TDICOMDictionary> = {
  [Group in keyof T]: {
    [Element in keyof T[Group]]: T[Group][Element] extends readonly [
      string,
      infer Name
    ]
      ? { [K in Name & string]: `x${Group & string}${Element & string}` }
      : never;
  }[keyof T[Group]];
}[keyof T];

type MergeUnion<T> = T extends any ? { [K in keyof T]: T[K] } : never;

type DicomTagsType = MergeUnion<CreateTagMap<typeof dict>>;

const DicomTags = Object.entries(dict).reduce((acc, [group, elements]) => {
  Object.entries(elements).forEach(([element, [_, name]]) => {
    acc[name as string] = `x${group}${element}`;
  });
  return acc;
}, {} as Record<string, string>) as DicomTagsType;

export { DicomTags };
