import { AddToast } from "@/functions/AddToast";
import { useRouter } from "next/navigation";

const useHandleResponse = () => {
  const router = useRouter();

  return async (
    apiCall: Promise<{ success: boolean; message: string }>,
    resetForm?: () => void,
    route?: string
  ) => {
    const response = await apiCall;
    if (response.success) {
      resetForm?.();
      AddToast(response.message, 5000, "success");
      if (route) {
        router.push(route);
      }
    } else {
      AddToast(response.message, 5000, "warning");
    }
  };
};

export default useHandleResponse;
