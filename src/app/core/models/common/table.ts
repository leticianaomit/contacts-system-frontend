export interface TableColumn<T> {
  label?: string;
  property: keyof T;
  type: 'text' | 'actions' | 'custom';
  visible?: boolean;
  cssClasses?: string[];
}
