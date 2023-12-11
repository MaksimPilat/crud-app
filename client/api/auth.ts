export interface IUser {
  id: number;
  username: string;
  password: string;
}

export const registerUser = async ({
  username,
  password,
}: Omit<IUser, 'id'>): Promise<Omit<IUser, 'password'>> => {
  try {
    const res: Response = await fetch(
      `http://localhost:3001/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password } as Omit<IUser, 'id'>),
      }
    );
    if (!res.ok) {
      throw new Error('Registration failed');
    }
    const user: Omit<IUser, 'password'> = await res.json();
    return user;
  } catch (err) {
    throw err;
  }
};

export const loginUser = async ({
  username,
  password,
}: Omit<IUser, 'id'>): Promise<string> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password } as Omit<IUser, 'id'>),
    });
    if (!res.ok) {
      throw new Error('Login failed');
    }
    const accessToken: string = await res.json();
    return accessToken;
  } catch (err) {
    throw err;
  }
};
