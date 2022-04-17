export interface TstoreDetails {
  name: string;
  businessAddressFormatted: string;
  businessEmail: string;
  businessPhone: string;
  store: TStore;
  domain: string;
  jsonWebEncryption: string;
  captchaType: null;
  themeJson: string;
  logoPath: null;
  favoriteIconPath: null;
  coverDesktopImagePath: null;
  coverMobileImagePath: null;
  genericProductsDefaultImagePath: null;
  mainCategoryMobileLogoPath: null;
  facebookLink: string;
  descriptionForCustomers: string;
  promotionalText: string;
  externalWebTrackingAccounts: string;
  banners: any[];
  contentPages: TContentPage[];
  metadataJson: string;
  settingsJson: string;
  updateDate: number;
}

export interface TContentPage {
  name: string;
  type: string;
  published: boolean;
  id: string;
}

export interface TStore {
  id: number;
  name: string;
  businessEmail: string;
  businessNumber: string;
  businessPhone: string;
  businessFullAddressWithCity: string;
  addressCoordinates: string;
  worksWithStoreCoupons: boolean;
  performSellingUnitsEstimationLearning: boolean;
}

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
  comment?: Comment;
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
