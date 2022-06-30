import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'blog_base',
    namedPlaceholders: true,
    decimalNumbers: true,
});
