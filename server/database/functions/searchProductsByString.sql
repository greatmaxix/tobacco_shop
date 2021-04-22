CREATE OR REPLACE FUNCTION public.search_products(p_search_string character varying)
 RETURNS SETOF numeric 
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    rec record;
   	v_search_string varchar := pg_catalog.concat('%', p_search_string,'%');
BEGIN   
   FOR rec IN
      SELECT ps.id, ps.title as product_title, ps.description as product_description, 
      pb.brand_name as brand_name, pb.brand_description as brand_description, 
      pt."type" as product_type
      FROM products ps
      join product_brands pb on (ps."productBrandId" = pb.id)
      join product_types pt on (ps."productTypeId" = pt.id)
   LOOP
      IF rec.product_title LIKE v_search_string 
      	or rec.product_description LIKE v_search_string
      	or rec.brand_name LIKE v_search_string
      	or rec.brand_description LIKE v_search_string
      	or rec.product_type LIKE v_search_string
      THEN
          RETURN NEXT rec.id;
      END IF;
   END LOOP;
END
$function$
;