import { Assignment,AssignmentUI } from "../types";

export const getAssignmentStatus = (
    assignment: Assignment
): AssignmentUI['status'] => {
    const now = Date.now() / 1000;
    const dueDate = assignment.duedate;

    if (dueDate === 0) return 'not-started'
    if (now > dueDate) return 'overdue';

    return 'pending'
}

export const getAssignmentPriority = (
  assignment: Assignment
): AssignmentUI['priority'] | undefined => {
  const now = Date.now() / 1000;
  const dueDate = assignment.duedate;
  
  if (dueDate === 0) return undefined;
  
  const daysUntilDue = (dueDate - now) / (24 * 60 * 60);
  
  if (daysUntilDue < 3) return 'high';
  if (daysUntilDue < 7) return 'medium';
  return 'low';
};
export const getDaysLeft = (dueDate: number): string => {
  if (dueDate === 0) return 'Sin fecha de entrega';
  
  const now = Date.now() / 1000;
  const diff = dueDate - now;
  const days = Math.floor(diff / (24 * 60 * 60));
  
  if (days < 0) return 'Atrasado';
  if (days === 0) return 'Entrega hoy';
  if (days === 1) return '1 día restante';
  return `${days} días restantes`;
};

export const formatDate = (timestamp: number): string => {
  if (timestamp === 0) return 'Sin fecha de entrega';
  
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('es-ES', { 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getAssignmentIcon = (status: AssignmentUI['status']): string => {
  switch (status) {
    case 'completed':
      return 'check-circle';
    case 'in-progress':
      return 'pending';
    case 'overdue':
      return 'warning';
    default:
      return 'assignment';
  }
};

export const getAssignmentIconColors = (
  status: AssignmentUI['status']
): { bgColor: string; color: string } => {
  switch (status) {
    case 'completed':
      return {
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
        color: '#10b981',
      };
    case 'in-progress':
      return {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        color: '#3b82f6',
      };
    case 'overdue':
      return {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        color: '#ef4444',
      };
    default:
      return {
        bgColor: 'bg-primary/10 dark:bg-primary/20',
        color: '#135bec',
      };
  }
};

export const transformAssignment = (assignment: Assignment): AssignmentUI => {
  const status = getAssignmentStatus(assignment);
  const priority = getAssignmentPriority(assignment);
  const { bgColor, color } = getAssignmentIconColors(status);
  
  return {
    id: assignment.id,
    title: assignment.name,
    description: stripHtmlTags(assignment.intro),
    dueDate: new Date(assignment.duedate * 1000),
    dueDateFormatted: formatDate(assignment.duedate),
    status,
    priority,
    icon: getAssignmentIcon(status),
    iconBgColor: bgColor,
    iconColor: color,
    grade: assignment.grade,
    maxGrade: assignment.grade,
    daysLeft: getDaysLeft(assignment.duedate),
    isOverdue: status === 'overdue',
  };
};

const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};