export type treeNode = {
  name: string;
  value?: any;
  children?: treeNode[];
};
export type aboutMeModuleState = {
  data: {
    technologyStack: treeNode;
  };
};
