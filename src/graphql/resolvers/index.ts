import merge from 'lodash/merge';
import { Resolvers } from '../_generated';
import { userResolvers } from './user';

export const resolvers: Resolvers = merge({}, userResolvers);
