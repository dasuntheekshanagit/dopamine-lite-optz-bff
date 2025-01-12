export interface IClass {
  classId: number;
  name: string;
}

export type ClassAttributes = IClass;
export type ClassCreationAttributes = Omit<IClass, 'classId' | 'createdAt' | 'updatedAt'>;

export type CreateClassDTO = ClassCreationAttributes;
export type UpdateClassDTO = Partial<IClass>;