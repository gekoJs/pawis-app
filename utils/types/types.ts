export interface StateRedux {
  display: {
    display_loader: boolean;
  };
  dataDogs: {
    filtered_dogs: [];
  };
}

//--------------------------------

export interface type_dog {
  id: string;
  breed: string;
  image: string;
  height_min: number;
  height_max: number;
  weight_min: number;
  weight_max: number;
  lifeTime_min: number;
  lifeTime_max: number;
  createdInDB: true;
  Temperaments: string[];
  UserId?: string;
}
export interface type_user {
  user?: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
  created?: type_dog[];
  liked?: type_dog[];
}

//--------------------------------

export interface type_DogsData_rq {
  data: Data;
  status: number;
  statusText: string;
}
export interface Data {
  length: number;
  data?: DataEntity[] | null;
}
export interface DataEntity {
  id: string | number;
  breed: string;
  image: string;
  height_min: number;
  height_max?: number | null;
  weight_min?: number | null;
  weight_max?: number | null;
  lifeTime_min: number;
  lifeTime_max?: number | null;
  createdInDB: boolean;
  UserId?: string | null;
  Temperaments?: string[] | null;
}

//--------------------------------
export interface type_formComponentInput {
  breed: string;
  height_min: string;
  height_max: string;
  weight_min: string;
  weight_max: string;
  lifeTime_min: string;
  lifeTime_max: string;
  image: string;
  temperament: string[];
  // Breed: string;
  // Height_min: string;
  // Height_max: string;
  // Weight_min: string;
  // Weight_max: string;
  // LifeTime_min: string;
  // LifeTime_max: string;
  // Image: string;
  // Temperaments: string[];
}

export interface type_formComponentInputError {
  breed?: string;
  height_min?: string;
  height_max?: string;
  weight_min?: string;
  weight_max?: string;
  lifeTime_min?: string;
  lifeTime_max?: string;
  image?: string;
  temperament?: string;
}