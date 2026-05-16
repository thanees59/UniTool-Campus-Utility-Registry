import { useCallback, useEffect, useState } from "react";
import { fetchEquipment } from "../api/equipment";
import { getErrorMessage } from "../api/client";

export default function useEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEquipment = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await fetchEquipment();
      setEquipment(data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load equipment"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(loadEquipment, 0);
    return () => window.clearTimeout(timer);
  }, [loadEquipment]);

  return { equipment, loading, error, reload: loadEquipment, setEquipment };
}
