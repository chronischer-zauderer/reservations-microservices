import { Loader2 } from "lucide-react"

interface LoaderProps {
  text?: string
}

const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  )
}

export default Loader
