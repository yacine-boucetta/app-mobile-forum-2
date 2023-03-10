
export interface EventInterface {
    id?: number;
    name?:string;
    start_date?:Date;
    end_date?: Date;
    userId?:number;
    description?:string;
    url_event:string;
    isPrivate?:boolean;
  }