import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: 'public' | 'admin'
}
const textMap: Record<ApiAlertProps['variant'], string> = {
    public: 'public',
    admin: 'admin'
}
const variantMap: Record<ApiAlertProps['variant'], string> = {
    public: 'secondary',
    admin: 'destructive'
}



export const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success(`copied`)
    }

    return (
        <Alert>
            <Server className="w-4 h-4" />
            <AlertTitle className="flex items-center gap-4 mb-3 font-extrabold text-md">
                {title}
                <Badge variant={variantMap[variant] as 'destructive' | 'secondary'}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="flex items-center justify-between">
                <code className="font-bold text-sm bg-muted rounded p-1 font-mono">
                    {description}
                </code>
                <Button onClick={onCopy} variant={'outline'} size={'icon'}>
                    <Copy className="w-4 h-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}