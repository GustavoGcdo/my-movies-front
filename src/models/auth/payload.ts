import { Profile } from '../profile/profile';

export interface Payload {
  _id: string;
  email: string;
  profiles: Profile[];
}
