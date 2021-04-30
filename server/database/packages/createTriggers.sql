CREATE OR REPLACE PACKAGE BODY CREATETRIGGERSPACKAGE
AS
	PROCEDURE createtriggers() IS 
	BEGIN 
        CREATE OR REPLACE TRIGGER product_types_trig
		     BEFORE INSERT ON "product_types"
		        FOR EACH ROW
			        BEGIN
      			        SELECT product_types_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER product_warehouse_trig
		     BEFORE INSERT ON "product_warehouse"
		        FOR EACH ROW
			        BEGIN
      			        SELECT product_warehouse_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER product_invoice_trig
		     BEFORE INSERT ON "product_invoice"
		        FOR EACH ROW
			        BEGIN
      			        SELECT product_invoice_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER warehouses_trig
		     BEFORE INSERT ON "warehouses"
		        FOR EACH ROW
			        BEGIN
      			        SELECT warehouses_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER products_trig
		     BEFORE INSERT ON "products"
		        FOR EACH ROW
			        BEGIN
      			        SELECT products_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER audit_trig
		     BEFORE INSERT ON "audit"
		        FOR EACH ROW
			        BEGIN
      			        SELECT audit_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER images_trig
		     BEFORE INSERT ON "images"
		        FOR EACH ROW
			        BEGIN
      			        SELECT images_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER shops_trig
		     BEFORE INSERT ON "shops"
		        FOR EACH ROW
			        BEGIN
      			        SELECT shops_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER product_brands_trig
		     BEFORE INSERT ON "product_brands"
		        FOR EACH ROW
			        BEGIN
      			        SELECT product_brands_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER staff_mobiles_trig
		     BEFORE INSERT ON "staff_mobiles"
		        FOR EACH ROW
			        BEGIN
      			        SELECT staff_mobiles_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER roles_trig
		     BEFORE INSERT ON "roles"
		        FOR EACH ROW
			        BEGIN
      			        SELECT roles_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER invoices_trig
		     BEFORE INSERT ON "invoices"
		        FOR EACH ROW
			        BEGIN
      			        SELECT invoices_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /

        CREATE OR REPLACE TRIGGER staff_trig
		     BEFORE INSERT ON "staff"
		        FOR EACH ROW
			        BEGIN
      			        SELECT staff_aid.nextval
				        INTO :new.id
			        FROM dual; 
			    END
                ;
        /
			 
			 
   	END createtriggers;
END CREATETRIGGERSPACKAGE;
