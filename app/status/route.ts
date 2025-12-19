interface ServiceStatus {
  ok: boolean
  responseTime: number
}

export async function GET() {
  const services: Record<string, ServiceStatus> = {
    bliss_surf_website: { ok: false, responseTime: 0 },
    bliss_surf_discord: { ok: false, responseTime: 0 },
    zuzu_rest_website: { ok: false, responseTime: 0 },
    yuu_pm_host: { ok: false, responseTime: 0 },
  }

  try {
    const start = performance.now()
    const res = await fetch("https://bliss.surf", {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    })
    const end = performance.now()
    services.bliss_surf_website = { ok: res.ok, responseTime: Math.round(end - start) }
  } catch {
    services.bliss_surf_website.responseTime = 5000
  }

  try {
    const start = performance.now()
    const res = await fetch("https://discord.bliss.surf/", {
      signal: AbortSignal.timeout(5000),
    })
    const end = performance.now()
    services.bliss_surf_discord = {
      ok: res.ok || res.status === 401,
      responseTime: Math.round(end - start),
    }
  } catch {
    services.bliss_surf_discord.responseTime = 5000
  }

  try {
    const start = performance.now()
    const res = await fetch("https://zuzu.rest", {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    })
    const end = performance.now()
    services.zuzu_rest_website = { ok: res.ok, responseTime: Math.round(end - start) }
  } catch {
    services.zuzu_rest_website.responseTime = 5000
  }

  try {
    const start = performance.now()
    const res = await fetch("https://yuu.pm/health", {
      signal: AbortSignal.timeout(5000),
    })
    const end = performance.now()
    if (res.ok) {
      const data = await res.json()
      services.yuu_pm_host = {
        ok: data.status === "operational",
        responseTime: Math.round(end - start),
      }
    }
  } catch {
    services.yuu_pm_host.responseTime = 5000
  }

  return Response.json(services)
}
