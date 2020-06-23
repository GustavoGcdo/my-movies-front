import { Movie } from './movie';
import { Profile } from '../profile/profile';

export interface MyMovie {
    _id: string;
    info: Movie;
    watched: boolean;
    profile: Profile;
}