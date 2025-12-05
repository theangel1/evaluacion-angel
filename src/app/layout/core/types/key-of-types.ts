export type KeyOfType<T> = keyof T extends infer U ? U : never;
