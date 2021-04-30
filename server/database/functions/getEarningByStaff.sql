CREATE OR REPLACE PROCEDURE GET_EARNING_BY_STAFF
IS
   TYPE earning IS TABLE OF NUMBER INDEX BY binary_integer; 
   earning_list earning; 
   stffid int; 
   cursor c1 is SELECT sum(i."total_cost") as t_cost, i."staffId" AS staffId FROM "invoices" i GROUP BY i."staffId";
BEGIN
	FOR rec IN c1
	LOOP
   		earning_list(rec.staffId) := rec.t_cost; 
	END LOOP;
   
   -- printing the table 
   stffid := earning_list.FIRST; 
   WHILE stffid IS NOT null LOOP 
      dbms_output.put_line 
      ('Earning of ' || stffid || ' is ' || TO_CHAR(earning_list(stffid))); 
      stffid := earning_list.NEXT(stffid); 
   END LOOP; 
END GET_EARNING_BY_STAFF;
