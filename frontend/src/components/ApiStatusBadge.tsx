"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { checkApiHealth } from "../api/health"

const ApiStatusBadge = () => {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")

  useEffect(() => {
    const check = async () => {
      const isHealthy = await checkApiHealth()
      setStatus(isHealthy ? "online" : "offline")
    }

    check()
    const interval = setInterval(check, 30000) // Check every 30s

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
      {status === "checking" && (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Checking API</span>
        </>
      )}
      {status === "online" && (
        <>
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="text-success-foreground font-medium">API Online</span>
        </>
      )}
      {status === "offline" && (
        <>
          <XCircle className="w-4 h-4 text-destructive" />
          <span className="text-destructive font-medium">API Offline</span>
        </>
      )}
    </div>
  )
}

export default ApiStatusBadge
