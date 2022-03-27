export interface Todo {
    id: number;
    content: string;
  }
  
  export interface Meta {
    totalCount: number;
  }
  
  export type St = string | null

  export interface BasicType {
    id:number;
    img:string;
    name:string;
  }
  
  export interface Rangeob {
    min:number;
    max:number;

  }

  export interface RaMcolumns {
    name: string;
    label: string;
    field: string;
    sortable: boolean;
    align: string;
  }