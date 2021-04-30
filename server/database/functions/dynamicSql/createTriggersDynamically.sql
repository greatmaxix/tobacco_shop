CREATE OR REPLACE PROCEDURE HR.SETAUTOIDINCREMENT
AUTHID CURRENT_USER
IS
cursor c1 is SELECT table_name FROM all_tables WHERE owner = 'HR';
	  curr_seq_name varchar(255);
BEGIN
	FOR rec IN c1
	LOOP
   		curr_seq_name := concat(rec.table_name, '_aid');
   		EXECUTE IMMEDIATE 'create sequence ' || curr_seq_name;
	    EXECUTE IMMEDIATE 'CREATE OR REPLACE TRIGGER ' || concat(rec.table_name, '_trig') || '
		 	BEFORE INSERT ON "'|| rec.table_name ||'"
			  FOR EACH ROW
			  BEGIN
      			 SELECT '||curr_seq_name||'.nextval
				 INTO :new.id
			     FROM dual; 
			END'
      	;
	END LOOP;
END SETAUTOIDINCREMENT;
