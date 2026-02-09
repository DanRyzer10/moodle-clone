export interface Course {
   id: number;
    shortname: string;
    fullname: string;
    displayname: string;
    enrolledusercount: number;
    idnumber: string;
    visible: number;
    summary: string;
    summaryformat: number;
    format: string;
    courseimage: string;
    showgrades: boolean;
    lang: string;
    enablecompletion: boolean;
    completionhascriteria: boolean;
    completionusertracked: boolean;
    category: number;
    progress: number;
    completed: boolean;
    startdate: number;
    enddate: number;
    marker: number;
    lastaccess: number;
    isfavourite: boolean;
    hidden: boolean;
    overviewfiles: any[];
    showactivitydates: boolean;
    showcompletionconditions: boolean;
    timemodified: number;
  
}


export interface UserInfo {
  // email : 'mail@mail.com',
  //  firstname : 'John',
  //   lastname : 'Doe',
  //   picture : 'https://randomuser.me/api/portraits/men/1.jpg'
  email: string;
  firstname: string;
  lastname: string;
  picture: string;
}
export interface Assignment {
  id: string;
  title: string;
  dueDate: string; 
}
export interface SettingItem {
  id: string;
  title: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  hasArrow?: boolean;
  hasToggle?: boolean;
  onPress?: () => void;
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