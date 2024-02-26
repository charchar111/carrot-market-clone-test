import { useEffect, useState } from "react";

interface UseCoordState {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoord() {
  const [coords, setCoords] = useState<UseCoordState>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };
  const onFail = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onFail);
  }, []);

  return { latitude: coords.latitude, longitude: coords.longitude };
}
