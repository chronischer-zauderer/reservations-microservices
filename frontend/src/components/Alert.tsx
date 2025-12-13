import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

interface AlertProps {
  type: "success" | "error" | "warning" | "info"
  message: string
}

const Alert = ({ type, message }: AlertProps) => {
  const configs = {
    success: {
      icon: CheckCircle2,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-600",
    },
    error: {
      icon: XCircle,
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      iconColor: "text-red-600",
    },
    warning: {
      icon: AlertCircle,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-600",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      iconColor: "text-blue-600",
    },
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <div className={`${config.bgColor} ${config.textColor} p-4 rounded-lg flex items-start gap-3`}>
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      <p className="text-sm">{message}</p>
    </div>
  )
}

export default Alert
