import React from 'react';
import { RicosContentQueryService } from './ContentQueryService';
import type { ContentQueryService } from './types';

const contentQueryService = new RicosContentQueryService();
export const ContentQueryContext = React.createContext<ContentQueryService>(contentQueryService);
