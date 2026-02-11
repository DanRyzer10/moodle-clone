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
  email: string;
  firstname: string;
  lastname: string;
  picture: string;
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
export interface Config {
  plugin: string
  subtype: string
  name: string
  value: string
}

export interface Warning {
  item: string
  itemid: number
  warningcode: string
  message: string
}
export interface Assignment {
  id: number
  cmid: number
  course: number
  name: string
  nosubmissions: number
  submissiondrafts: number
  sendnotifications: number
  sendlatenotifications: number
  sendstudentnotifications: number
  duedate: number
  allowsubmissionsfromdate: number
  grade: number
  timemodified: number
  completionsubmit: number
  cutoffdate: number
  gradingduedate: number
  teamsubmission: number
  requireallteammemberssubmit: number
  teamsubmissiongroupingid: number
  blindmarking: number
  hidegrader: number
  revealidentities: number
  attemptreopenmethod: string
  maxattempts: number
  markingworkflow: number
  markingallocation: number
  markinganonymous: number
  requiresubmissionstatement: number
  preventsubmissionnotingroup: number
  configs: Config[]
  intro: string
  introformat: number
  introfiles: any[]
  introattachments: any[]
  activity: string
  activityformat: number
  activityattachments: any[]
  timelimit: number
  submissionattachments: number
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


export interface AssignmentResponse {
  courses: AssignmentCourse[]
  warnings: Warning[]
}

export interface AssignmentCourse {
  id: number
  fullname: string
  shortname: string
  timemodified: number
  assignments: Assignment[]
}

export interface AssignmentUI {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  dueDateFormatted: string;
  status: 'pending' | 'in-progress' | 'completed' | 'not-started' | 'overdue';
  priority?: 'high' | 'medium' | 'low';
  progress?: number;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  grade?: number;
  maxGrade?: number;
  submittedDate?: string;
  daysLeft?: string;
  isOverdue?: boolean;
}
export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  timeAgo: string;
  repliesCount: number;
  newReplies?: number;
  isPinned?: boolean;
}