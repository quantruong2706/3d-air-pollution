import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="text-center pb-0">
          <div className="text-6xl font-bold text-destructive mb-2">404</div>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
