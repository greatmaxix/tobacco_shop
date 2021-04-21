CREATE OR REPLACE FUNCTION insert_audit_on_products_delete()
  RETURNS trigger AS
$func$ 
BEGIN  
	insert into audit (action, payload, actionDate)
	values ('PRODUCT DELETED', (select row_to_json(oldtab) from oldtab), localtimestamp);
   	RETURN NEW;
END
$func$  LANGUAGE plpgsql;

CREATE TRIGGER on_products_delete
AFTER UPDATE on products
REFERENCING NEW TABLE AS oldtab
FOR EACH ROW EXECUTE PROCEDURE insert_audit_on_products_delete();