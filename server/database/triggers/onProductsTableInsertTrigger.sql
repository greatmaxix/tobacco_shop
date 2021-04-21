CREATE OR REPLACE FUNCTION update_product_stamps()
  RETURNS trigger AS
$func$ 
BEGIN  
   update products set created_at = localtimestamp, updated_at = localtimestamp
   where products.id in (select id from newtab);
   RETURN NEW;
END
$func$  LANGUAGE plpgsql;

CREATE TRIGGER on_after_product_insert
AFTER INSERT on products
REFERENCING NEW TABLE AS newtab
FOR EACH ROW EXECUTE PROCEDURE update_product_stamps();