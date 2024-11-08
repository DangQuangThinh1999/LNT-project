import { generalHttp } from "@/api/axiosConfig";
import { useCallback, useEffect, useState } from "react";

type HttpMethod = "get" | "post" | "put" | "delete";

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

const useApi = <T,>(
  url: string,
  method: HttpMethod = "get",
  body?: any
): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (method === "get") {
        res = await generalHttp.get(url);
      } else if (method === "post") {
        res = await generalHttp.post(url, body);
      } else if (method === "put") {
        res = await generalHttp.put(url, body);
      } else if (method === "delete") {
        res = await generalHttp.delete(url);
      }
      setData(res?.data);
    } catch (err: any) {
      setError("An error occurred: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }, [body, method, url]);

  useEffect(() => {
    fetchData();
  }, [url, method, body, fetchData]);

  return { data, loading, error, fetchData };
};

export default useApi;
