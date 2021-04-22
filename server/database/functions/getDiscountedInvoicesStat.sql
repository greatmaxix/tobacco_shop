CREATE OR REPLACE FUNCTION public.get_discounted_invoices()
 RETURNS SETOF get_discounted_invoices_type
 LANGUAGE plpgsql
AS $function$

declare
   	cur_invoice cursor for
		select *
		from invoices ic
	;
	rec_invoices record;
	row_actual_cost numeric;
	row_difference numeric;
	returnrec get_discounted_invoices_type;
begin
	
    drop TABLE tmp_invoices;
	create TEMPORARY TABLE tmp_invoices (
        invoice_id int,
		curent_total_cost numeric,
		actual_cost numeric,
		difference numeric
    );
	
	open cur_invoice;
	loop
      fetch cur_invoice into rec_invoices;
      exit when not found;
	  select into row_actual_cost sum(p.cost) from products p where p.id in (select pi2."productsId" from product_invoice pi2 where pi2."invoicesId" = rec_invoices.id);
	  row_difference := row_actual_cost - rec_invoices.total_cost ;
      insert into tmp_invoices values (rec_invoices.id, rec_invoices.total_cost, row_actual_cost, row_difference);
     
   end loop;
  
   close cur_invoice;
  
   FOR returnrec IN SELECT * FROM tmp_invoices LOOP
       RETURN NEXT returnrec;
   END LOOP;
END;
$function$
;