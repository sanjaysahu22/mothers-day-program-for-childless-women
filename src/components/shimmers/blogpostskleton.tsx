import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPostsSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8 mt-20">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex-grow">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <div className="flex items-center space-x-2 mb-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <Skeleton className="h-48 w-full rounded-md" />
              <div className="flex flex-wrap items-center justify-between">
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
