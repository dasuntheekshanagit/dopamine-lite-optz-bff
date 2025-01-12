export interface IAccessGroup {
  accessGroupId: string;
  name: string;
  accessList: string[];
}

export type CreateAccessGroupDTO = IAccessGroup;
export type UpdateAccessGroupDTO = Partial<IAccessGroup>;