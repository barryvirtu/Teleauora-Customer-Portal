import * as L from 'leaflet';

// ---------------------------------------------
// Define the source data types
// ---------------------------------------------
export type MapDataSource = Asset | Uprn | UprnMasterRaw;

// Raw rows coming from uprn_master read endpoints
// (Matches your UprnMasterRow shape used on the frontend)
export interface UprnMasterRaw {
  uprn: number;
  address?: string | null;
  latitude: number | null;
  longitude: number | null;
  source?: string | null;
}

export interface Asset {
  uprn: string | number;
  latitude: number | string;
  longitude: number | string;
  singleLineAddress?: string;
  postcode?: string;

  xCoordinate?: number | string;
  yCoordinate?: number | string;
  areaM2?: number | string;
  maxBbPredictedDown?: number | string;
  maxBbPredictedUp?: number | string;
  maxSfbbPredictedDown?: number | string;
  maxSfbbPredictedUp?: number | string;
  maxUfbbPredictedDown?: number | string;
  maxUfbbPredictedUp?: number | string;
  maxPredictedDown?: number | string;
  maxPredictedUp?: number | string;
  isMain?: boolean | string;
}

export interface Uprn {
  uprn: string | number;
  singleLineAddress: string;   // required for this variant
  latitude: string | number;
  longitude: string | number;
  postcode?: string;
}

// ---------------------------------------------
// Unified map point object for ALL markers
// ---------------------------------------------
export interface UnifiedMapPoint {
  uprn: number;
  address: string;
  latitude: number;
  longitude: number;
  type: 'asset' | 'uprn';      // keep using 'uprn' for master points
  RawNode: MapDataSource;      // now can be Asset | Uprn | UprnMasterRaw
}

// The custom marker type used by the entire app
export interface AssetMarker extends L.Marker {
  unifiedMarker: UnifiedMapPoint;
}

// (unchanged) enrichment type
export interface EnrichmentRow {
  UPRN: number;
  STRUPRN: string;

  BDUK_RECOGNISED_PREMISES: boolean | string;
  COUNTRY: string;
  POSTCODE: string;

  LOT_ID: string | number;
  LOT_NAME: string;

  SUBSIDY_CONTROL_STATUS: string;
  CURRENT_GIGABIT: boolean | string;
  FUTURE_GIGABIT: boolean | string;

  LOCAL_AUTHORITY_DISTRICT_ONS_CODE: string;
  LOCAL_AUTHORITY_DISTRICT_ONS: string;
  REGION_ONS_CODE: string;
  REGION_ONS: string;

  BDUK_GIS: boolean | string;
  BDUK_GIS_CONTRACT_SCOPE: string;
  BDUK_GIS_FINAL_COVERAGE_DATE: string;
  BDUK_GIS_CONTRACT_NAME: string;
  BDUK_GIS_SUPPLIER: string;

  BDUK_VOUCHERS: boolean | string;
  BDUK_VOUCHERS_CONTRACT_NAME: string;
  BDUK_VOUCHERS_SUPPLIER: string;

  BDUK_SUPERFAST: boolean | string;
  BDUK_SUPERFAST_CONTRACT_NAME: string;
  BDUK_SUPERFAST_SUPPLIER: string;

  BDUK_HUBS: boolean | string;
  BDUK_HUBS_CONTRACT_NAME: string;
  BDUK_HUBS_SUPPLIER: string;

  Latitude: number;
  Longitude: number;
  Geocode_Status: string;
}
