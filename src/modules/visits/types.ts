import { Visit } from '../../types/graphql';

export type VisitSummary = Pick<Visit, 'id' | 'dateCreated'>;
