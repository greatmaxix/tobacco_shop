CREATE OR REPLACE FUNCTION public.dynamic_product_search (p_title text, p_desc text, pb_name text, pb_desc text, pt_type text)
	RETURNS products
	LANGUAGE plpgsql
AS $function$
declare 
stmt TEXT;
result record;
begin
	p_title := pg_catalog.concat('%', p_title,'%');
	p_desc := pg_catalog.concat('%', p_desc,'%');
	stmt := format('SELECT p.id, p.title, p.description, p.cost, p.created_at, p.updated_at, p."productBrandId", p."productTypeId" FROM
	products p');
	if pb_name <> '' or pb_desc <> '' then
		stmt := format(pg_catalog.concat(stmt, ' LEFT JOIN product_brands pb on pb.id = p."productBrandId"'));
	end if;

	if pt_type <> '' then
		stmt := format(pg_catalog.concat(stmt, ' LEFT JOIN product_types pt on pt.id = p."productTypeId"'));
	end if;
	
	stmt := pg_catalog.concat(stmt, format(' WHERE p.title like %L or p.description like %L', p_title ,p_desc));

	if pb_name <> '' then
		stmt := pg_catalog.concat(stmt, format(' OR pb.brand_name like %L', pb_name));
	end if;

	if pb_desc <> '' then
		stmt := pg_catalog.concat(stmt, format(' OR pb.brand_description like %L', pb_desc));
	end if;

	
	if pt_type <> '' then
		stmt := pg_catalog.concat(stmt, format('OR pt.type like %L', pt_type));
	end if;

	raise notice 'result: % ', stmt;

	EXECUTE stmt INTO result;

	RETURN result;
END;
$function$
;