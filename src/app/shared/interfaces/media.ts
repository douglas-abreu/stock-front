export interface Permission {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  permission: Permission
}

export interface Product {
  id: number;
  name: string;
  barCode: string;
  description: string;
  quantity: number;
  category: Category;
}

export interface Category{
  id: number;
  name: string;
}

export interface Pagination {
  page: number,
  size: number,
  offset: number,
  numberOfElements: number,
  numberOfPages: number,
  totalNumberOfElements: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
}

