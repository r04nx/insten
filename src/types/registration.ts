export interface BusinessInfo {
  shopName: string;
  category: string;
  gstin?: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
}

export interface PersonalInfo {
  ownerName: string;
  mobile: string;
  email: string;
  profilePicture?: string;
  termsAccepted: boolean;
}

export interface BusinessHours {
  operatingDays: string[];
  openingTime: string;
  closingTime: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface ShopVerification {
  licenseDocument?: string;
  shopPhoto?: string;
  identityProof?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface ValidationErrors {
  [key: string]: string;
}