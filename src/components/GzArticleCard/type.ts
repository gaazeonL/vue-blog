export type articleCardConfig = {
  key: string;
  title: string;
  description: string;
  cover?: string;
  time: string;
  onClick: (...arg: any[]) => any;
  onDelete?: (uuid: string) => any;
  onEdit?: (...arg: any[]) => any;
};
