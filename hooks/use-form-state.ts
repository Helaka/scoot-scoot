"use client"

import { useState, useTransition } from "react"

type FormState<T> = {
  data?: T
  error?: string
  success?: boolean
}

export function useFormState<T = any>(
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean; [key: string]: any }>,
) {
  const [state, setState] = useState<FormState<T>>({})
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await action(formData)

        if (result.error) {
          setState({ error: result.error })
        } else {
          setState({
            data: result as unknown as T,
            success: true,
          })
        }
      } catch (error) {
        setState({
          error: error instanceof Error ? error.message : "An unexpected error occurred",
        })
      }
    })
  }

  return {
    state,
    isPending,
    handleSubmit,
  }
}
