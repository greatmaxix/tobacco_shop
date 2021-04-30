CREATE OR REPLACE PROCEDURE HR.SETAUTOIDINCREMENT
AUTHID CURRENT_USER
IS
cursor c1 is SELECT DISTINCT table_name FROM all_tables WHERE owner = 'HR';
	  curr_seq_name varchar(255);
BEGIN
	FOR rec IN c1
	LOOP
   		curr_seq_name := concat(rec.table_name, '_aid');
        dbms_output.put_line(rec.table_name); 
        dbms_output.put_line(curr_seq_name); 
   		EXECUTE IMMEDIATE 'create sequence ' || curr_seq_name;
	END LOOP;
END SETAUTOIDINCREMENT;
