export interface Department {
  id: string;
  name: string;
  desc?: string;
  order: number;
}

export interface Category {
  id: string;
  deptId: string;
  name: string;
  order: number;
}

export interface Subcategory {
  id: string;
  catId: string;
  name: string;
  order: number;
}

export interface ChartConfig {
  id: string;
  name: string;
  col: string;
  kpi?: boolean;
}

export interface Metric {
  id: string;
  subId: string;
  name: string;
  order: number;
  kpi: boolean;
  sheetName: string;
  charts: ChartConfig[];
}

export interface BrandConfig {
  name: string;
  accentIdx: number;
  logoData: string;
}

export interface LeadershipNoteItem {
  text: string;
  author: string;
}

export interface LeadershipNoteSection {
  id: string;
  title: string;
  notes: (string | LeadershipNoteItem)[];
}

export interface AppConfig {
  pin: string;
  currentWeek: number;
  _weekOverride?: boolean;
  isLockedLayout?: boolean;
  brand: BrandConfig;
  departments: Department[];
  categories: Category[];
  subcategories: Subcategory[];
  metrics: Metric[];
  leadershipNotes: Record<string, LeadershipNoteSection[]>;
}

export interface AuthUser {
  email: string;
  role: string;
}

export interface LoginActivityLog {
  id: string;
  email: string;
  loginDate: string;
  loginTime: string;
  timestamp: number;
  lastActiveTime: number;
  deviceInfo: string;
}

export interface UploadedDataState {
  [deptId: string]: Record<string, any>;
}

export interface NoteDetail {
  text: string;
  author: string;
}

export interface SubNotes {
  [subId: string]: {
    inf?: (string | NoteDetail)[];
    ini?: (string | NoteDetail)[];
  };
}

export interface UploadedFileInfo {
  id: number;
  dept_key: string;
  file_name: string;
  azure_url: string;
  uploaded_at: string;
  uploader_email: string | null;
}
