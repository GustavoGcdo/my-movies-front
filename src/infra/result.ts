import { Report } from './report';

export interface Result {
  data: any;
  errors: Report[];
  success: boolean;
  message: string;
}
