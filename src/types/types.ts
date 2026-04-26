import type { Option } from "../gql/generated";

export type TCreateOption = Pick<Option, "label" | "position" | "withArgs"> & 
  Partial<Pick<Option, "id">>;