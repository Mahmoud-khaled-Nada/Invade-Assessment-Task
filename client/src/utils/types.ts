export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  avatar: File | null;
};

export type TaskParams = {
  task: string;
};

export type Task = {
  id: string;
  task: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};
