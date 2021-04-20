-- public.images definition

-- Drop table

-- DROP TABLE public.images;

CREATE TABLE public.images (
	id SERIAL NOT NULL,
	imageable_type varchar(255) NOT NULL,
	imageable_id int4 NOT NULL,
	alt_text varchar(255) NOT NULL,
	image_blob bytea NOT NULL,
	CONSTRAINT images_pkey PRIMARY KEY (id)
);


-- public.product_brands definition

-- Drop table

-- DROP TABLE public.product_brands;

CREATE TABLE public.product_brands (
	id SERIAL NOT null,
	brand_name varchar(255) NOT NULL,
	brand_description varchar(255) NOT NULL,
	CONSTRAINT brand_name_unique UNIQUE (brand_name),
	CONSTRAINT product_brands_pkey PRIMARY KEY (id)
);


-- public.product_types definition

-- Drop table

-- DROP TABLE public.product_types;

CREATE TABLE public.product_types (
	id SERIAL NOT NULL,
	"type" varchar(255) NOT NULL,
	CONSTRAINT product_types_pkey PRIMARY KEY (id)
);


-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id SERIAL NOT NULL,
	role_title varchar(255) NOT NULL,
	role_description varchar(255) NOT NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);


-- public.shops definition

-- Drop table

-- DROP TABLE public.shops;

CREATE TABLE public.shops (
	id SERIAL NOT NULL,
	"name" varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	CONSTRAINT shops_pkey PRIMARY KEY (id)
);


-- public.staff definition

-- Drop table

-- DROP TABLE public.staff;

CREATE TABLE public.staff (
	id SERIAL NOT NULL,
	staff_first_name varchar(255) NOT NULL,
	staff_last_name varchar(255) NOT NULL,
	started_work_at timestamp(0) NOT NULL,
	stopped_work_at timestamp(0) NULL,
	staff_password varchar(255) NULL,
	CONSTRAINT staff_pkey PRIMARY KEY (id)
);


-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	id SERIAL NOT NULL,
	title varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	created_at timestamp(0) NULL DEFAULT now(),
	productscol varchar(45) NULL,
	"cost" varchar(255) NOT NULL,
	product_types_id int4 NOT NULL,
	product_brands_id int4 NOT NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id),
	CONSTRAINT fk_products_product_brands1 FOREIGN KEY (product_brands_id) REFERENCES product_brands(id),
	CONSTRAINT fk_products_product_types1 FOREIGN KEY (product_types_id) REFERENCES product_types(id)
);


-- public.staff_mobiles definition

-- Drop table

-- DROP TABLE public.staff_mobiles;

CREATE TABLE public.staff_mobiles (
	id SERIAL NOT NULL,
	mobile varchar(45) NOT NULL,
	staff_id int4 NOT NULL,
	CONSTRAINT staff_mobiles_pkey PRIMARY KEY (id),
	CONSTRAINT fk_staff_mobiles_staff1 FOREIGN KEY (staff_id) REFERENCES staff(id)
);


-- public.staff_roles definition

-- Drop table

-- DROP TABLE public.staff_roles;

CREATE TABLE public.staff_roles (
	staff_id int4 NOT NULL,
	roles_id int4 NOT NULL,
	CONSTRAINT staff_roles_pkey PRIMARY KEY (staff_id, roles_id),
	CONSTRAINT fk_staff_has_staff_roles_staff1 FOREIGN KEY (staff_id) REFERENCES staff(id),
	CONSTRAINT fk_staff_has_staff_roles_staff_roles1 FOREIGN KEY (roles_id) REFERENCES roles(id)
);


-- public.staff_shops definition

-- Drop table

-- DROP TABLE public.staff_shops;

CREATE TABLE public.staff_shops (
	staff_id int4 NOT NULL,
	shops_id int4 NOT NULL,
	CONSTRAINT staff_shops_pkey PRIMARY KEY (staff_id, shops_id),
	CONSTRAINT fk_staff_has_shops_shops1 FOREIGN KEY (shops_id) REFERENCES shops(id),
	CONSTRAINT fk_staff_has_shops_staff1 FOREIGN KEY (staff_id) REFERENCES staff(id)
);


-- public.warehouses definition

-- Drop table

-- DROP TABLE public.warehouses;

CREATE TABLE public.warehouses (
	id SERIAL NOT NULL,
	shop_id int4 NOT NULL,
	CONSTRAINT warehouses_pkey PRIMARY KEY (id),
	CONSTRAINT fk_warehouse_shop FOREIGN KEY (shop_id) REFERENCES shops(id)
);


-- public.invoices definition

-- Drop table

-- DROP TABLE public.invoices;

CREATE TABLE public.invoices (
	id  SERIAL NOT NULL,
	created_at timestamp(0) NULL,
	-- products_id int4 NOT NULL,
	staff_id int4 NOT NULL,
	shops_id int4 NOT NULL,
	CONSTRAINT invoices_pkey PRIMARY KEY (id),
	-- CONSTRAINT fk_invoices_products1 FOREIGN KEY (products_id) REFERENCES products(id),
	CONSTRAINT fk_invoices_shops1 FOREIGN KEY (shops_id) REFERENCES shops(id),
	CONSTRAINT fk_invoices_staff1 FOREIGN KEY (staff_id) REFERENCES staff(id)
);


-- public.product_warehouse definition

-- Drop table

-- DROP TABLE public.product_warehouse;

CREATE TABLE public.product_warehouse (
	products_id int4 NOT NULL,
	warehouse_id int4 NOT NULL,
	quantity int4 NULL,
	CONSTRAINT product_warehouse_pkey PRIMARY KEY (products_id, warehouse_id),
	CONSTRAINT fk_products_has_warehouse_products1 FOREIGN KEY (products_id) REFERENCES products(id),
	CONSTRAINT fk_products_has_warehouse_warehouse1 FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE public.invoice_products (
	invoice_id int8 NOT NULL,
	product_id int8 NOT NULL,
	CONSTRAINT invoice_products_fk FOREIGN KEY (invoice_id) REFERENCES public.invoices(id),
	CONSTRAINT invoice_products_fk_1 FOREIGN KEY (product_id) REFERENCES public.products(id)
);
