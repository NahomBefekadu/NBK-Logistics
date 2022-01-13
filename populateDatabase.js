const { DB } = require("./config");
const { Pool } = require("pg");
const insertCategory = `
INSERT INTO category (category_name)
VALUES
  ('music'),
  ('health'),
  ('sports'),
  ('home improvement & tools'),
  ('books'),
  ('electronics'),
  ('video games'),
  ('beauty'),
  ('pet supplies'),
  ('major appliances'),
  ('software'),
  ('art');`;
const insertSuppliers = `
INSERT INTO supplier (supplier_name,address)
VALUES
  ('Nulla Integer Institute','P.O. Box 807, 2752 Eu Rd.'),
  ('Auctor Velit Eget Corporation','Ap #914-5801 A, Rd.'),
  ('Est Foundation','547-1896 Etiam Street'),
  ('Nunc Mauris Limited','Ap #120-9829 Felis Av.'),
  ('In Faucibus PC','2751 Ac Street'),
  ('Augue Malesuada Malesuada Incorporated','Ap #814-270 Pharetra. St.'),
  ('Purus Associates','264-8827 Fusce Rd.'),
  ('In Hendrerit Consectetuer Ltd','928-2115 Praesent Av.'),
  ('Lorem Vitae LLC','836-6804 Sem Avenue'),
  ('Massa Associates','3266 Vulputate, Rd.');`;
const insertWarehouse = `
INSERT INTO warehouse (warehouse_name)
VALUES
  ('Whitchurch-Stouffville'),
  ('Fort Providence'),
  ('Cornwall'),
   ('Lévis'),
  ('Fort St. John'),
  ('Thunder Bay'),
  ('Annapolis Royal'),
  ('Stonewall');
`;
const insertItems = `
INSERT INTO product (product_name,description,sku,price,category,stock,location,supplier)
VALUES
  ('Pravastatin Sodium','nec, imperdiet nec, leo.','9837AD23-C9AE-334A-8890-4D0D4D7E6664','997.19',12,29,7,4),
  ('Synthroid','ut quam vel sapien','C8B04C15-3092-507A-D854-1E6A67663F20','729.88',2,14,8,2),
  ('Metformin HCl','et ipsum cursus vestibulum.','2CBC5B60-451E-6908-E596-EDBC9C991655','708.36',3,39,3,2),
  ('Lantus Solostar','facilisis. Suspendisse commodo tincidunt','183F3064-26C9-56A6-198C-41C8E7AD4E2E','715.74',10,14,4,4),
  ('Triamcinolone Acetonide','a, malesuada id, erat.','7364986D-7725-3A36-F146-8C68E1A226BE','576.77',4,13,7,6),
  ('Suboxone','placerat, augue. Sed molestie.','1BCE40CA-E2CF-31BE-7B52-6CAA21D4EB9C','196.54',5,45,6,7),
  ('Citalopram HBR','molestie in, tempus eu,','842C2AE6-435F-5BD3-5524-8BCABE76C4C4','516.85',1,48,3,3),
  ('Sertraline HCl','sem ut cursus luctus,','D66D3C0C-1143-C66E-1F68-D8163277A48B','642.47',7,39,6,3),
  ('Tri-Sprintec','sit amet orci. Ut','3569B04D-29D7-9FF5-B3C1-FE32A2717D74','736.28',2,17,2,8),
  ('Nuvaring','tristique senectus et netus','7D1B7CA8-C7A0-D3B6-A72C-B1F5744C1FEC','456.09',2,41,3,9),
  ('Nasonex','vel nisl. Quisque fringilla','E72ECE43-191E-4315-8298-2B438B8A7E39','957.03',8,30,7,8),
  ('Lantus','Nunc ac sem ut','8DEA6F4D-A6BE-B612-2BD9-2667A78C9B86','946.11',1,20,3,5),
  ('Actos','ullamcorper viverra. Maecenas iaculis','616C61E2-4563-3123-0D5B-EF26C8B3C187','327.89',9,34,5,5),
  ('Glyburide','eu, odio. Phasellus at','46BA13FA-4B7C-66C3-F691-5A55ED435CCC','874.69',3,13,5,3),
  ('Vitamin D (Rx)','a, magna. Lorem ipsum','DB2EE6CD-AB4B-843F-E0A6-BB5A66F1D348','722.33',7,40,7,7),
  ('Pravastatin Sodium','Cras pellentesque. Sed dictum.','78579712-87C5-5E2C-6BBD-16739DA57E83','607.16',6,50,7,8),
  ('Warfarin Sodium','velit. Pellentesque ultricies dignissim','C18B244E-6C7D-D915-18EF-DB146648274A','199.25',3,31,7,10),
  ('Fluticasone Propionate','ligula. Aenean euismod mauris','976672D7-965A-2ADB-A416-D7DB2484B19C','412.97',9,12,3,5),
  ('Ciprofloxacin HCl','erat vel pede blandit','C7D1DAE2-979E-BE9A-B96C-12942A06A817','708.60',3,5,7,1),
  ('Risperidone','eget metus eu erat','95E96C4D-A6E1-8F8D-D9E5-77C3FFD84C97','854.63',4,46,8,2),
  ('Carvedilol','tellus. Suspendisse sed dolor.','09D1C244-8DD6-BE93-3EBB-08BA438588D4','988.73',6,21,4,6),
  ('Glipizide','orci. Ut semper pretium','B30AD167-0677-9789-6B7B-3CC7481A2776','128.71',7,37,7,7),
  ('Metoprolol Succinate','et arcu imperdiet ullamcorper.','D3DF9CA4-512C-48A3-1791-895B38F01BBD','859.76',3,48,5,1),
  ('Premarin','euismod est arcu ac','D2BB8481-DD7D-D79B-9C07-BA8DA871F250','447.88',2,16,2,5),
  ('Lyrica','orci, consectetuer euismod est','863EAA4A-8F46-A8D0-15D7-98065CD96A4A','636.81',9,15,4,8);`;

const start = async () => {
  try {
    const pool = new Pool({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT,
    });
    const start = Date.now();
    await pool.connect();
    await pool.query(insertCategory);
    await pool.query(insertSuppliers);
    await pool.query(insertWarehouse);
    await pool.query(insertItems);

    const duration = Date.now() - start;
    console.log({ msg: "executed query", duration });
    await pool.end();
  } catch (error) {
    console.log({ msg: "Database could not be setup", error });
    await pool.end();
  }
};

start();
