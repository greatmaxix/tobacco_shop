ALTER SESSION SET CURRENT_SCHEMA=HR;
CREATE OR REPLACE PACKAGE HR.CREATESTAFF
AS
	PROCEDURE hire_staff (
      firstname  VARCHAR(255),
      lastname    VARCHAR(255),
      shop_id    NUMBER(12),
      mobile varchar2,
	);
	PROCEDURE fire_staff (
      staff_id    NUMBER(12),
	);
END CREATESTAFF;
CREATE OR REPLACE PACKAGE BODY HR.CREATESTAFF
AS
	staffid NUMBER(12) := 0;

	PROCEDURE hire_staff(
      firstname  VARCHAR(255),
      lastname    VARCHAR(255),
      shop_id    NUMBER(12),
      mobile varchar2,
	) IS 
   BEGIN
      INSERT INTO "staff" ("staff_first_name", "staff_last_name", "started_work_at")
      VALUES (firstname, lastname, job, sysdate)
      RETURNING id INTO staffid;
      INSERT INTO "staff_mobiles" ("staffId", "mobile")
      VALUES (staffid, "mobile");
	  INSERT INTO "staff_shops_shops" ("shopsId", "staffId")
      VALUES (shop_id, staffid);
   END hire_employee;
END CREATESTAFF;