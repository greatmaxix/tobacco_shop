CREATE OR REPLACE FUNCTION public.search_product_brands(p_search_string character varying)
	RETURNS SETOF numeric 
	LANGUAGE plpgsql
	STABLE
AS $function$
DECLARE
    rec_brand record;
   	v_search_string varchar := pg_catalog.concat('%', p_search_string,'%');
   	cur_product_brands cursor(search_string varchar) for
		select * 
		from product_brands pb
		where pb.brand_name like search_string
		or pb.brand_description like search_string
	;
begin
	open cur_product_brands(v_search_string);
	loop
      fetch cur_product_brands into rec_brand;
      exit when not found;

      return NEXT rec_brand.id;
   end loop;
  
   close cur_product_brands;
END;
$function$
;
