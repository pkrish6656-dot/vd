import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-4 shadow-xl border-primary/10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground font-body">
            Oops! Looks like you wandered off the path of love.
          </p>
          
          <div className="mt-8">
             <Link href="/" className="text-primary hover:text-primary/80 underline font-medium">
               Return to the big question
             </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
