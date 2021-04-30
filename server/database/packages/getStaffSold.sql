ALTER SESSION SET CURRENT_SCHEMA=HR;
CREATE OR REPLACE PACKAGE HR.GETSTAFFPAYMENTS
AS
   PROCEDURE getstaffearned(s_id int); 
END GETSTAFFPAYMENTS;
CREATE OR REPLACE PACKAGE BODY HR.GETSTAFFPAYMENTS
AS
	PROCEDURE getstaffearned(s_id int) IS 
   	i_cost int;
    stafffullname varchar(511);
	BEGIN 
      SELECT sum(i."total_cost" ) INTO i_cost 
      FROM "invoices" i
      WHERE i."staffId" = s_id;
      SELECT concat(concat(s."staff_first_name", ' '),s."staff_last_name") INTO stafffullname 
      FROM "staff" s
      WHERE s."id" = s_id;
      dbms_output.put_line('Staff : '|| i_cost); 
   END; 
END GETSTAFFPAYMENTS;