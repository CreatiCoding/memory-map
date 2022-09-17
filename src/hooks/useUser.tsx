import axios from "axios";
import { useEffect } from "react";
import { login } from "../remotes/user";
import { useLocalStorageStage } from "./useLocalStorageStage";

interface Member {
  username: string;
  secretKey: string;
}

interface Guest {
  secretKey: string;
}

type User = Member | Guest;

export function useUser(initial: string) {
  const [user, setUser] = useLocalStorageStage<User>("user");

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (user === null) {
      setUser({ secretKey: initial });
      return;
    }

    if (user.secretKey != null) {
      return;
    }

    setUser({ secretKey: initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initial,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    user === null
      ? "null"
      : user != null && "username" in user
      ? user.username
      : "",
  ]);

  return [
    user,
    async ({ username, close }: { username: string; close: () => void }) => {
      const secretKey = user?.secretKey ?? initial;

      try {
        const message = await login({ username, secretKey });

        alert(message);

        setUser({
          username,
          secretKey: user?.secretKey ?? initial,
        });

        close();
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          alert(JSON.stringify(error.response?.data));
        } else {
          alert(error.meesage);
        }
      }
    },
  ] as const;
}
