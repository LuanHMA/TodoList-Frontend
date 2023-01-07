import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        alert("Houve um problema ao recuperar os dados!");
        console.log("ERROR GET: " + error);
      })
      .finally(() => setIsFetching(false));
  }, []);

  return { isFetching, data };
};
