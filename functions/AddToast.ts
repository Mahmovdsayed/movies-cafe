import { colors } from "@/types/colors.types";
import { addToast } from "@heroui/react";

const AddToast = (
  title: string,
  timeout: number,
  type: colors = "default",
  description?: string
) => {
  addToast({
    color: "foreground",
    variant: "solid",
    title,
    description,
    timeout,
    severity: type,
    shadow: "none",
    size: "sm",
    radius: "sm",
    shouldShowTimeoutProgress: true,
  });
};

export { AddToast };
