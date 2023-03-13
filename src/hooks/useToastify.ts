import { toast } from "react-toastify";

export function useToastify() {

  const successMessage = (message: string) => toast.success(message, {
    theme: 'dark'
  })

  const errorMessage = (message: string) => toast.error(message, {
    theme: 'dark'
  })

  return { successMessage, errorMessage }
}