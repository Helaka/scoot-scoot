"use server"

import { supabaseServer } from "@/lib/supabase"

export async function getInsurancePoliciesByShopId(shopId: string) {
  try {
    const { data, error } = await supabaseServer
      .from("insurance_policies")
      .select("*")
      .eq("shop_id", shopId)
      .eq("is_active", true)

    if (error) {
      console.error("Error fetching insurance policies:", error)
      return []
    }

    return data.map((policy) => ({
      id: policy.id,
      name: policy.name,
      description: policy.description,
      price: policy.price,
      coverage_details: policy.coverage_details,
    }))
  } catch (error) {
    console.error("Exception in getInsurancePoliciesByShopId:", error)
    return []
  }
}
