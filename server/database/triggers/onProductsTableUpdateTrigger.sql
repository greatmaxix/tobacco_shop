CREATE OR REPLACE FUNCTION update_product_stamps_on_update()
  RETURNS trigger AS
$func$ 
BEGIN  
   update products set updated_at = localtimestamp
   where products.id in (select id from newtab);
   RETURN NEW;
END
$func$  LANGUAGE plpgsql;

CREATE TRIGGER on_after_product_update
AFTER UPDATE on products
REFERENCING NEW TABLE AS newtab
FOR EACH ROW EXECUTE PROCEDURE update_product_stamps_on_update();