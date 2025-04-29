import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About This Project</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>3D Air Pollution Map</CardTitle>
            <CardDescription>Visualizing environmental data in 3D</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The 3D Air Pollution Map project is designed to visualize air quality and pollution
              data in an interactive three-dimensional environment. This tool helps users understand
              air pollution patterns and trends.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our mission is to make environmental data more accessible and understandable through
              innovative visualization techniques. We believe that presenting complex data in an
              intuitive 3D format can help raise awareness about air quality issues and support
              better decision-making.
            </p>

            <p>By providing a visual representation of air quality data, we aim to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Increase public awareness of air pollution issues</li>
              <li>Help policymakers identify problem areas and effective interventions</li>
              <li>Support researchers with intuitive data visualization tools</li>
              <li>Empower individuals to make informed decisions about their local environment</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Modern web technologies powering our application</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This application is built using modern web technologies including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-2">Frontend</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>React with TypeScript</li>
                  <li>Tailwind CSS for styling</li>
                  <li>Shadcn UI components</li>
                  <li>React Router for navigation</li>
                </ul>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-2">3D Visualization</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Three.js for 3D rendering</li>
                  <li>Custom WebGL shaders</li>
                  <li>React Three Fiber</li>
                  <li>3D data visualization techniques</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our application uses air quality data from various public sources, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>EPA Air Quality System</li>
              <li>World Air Quality Index</li>
              <li>Open AQ Platform</li>
              <li>Local environmental monitoring stations</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Note: Currently, our application is in development and uses sample data. Integration
              with real-time air quality APIs is planned for future releases.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
