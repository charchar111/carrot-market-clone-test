import { useState } from "react";

interface IUseMutationState<T> {
  loading: boolean;
  // data: undefined | any;
  data?: T;
  error: undefined | any;
}

type TUseMutation = <T>(
  url: string,
) => [(data: any) => void, IUseMutationState<T>];

const useMutation: TUseMutation = function <T>(url: string) {
  const [state, setState] = useState<IUseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(formData: any) {
    setState((current) => {
      const copy = { ...current };
      copy.loading = true;
      return copy;
    });
    // setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json().catch(() => {});
      })
      .then((response) => {
        // console.log("response", response);
        if (!response.ok) throw new Error(response.error.message);

        setState((current) => {
          const copy = { ...current };
          copy.error = undefined;
          copy.data = response;

          return copy;
        });
        // setError(undefined);
        // setData(response);
      })
      .catch((reject) => {
        // console.log("reject", reject);
        setState((current) => {
          const copy = { ...current };
          copy.error = reject?.message;
          return copy;
        });
        // setError(reject?.message);
      })
      .finally(
        () =>
          setState((current) => {
            const copy = { ...current };
            copy.loading = false;
            return copy;
          }),

        // setLoading(false)
      );
  }
  return [
    mutation,
    { loading: state.loading, data: state.data, error: state.error },
  ];
};

export default useMutation;
