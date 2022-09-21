export interface ROOTREPO {
  pages: REPOPAGE[];
  pageParams: any[];
}

export interface REPOPAGE {
  user: User;
}

export interface User {
  login: string;
  repositories: Repositories;
}

export interface Repositories {
  edges: REPOEDGE[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface REPOEDGE {
  node: REPONODE;
  cursor: string;
}

export interface REPONODE {
  id: string;
  name: string;
  description?: string;
  pushedAt: string;
  diskUsage: number;
  url: string;
  visibility: string;
  forkCount: number;
  languages: Languages;
  refs: Refs;
  stargazers: { totalCount: number};
}

export interface Refs {
  edges: RefsEdge[];
}

export interface RefsEdge {
  node: RefsNode;
}

export interface RefsNode {
  name: string;
  id: string;
  target: Target;
}

export interface Target {
  history: History;
}

export interface History {
  edges: HistoryEdge[];
}

export interface HistoryEdge {
  node: HistoryNode;
}

export interface HistoryNode {
  committedDate: string;
  author: Author;
  message: string;
}

export interface Author {
  name: string;
}

export interface Languages {
  edges: LANGUAGEEDGE[];
}

export interface LANGUAGEEDGE {
  node: LANGUAGENODE;
}

export interface LANGUAGENODE {
  id: string;
  color: string;
  name: string;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
