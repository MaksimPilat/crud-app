import { pool } from '@database';
import type { IUser } from '@types';

export const getUser = async (username: string): Promise<IUser | null> => {
  const queryText = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  const queryValues = [username];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows[0] || null;
  } catch (err) {
    throw err;
  }
};

export const addUser = async ({
  username,
  password,
}: Omit<IUser, 'id'>): Promise<IUser> => {
  const queryText = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  const queryValues = [username, password];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// export const authenticateUser = async ({
//   name,
//   password,
// }: Pick<IUser, 'name' | 'password'>): Promise<string> => {
//   // Логика аутентификации пользователя
//   // Здесь должна быть проверка учетных данных в базе данных

//   const token: string = 'mocked_access_token'; // Здесь должна быть логика создания токена доступа

//   return token; // Вернуть токен доступа при успешной аутентификации
// };
