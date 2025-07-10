export interface Teacher {
  id?: number; // edit uchun kerak
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  branchId: number[];
}
