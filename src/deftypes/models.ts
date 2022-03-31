export interface Todo {
    id: number;
    content: string;
  }
  
  export interface Meta {
    totalCount: number;
  }
  
  export type St = string

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

  export interface heroesObj{
      id: number;
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      origin: {
          name: string;
          url: string;
      },
      location: {
          name: string;
          url: string;
      },
      image: string;
      episode: string[];
      url: string;
      created:  string;
  }
  export interface columnsts {
      name: string;
      label: string;
      field: string;
      align: string;
  }