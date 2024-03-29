require("dotenv").config();
module.exports = {
  DB: {
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
  },
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
};
