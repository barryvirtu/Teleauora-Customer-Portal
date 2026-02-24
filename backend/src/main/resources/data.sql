
insert into service_plans
(code, tier, name, description, download_mbps, upload_mbps, marketing_speed_lbl,
 unlimited_data, price_amount, price_currency, promo_badge, image_url, sort_order)
values
('STARTER_CONNECT', 'Basic', 'Starter Connect',
 'Great for HD streaming, smart homes and remote learning',
 150, null, '150 Mbps', true, 29.99, 'GBP', null, null, 10),
('EVERYDAY_STREAMING', 'Standard', 'Everyday Streaming',
 'Ideal for families, 4K streaming, and light gaming',
 300, null, '300 Mbps', true, 34.99, 'GBP', null, null, 20),
('FAMILY_MAX', 'Premium', 'Family Max',
 'Supports multiple users and devices, gaming, and work from home requirements',
 500, null, '500 Mbps', true, 39.99, 'GBP', null, null, 30),
('HOME_GIG', 'Platinum', 'Home Gig',
 'Ultra-fast for heavy users, smart homes, and content creators',
 1000, null, '1 Gbps', true, 44.99, 'GBP', null, null, 40),
('INFINITY_HOME', 'Intro', 'Infinity Home',
 'No throttling, priority routing, free wi-fi extender, no contract',
 null, null, 'Unlimited Speed', true, 59.99, 'GBP', 'Introductory offer*', null, 50)
ON CONFLICT (code) DO NOTHING;
