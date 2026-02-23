
-- Catalog table
create table if not exists service_plans (
  id                   bigserial primary key,
  code                 varchar(32)  not null unique,
  tier                 varchar(32)  not null,
  name                 varchar(128) not null,
  description          text         not null,
  download_mbps        integer,
  upload_mbps          integer,
  marketing_speed_lbl  varchar(64),
  unlimited_data       boolean      not null default true,
  price_amount         numeric(10,2) not null,
  price_currency       char(3)      not null default 'GBP',
  promo_badge          varchar(64),
  image_url            varchar(512),
  sort_order           integer      not null default 0,
  active               boolean      not null default true,
  created_at           timestamptz  not null default now(),
  updated_at           timestamptz  not null default now()
);
create index if not exists ix_service_plans_active_order
  on service_plans(active desc, sort_order asc);
