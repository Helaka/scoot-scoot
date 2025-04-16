import RiderLoginRedirect from "@/components/redirects/rider-login-redirect"

export default function RiderLoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get the redirectTo value safely
  const redirectPath = typeof searchParams.redirectTo === "string" ? searchParams.redirectTo : "/rider-dashboard"

  return <RiderLoginRedirect redirectPath={redirectPath} />
}
