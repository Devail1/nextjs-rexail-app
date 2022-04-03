export interface TCategory {
  id: number;
  name: string;
  children?: TProduct[];
  $$hashKey?: string;
}

export interface TProduct {
  id: number;
  name: string;
  fullName: string;
  imageUrl: string;
  price: number;
  promoted: boolean;
  quantity?: number;
  originalPrice: number | null;
  productQuality: ProductQuality;
  currentRelevancy: CurrentRelevancy | null;
  primaryQuantityUnit: Unit;
  productSellingUnits: Unit[];
  commentType: CommentType | null;
  $$hashKey?: string;
}

export interface CommentType {
  name: string;
  comments: Comment[];
  id: string;
}

export interface Comment {
  name: string;
  id: string;
}

export interface CurrentRelevancy {
  name: string;
  resolvedName: string;
}

export interface Unit {
  id: number;
  sellingUnit: SellingUnit;
  maxAmount: number;
  estimatedUnitWeight: number | null;
  $$hashKey?: string;
}

export interface SellingUnit {
  id: number;
  name: string;
  sortOrder: number;
  amountJumps: number;
}

export interface ProductQuality {
  id: number;
  name: string;
  displayQuality: boolean;
  imagePath: string;
}
