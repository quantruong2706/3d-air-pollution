import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DataPoint {
  readonly value: number;
  readonly label: string;
  readonly color: string;
}

interface PieChartProps {
  readonly data: ReadonlyArray<DataPoint>;
  readonly title?: string;
  readonly height?: number;
  readonly radius?: number;
  readonly depth?: number;
  readonly rotation?: boolean;
}

const COLORS = {
  TEXT: '#1f2937',
  BACKGROUND: 'rgba(255, 255, 255, 0.7)',
};

/**
 * Calculate the positions and geometries for the 3D pie chart segments
 */
const createPieSegments = (
  data: ReadonlyArray<DataPoint>,
  radius: number,
  depth: number
): JSX.Element[] => {
  // Calculate total for percentages
  const total = data.reduce((sum, point) => sum + point.value, 0);

  // Initialize variables for tracking the current angle
  let currentAngle = 0;
  const segments: JSX.Element[] = [];

  // Create a segment for each data point
  data.forEach((point, index) => {
    // Calculate the arc angle based on the data value's proportion of the total
    const arcAngle = (point.value / total) * Math.PI * 2;

    // Create a custom shape for the pie segment
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // Center of the pie
    shape.lineTo(radius * Math.cos(currentAngle), radius * Math.sin(currentAngle));

    // Draw the arc
    const arcSegments = 32; // Higher number for smoother curve
    const angleStep = arcAngle / arcSegments;

    for (let i = 1; i <= arcSegments; i++) {
      const angle = currentAngle + angleStep * i;
      shape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
    }

    shape.lineTo(0, 0); // Back to center

    // Create 3D geometry by extruding the 2D shape
    const extrudeSettings = {
      depth,
      bevelEnabled: false,
    };

    // Create a position for the label at the middle of the arc
    const labelAngle = currentAngle + arcAngle / 2;
    const labelDistance = radius * 0.7; // Slightly inside the edge
    const labelPosition = new THREE.Vector3(
      labelDistance * Math.cos(labelAngle),
      labelDistance * Math.sin(labelAngle),
      depth / 2
    );

    // Calculate percentage for the label
    const percentage = ((point.value / total) * 100).toFixed(1);

    // Add the segment and its label to the segments array
    segments.push(
      <group key={`segment-${index}`}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial color={point.color} roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Add label if segment is large enough */}
        {arcAngle > 0.2 && (
          <Text
            position={labelPosition}
            fontSize={0.3}
            color={COLORS.TEXT}
            anchorX="center"
            anchorY="middle"
          >
            {`${percentage}%`}
          </Text>
        )}
      </group>
    );

    // Update the current angle for the next segment
    currentAngle += arcAngle;
  });

  return segments;
};

/**
 * PieChart3D component for rendering interactive 3D pie charts
 */
const PieChart3D: React.FC<PieChartProps> = ({
  data,
  title = 'Distribution',
  height = 300,
  radius = 2,
  depth = 0.5,
  rotation = true,
}) => {
  if (!data?.length) {
    return <div>No data available</div>;
  }

  return (
    <div
      style={{ height: `${height}px`, width: '100%' }}
      className="relative rounded-lg overflow-hidden"
    >
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={rotation}
          autoRotateSpeed={1}
        />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        {/* Main pie chart group - rotated to face the camera */}
        <group rotation={[-Math.PI / 8, 0, 0]}>{createPieSegments(data, radius, depth)}</group>
      </Canvas>

      {/* Title and legend overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-sm p-2 text-white">
        <h3 className="text-sm font-medium">{title}</h3>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-1">
          {data.map((item, i) => (
            <div key={`legend-${i}`} className="flex items-center text-xs">
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart3D;
