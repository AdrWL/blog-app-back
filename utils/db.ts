import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    // password: 'xxxx',
    database: 'megak_ads',
    namedPlaceholders: true,
    decimalNumbers: true,
});
