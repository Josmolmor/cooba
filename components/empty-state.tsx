import { Button } from "@/components/ui/button"
import { Package2 } from "lucide-react"

export default function EmptyState({ name, onClick, className }: { name: string, onClick?: () => void, className?: string }) {
    return (
        <div className={`flex flex-col items-center justify-center min-h-[400px] text-center p-4 bg-muted/0 rounded-lg ${className}`}>
            <Package2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No {name}s yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Get started by adding your first {name}. You can add as many as you need.
            </p>
            {onClick ? <Button onClick={onClick}>Add {name}</Button> : null}
        </div>
    )
}
