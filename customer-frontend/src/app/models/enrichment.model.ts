export interface EnrichmentRow {
  uprn: number;
  struprn?: string;

  bduk_recognised_premises?: string | boolean;
  country?: string;
  postcode?: string;

  lot_id?: string | number;
  lot_name?: string;

  subsidy_control_status?: string;
  current_gigabit?: string | boolean;
  future_gigabit?: string | boolean;

  local_authority_district_ons_code?: string;
  local_authority_district_ons?: string;

  region_ons_code?: string;
  region_ons?: string;

  bduk_gis?: string | boolean;
  bduk_gis_contract_scope?: string;
  bduk_gis_final_coverage_date?: string;
  bduk_gis_contract_name?: string;
  bduk_gis_supplier?: string;

  bduk_vouchers?: string | boolean;
  bduk_vouchers_contract_name?: string;
  bduk_vouchers_supplier?: string;

  bduk_superfast?: string | boolean;
  bduk_superfast_contract_name?: string;
  bduk_superfast_supplier?: string;

  bduk_hubs?: string | boolean;
  bduk_hubs_contract_name?: string;
  bduk_hubs_supplier?: string;

  latitude?: number;
  longitude?: number;
  geocode_status?: string;
}
