export interface Course {
  id: string;          
  title: string;       
  description: string; 
  
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string; 
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string; 
}


export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string; 
}


export interface CreateUserRequest {
  data: {
    email: string;
    password: string;
    name: string;
    role: string;
    username: string;
    firstname: string;
    lastname: string;
  }
}


export interface User extends UserProfile {
  firstname?: string;
  lastname?: string;
  token?: string;
}