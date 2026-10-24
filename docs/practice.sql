-- SQLite 3 training fixture. Entirely synthetic. Run in a NEW practice database.
-- No company data. 124 raw rows, including deliberate data-quality traps.
PRAGMA foreign_keys=ON;
CREATE TABLE carriers(carrier_id TEXT PRIMARY KEY, carrier_name TEXT NOT NULL);
INSERT INTO carriers VALUES ('C01','Northline Demo'),('C02','Swift Demo'),('C03','Transit Demo'),('C04','Green Demo');
CREATE TABLE warehouses(warehouse_id TEXT PRIMARY KEY, warehouse_name TEXT NOT NULL);
INSERT INTO warehouses VALUES ('W01','North Demo'),('W02','Central Demo'),('W03','South Demo');
CREATE TABLE raw_shipments(row_id INTEGER PRIMARY KEY, shipment_id TEXT, external_ref TEXT, carrier_id TEXT, warehouse_id TEXT, dispatch_date TEXT, promised_date TEXT, delivered_date TEXT, exception_reason TEXT, service_level TEXT);
INSERT INTO raw_shipments(shipment_id,external_ref,carrier_id,warehouse_id,dispatch_date,promised_date,delivered_date,exception_reason,service_level) VALUES
('S0001','REF0001','C02','W02','2026-09-02','2026-09-04','2026-09-04','None','Standard'),
('S0002','REF0002','C03','W03','2026-09-03','2026-09-06','2026-09-06','None','Standard'),
('S0003','REF0003','C04','W01','2026-09-04','2026-09-05','2026-09-05','None','Express'),
('S0004','REF0004','C01','W02','2026-09-05','2026-09-07','2026-09-08','Carrier delay','Standard'),
('S0005','REF0005','C02','W03','2026-09-06','2026-09-09','2026-09-11','Capacity','Standard'),
('S0006','REF0006','C03','W01','2026-09-07','2026-09-08','2026-09-08','None','Express'),
('S0007','REF0007','C04','W02','2026-09-08','2026-09-10','2026-09-10','None','Standard'),
('S0008','REF0008','C01','W03','2026-09-09','2026-09-12','2026-09-13','Carrier delay','Standard'),
('S0009','REF0009','C99','W01','2026-09-10','2026-09-11','2026-09-11','None','Express'),
('S0010','REF0010','C03','W02','2026-09-11','2026-09-13','2026-09-15','Capacity','Standard'),
('S0011','REF0011','C04','W03','2026-09-12','2026-09-15',NULL,'None','Standard'),
('S0012','REF0012','C01','W01','2026-09-13','2026-09-14','2026-09-15','Carrier delay','Express'),
('S0013','REF0013','C02','W02','2026-09-14','2026-09-16','2026-09-16','None','Standard'),
('S0014','REF0014','C03','W03','2026-09-15','2026-09-18','2026-09-18','None','Standard'),
('S0015','REF0015','C04','W01','2026-09-16','2026-09-17','2026-09-19','Capacity','Express'),
('S0016','REF0016','C01','W02','2026-09-17','2026-09-19','2026-09-20','Carrier delay','Standard'),
('S0017','REF0017','C02','W03','2026-09-18','2026-09-21','2026-09-17','None','Standard'),
('S0018','REF0018','C03','W01','2026-09-19','2026-09-20','2026-09-20','None','Express'),
('S0019','REF0019','C04','W02','2026-09-20','2026-09-22','2026-09-22','None','Standard'),
('S0020','REF0020','C01','W03','2026-09-21','2026-09-24','2026-09-26','Capacity','Standard'),
('S0021','REF0021','C02','W01','2026-09-22','2026-09-23','2026-09-23','None','Express'),
('S0022','REF0022','C03','W02','2026-09-23','2026-09-25',NULL,'None','Standard'),
('S0023','REF0023','C04','W03','2026-09-24','2026-09-27','2026-09-27','None','Standard'),
('S0024','REF0024','C01','W01','2026-09-25','2026-09-26','2026-09-27','Carrier delay','Express'),
('S0025','REF0025','C02','W02','2026-09-26','2026-09-28','2026-09-30','Capacity','Standard'),
('S0026','REF0026','C03','W03','2026-09-27','2026-09-30','2026-09-30','None','Standard'),
('S0027','REF0027','C04','W01','2026-09-28','2026-09-29','2026-09-29','None','Express'),
('S0028','REF0028','C01','W02','2026-09-01','2026-09-03','2026-09-04','Carrier delay','Standard'),
('S0029','REF0029','C02','W03','2026-09-02','2026-09-05','2026-09-05','None','Standard'),
('S0030','REF0030','C03','W01','2026-09-03','2026-09-04','2026-09-06','Capacity','Express'),
('S0031','REF0031','C04','W02','2026-09-04','2026-09-06','2026-09-06','None','Standard'),
('S0032','REF0032','C01','W03','2026-09-05','2026-09-08','2026-09-09','Carrier delay','Standard'),
('S0033','REF0033','C02','W01','2026-09-06','2026-09-07',NULL,'None','Express'),
('S0034','REF0034','C03','W02','2026-09-07','2026-09-09','2026-09-09','None','Standard'),
('S0035','REF0035','C04','W03','2026-09-08','2026-09-11','2026-09-13','Capacity','Standard'),
('S0036','REF0036','C01','W01','2026-09-09','2026-09-10','2026-09-11','Carrier delay','Express'),
('S0037','REF0037','C02','W02','2026-09-10','2026-09-12','2026-09-12','None','Standard'),
('S0038','REF0038','C03','W03','2026-09-11','2026-09-14','2026-09-14','None','Standard'),
('S0039','REF0039','C99','W01','2026-09-12','2026-09-13','2026-09-13','None','Express'),
('S0040','REF0040','C01','W02','2026-09-13','2026-09-15','2026-09-17','Capacity','Standard'),
('S0041','REF0041','C02','W03','2026-09-14','2026-09-17','2026-09-17','None','Standard'),
('S0042','REF0042','C03','W01','2026-09-15','2026-09-16','2026-09-16','None','Express'),
('S0043','REF0043','C04','W02','2026-09-16','2026-09-18','2026-09-18','None','Standard'),
('S0044','REF0044','C01','W03','2026-09-17','2026-09-20',NULL,'Carrier delay','Standard'),
('S0045','REF0045','C02','W01','2026-09-18','2026-09-19','2026-09-21','Capacity','Express'),
('S0046','REF0046','C03','W02','2026-09-19','2026-09-21','2026-09-21','None','Standard'),
('S0047','REF0047','C04','W03','2026-09-20','2026-09-23','2026-09-23','None','Standard'),
('S0048','REF0048','C01','W01','2026-09-21','2026-09-22','2026-09-23','Carrier delay','Express'),
('S0049','REF0049','C02','W02','2026-09-22','2026-09-24','2026-09-24','None','Standard'),
('S0050','REF0050','C03','W03','2026-09-23','2026-09-26','2026-09-28','Capacity','Standard'),
('S0051','REF0051','C04','W01','2026-09-24','2026-09-25','2026-09-25','None','Express'),
('S0052','REF0052','C01','W02','2026-09-25','2026-09-27','2026-09-28','Carrier delay','Standard'),
('S0053','REF0053','C02','W03','2026-09-26','2026-09-29','2026-09-29','None','Standard'),
('S0054','REF0054','C03','W01','2026-09-27','2026-09-28','2026-09-28','None','Express'),
('S0055','REF0055','C04','W02','2026-09-28','2026-09-30',NULL,'Capacity','Standard'),
('S0056','REF0056','C01','W03','2026-09-01','2026-09-04','2026-09-05','Carrier delay','Standard'),
('S0057','REF0057','C02','W01','2026-09-02','2026-09-03','2026-09-01','None','Express'),
('S0058','REF0058','C03','W02','2026-09-03','2026-09-05','2026-09-05','None','Standard'),
('S0059','REF0059','C04','W03','2026-09-04','2026-09-07','2026-09-07','None','Standard'),
('S0060','REF0060','C01','W01','2026-09-05','2026-09-06','2026-09-08','Capacity','Express'),
('S0061','REF0061','C02','W02','2026-09-06','2026-09-08','2026-09-08','None','Standard'),
('S0062','REF0062','C03','W03','2026-09-07','2026-09-10','2026-09-10','None','Standard'),
('S0063','REF0063','C04','W01','2026-09-08','2026-09-09','2026-09-09','None','Express'),
('S0064','REF0064','C01','W02','2026-09-09','2026-09-11','2026-09-12','Carrier delay','Standard'),
('S0065','REF0065','C02','W03','2026-09-10','2026-09-13','2026-09-15','Capacity','Standard'),
('S0066','REF0066','C03','W01','2026-09-11','2026-09-12',NULL,'None','Express'),
('S0067','REF0067','C04','W02','2026-09-12','2026-09-14','2026-09-14','None','Standard'),
('S0068','REF0068','C01','W03','2026-09-13','2026-09-16','2026-09-17','Carrier delay','Standard'),
('S0069','REF0069','C02','W01','2026-09-14','2026-09-15','2026-09-15','None','Express'),
('S0070','REF0070','C03','W02','2026-09-15','2026-09-17','2026-09-19','Capacity','Standard'),
('S0071','REF0071','C04','W03','2026-09-16','2026-09-19','2026-09-19','None','Standard'),
('S0072','REF0072','C01','W01','2026-09-17','2026-09-18','2026-09-19','Carrier delay','Express'),
('S0073','REF0073','C02','W02','2026-09-18','2026-09-20','2026-09-20','None','Standard'),
('S0074','REF0074','C03','W03','2026-09-19','2026-09-22','2026-09-22','None','Standard'),
('S0075','REF0075','C04','W01','2026-09-20','2026-09-21','2026-09-23','Capacity','Express'),
('S0076','REF0076','C01','W02','2026-09-21','2026-09-23','2026-09-24','Carrier delay','Standard'),
('S0077','REF0077','C02','W03','2026-09-22','2026-09-25',NULL,'None','Standard'),
('S0078','REF0078','C03','W01','2026-09-23','2026-09-24','2026-09-24','None','Express'),
('S0079','REF0079','C04','W02','2026-09-24','2026-09-26','2026-09-26','None','Standard'),
('S0080','REF0080','C01','W03','2026-09-25','2026-09-28','2026-09-30','Capacity','Standard'),
('S0081','REF0081','C02','W01','2026-09-26','2026-09-27','2026-09-27','None','Express'),
('S0082','REF0082','C03','W02','2026-09-27','2026-09-29','2026-09-29','None','Standard'),
('S0083','REF0083','C04','W03','2026-09-28','2026-10-01','2026-10-01','None','Standard'),
('S0084','REF0084','C01','W01','2026-09-01','2026-09-02','2026-09-03','Carrier delay','Express'),
('S0085','REF0085','C02','W02','2026-09-02','2026-09-04','2026-09-06','Capacity','Standard'),
('S0086','REF0086','C03','W03','2026-09-03','2026-09-06','2026-09-06','None','Standard'),
('S0087','REF0087','C04','W01','2026-09-04','2026-09-05','2026-09-05','None','Express'),
('S0088','REF0088','C01','W02','2026-09-05','2026-09-07',NULL,'Carrier delay','Standard'),
('S0089','REF0089','C02','W03','2026-09-06','2026-09-09','2026-09-09','None','Standard'),
('S0090','REF0090','C03','W01','2026-09-07','2026-09-08','2026-09-10','Capacity','Express'),
('S0091','REF0091','C04','W02','2026-09-08','2026-09-10','2026-09-10','None','Standard'),
('S0092','REF0092','C01','W03','2026-09-09','2026-09-12','2026-09-13','Carrier delay','Standard'),
('S0093','REF0093','C02','W01','2026-09-10','2026-09-11','2026-09-11','None','Express'),
('S0094','REF0094','C03','W02','2026-09-11','2026-09-13','2026-09-13','None','Standard'),
('S0095','REF0095','C04','W03','2026-09-12','2026-09-15','2026-09-17','Capacity','Standard'),
('S0096','REF0096','C01','W01','2026-09-13','2026-09-14','2026-09-15','Carrier delay','Express'),
('S0097','REF0097','C02','W02','2026-09-14','2026-09-16','2026-09-16','None','Standard'),
('S0098','REF0098','C03','W03','2026-09-15','2026-09-18','2026-09-18','None','Standard'),
('S0099','REF0099','C04','W01','2026-09-16','2026-09-17',NULL,'None','Express'),
('S0100','REF0100','C01','W02','2026-09-17','2026-09-19','2026-09-21','Capacity','Standard'),
('S0101','REF0101','C02','W03','2026-09-18','2026-09-21','2026-09-21','None','Standard'),
('S0102','REF0102','C03','W01','2026-09-19','2026-09-20','2026-09-20','None','Express'),
('S0103','REF0103','C04','W02','2026-09-20','2026-09-22','2026-09-22','None','Standard'),
('S0104','REF0104','C01','W03','2026-09-21','2026-09-24','2026-09-25','Carrier delay','Standard'),
('S0105','REF0105','C02','W01','2026-09-22','2026-09-23','2026-09-25','Capacity','Express'),
('S0106','REF0106','C03','W02','2026-09-23','2026-09-25','2026-09-25','None','Standard'),
('S0107','REF0107','C04','W03','2026-09-24','2026-09-27','2026-09-27','None','Standard'),
('S0108','REF0108','C01','W01','2026-09-25','2026-09-26','2026-09-27','Carrier delay','Express'),
('S0109','REF0109','C02','W02','2026-09-26','2026-09-28','2026-09-28','None','Standard'),
('S0110','REF0110','C03','W03','2026-09-27','2026-09-30',NULL,'Capacity','Standard'),
('S0111','REF0111','C04','W01','2026-09-28','2026-09-29','2026-09-29','None','Express'),
('S0112','REF0112','C01','W02','2026-09-01','2026-09-03','2026-09-04','Carrier delay','Standard'),
('S0113','REF0113','C02','W03','2026-09-02','2026-09-05','2026-09-05','None','Standard'),
('S0114','REF0114','C03','W01','2026-09-03','2026-09-04','2026-09-04','None','Express'),
('S0115','REF0115','C04','W02','2026-09-04','2026-09-06','2026-09-08','Capacity','Standard'),
('S0116','REF0116','C01','W03','2026-09-05','2026-09-08','2026-09-09','Carrier delay','Standard'),
('S0117','REF0117','C02','W01','2026-09-06','2026-09-07','2026-09-07','None','Express'),
('S0118','REF0118','C03','W02','2026-09-07','2026-09-09','2026-09-09','None','Standard'),
('S0119','REF0119','C04','W03','2026-09-08','2026-09-11','2026-09-11','None','Standard'),
('S0120','REF0120','C01','W01','2026-09-09','2026-09-10','2026-09-12','Capacity','Express'),
('S0005','REF0005','C02','W03','2026-09-06','2026-09-09','2026-09-11','Capacity','Standard'),
('S0020','REF0020','C01','W03','2026-09-21','2026-09-24','2026-09-26','Capacity','Standard'),
('S0121','REF0009','C99','W01','2026-09-10','2026-09-11','2026-09-11','None','Express'),
('S0122','REF0015','C04','W01','2026-09-16','2026-09-17','2026-09-19','Capacity','Express');

-- Remove exact repeated shipment IDs, keeping the first row. In a real system,
-- investigate duplicate semantics and versioning before choosing a rule.
CREATE VIEW shipments AS
WITH ranked AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY shipment_id ORDER BY row_id) AS rn FROM raw_shipments)
SELECT shipment_id, external_ref, carrier_id, warehouse_id, dispatch_date, promised_date, delivered_date, exception_reason, service_level FROM ranked WHERE rn=1;

-- 1. Reconcile raw vs deduplicated rows. Expected: 124 vs 122.
SELECT (SELECT COUNT(*) FROM raw_shipments) AS raw_rows, COUNT(*) AS cleaned_rows FROM shipments;
-- 2. Surface duplicate business references; do not silently delete them.
SELECT external_ref, COUNT(*) AS records FROM shipments GROUP BY external_ref HAVING COUNT(*)>1;
-- 3. Detect unmatched carrier codes.
SELECT s.shipment_id,s.carrier_id FROM shipments s LEFT JOIN carriers c ON s.carrier_id=c.carrier_id WHERE c.carrier_id IS NULL;
-- 4. Invalid delivery dates. Expected: 2 records before dispatch.
SELECT * FROM shipments WHERE delivered_date < dispatch_date;
-- 5. KPI at carrier grain. Denominator excludes open and invalid deliveries.
WITH eligible AS (SELECT * FROM shipments WHERE delivered_date IS NOT NULL AND delivered_date>=dispatch_date)
SELECT carrier_id,COUNT(*) AS eligible_deliveries,
SUM(CASE WHEN delivered_date>promised_date THEN 1 ELSE 0 END) AS late_deliveries,
ROUND(100.0*SUM(CASE WHEN delivered_date>promised_date THEN 1 ELSE 0 END)/NULLIF(COUNT(*),0),2) AS late_percent
FROM eligible GROUP BY carrier_id;
-- 6. Open shipments.
SELECT * FROM shipments WHERE delivered_date IS NULL;
-- Practice: add warehouse/service segments, rank carriers, compare the network
-- average and reconcile to Excel and Power BI using the SAME cleaning rules.
-- Microsoft learning examples use T-SQL: date functions and setup syntax differ.
