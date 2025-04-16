"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getInsurancePolicies(shopId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("insurance_policies")
    .select("*")
    .eq("shop_id", shopId)
    .eq("is_active", true)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getInsurancePolicyById(policyId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("insurance_policies").select("*").eq("id", policyId).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createInsurancePolicy(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const shopId = formData.get("shopId") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const coverageLimit = Number.parseFloat(formData.get("coverageLimit") as string)
  const deductible = Number.parseFloat(formData.get("deductible") as string)

  const { data, error } = await supabase
    .from("insurance_policies")
    .insert({
      shop_id: shopId,
      name,
      description,
      price,
      coverage_details: {
        coverage_limit: coverageLimit,
        deductible: deductible,
      },
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/insurance`)
  return { success: true, policy: data }
}

export async function updateInsurancePolicy(policyId: string, formData: FormData) {
  const supabase = createServerSupabaseClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const coverageLimit = Number.parseFloat(formData.get("coverageLimit") as string)
  const deductible = Number.parseFloat(formData.get("deductible") as string)
  const isActive = formData.get("isActive") === "true"

  const { data, error } = await supabase
    .from("insurance_policies")
    .update({
      name,
      description,
      price,
      coverage_details: {
        coverage_limit: coverageLimit,
        deductible: deductible,
      },
      is_active: isActive,
    })
    .eq("id", policyId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/shop/insurance`)
  revalidatePath(`/shop/insurance/${policyId}`)
  return { success: true, policy: data }
}
