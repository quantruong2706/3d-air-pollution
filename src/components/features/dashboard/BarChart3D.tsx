import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DataPoint {
  readonly value: number;
  readonly label: string;
  readonly color: string;
}

interface BarChartProps {
  readonly data: ReadonlyArray<DataPoint>;
  readonly title?: string;
  readonly height?: number;
  readonly maxValue?: number;
  readonly animated?: boolean;
}

const COLORS = {
  TEXT: '#1f2937',
  GRID: '#e5e7eb',
  AXIS: '#9ca3af',
  HOVER_TINT: '#ffffff',
};

/**
 * Individual 3D bar with hover effect
 */
interface BarProps {
  readonly position: [number, number, number];
  readonly size: [number, number, number];
  readonly color: string;
  readonly label: string;
  readonly value: number;
}

const Bar: React.FC<BarProps> = ({ position, size, color, label, value }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const meshRef = useRef<THREE.Mesh>(null);

  // Create hover effect
  useFrame(() => {
    if (!meshRef.current) return;

    // Scale up on hover with smooth transition
    const scale = hovered ? 1.05 : 1;
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale, 0.1);

    // Add slight rotation on hover for emphasis
    if (hovered) {
      meshRef.current.rotation.y += 0.01;
    } else {
      // Reset rotation when not hovered
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y % (Math.PI * 2),
        0,
        0.05
      );
    }
  });

  // Handler for hover events
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  // Split label into multilines if needed
  const formattedLabel = label.length > 8 ? label.match(/.{1,8}/g)?.join('\n') || label : label;

  return (
    <group position={position}>
      {/* Bar mesh */}
      <mesh
        ref={meshRef}
        position={[0, size[1] / 2, 0]} // Position Y adjusted to half-height for proper placement
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.2}
          emissive={hovered ? COLORS.HOVER_TINT : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Value label above bar */}
      <Text
        position={[0, size[1] + 0.2, 0]}
        fontSize={0.2}
        color={COLORS.TEXT}
        anchorX="center"
        anchorY="bottom"
      >
        {value.toFixed(1)}
      </Text>

      {/* Category label below bar */}
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.18}
        color={COLORS.TEXT}
        anchorX="center"
        anchorY="top"
      >
        {formattedLabel}
      </Text>
    </group>
  );
};

/**
 * Chart grid component
 */
const ChartGrid: React.FC<{
  readonly size: [number, number, number]; // [width, height, depth]
}> = ({ size }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, _, depth] = size;

  return (
    <group position={[0, 0, 0]}>
      {/* Base plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width + 2, depth + 2]} />
        <meshStandardMaterial
          color={COLORS.GRID}
          opacity={0.3}
          transparent
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, size[1] / 2, -depth / 2 - 0.01]} receiveShadow>
        <planeGeometry args={[width + 2, size[1] + 2]} />
        <meshStandardMaterial
          color={COLORS.GRID}
          opacity={0.2}
          transparent
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

/**
 * BarChart3D component for rendering interactive 3D bar charts
 */
const BarChart3D: React.FC<BarChartProps> = ({
  data,
  title = 'Bar Chart',
  height = 300,
  maxValue,
  animated = true,
}) => {
  // Calculate chart dimensions and bar placements
  const { chartSize, normalizedData } = useMemo(() => {
    // Find max value for proper scaling
    const dataMax = maxValue || Math.max(...data.map(item => item.value)) * 1.2;

    const chartWidth = Math.max(data.length * 1.5, 6);
    const chartHeight = 4;
    const chartDepth = 4;

    // Calculate position and size for each bar
    const barWidth = 0.8;
    const spacing = (chartWidth - data.length * barWidth) / (data.length + 1);

    const normalized = data.map((item, index) => {
      // Calculate height based on value relative to max
      const barHeight = (item.value / dataMax) * chartHeight;

      // Calculate X position
      const xPos = -chartWidth / 2 + spacing + barWidth / 2 + index * (barWidth + spacing);

      return {
        ...item,
        position: [xPos, 0, 0] as [number, number, number],
        size: [barWidth, barHeight, barWidth] as [number, number, number],
      };
    });

    return {
      chartSize: [chartWidth, chartHeight, chartDepth] as [number, number, number],
      normalizedData: normalized,
      calculatedMaxValue: dataMax,
    };
  }, [data, maxValue]);

  if (!data?.length) {
    return <div>No data available</div>;
  }

  return (
    <div
      style={{ height: `${height}px`, width: '100%' }}
      className="relative rounded-lg overflow-hidden"
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 3, 10], fov: 40 }}>
        {/* Camera and controls */}
        <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={40} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          autoRotate={animated}
          autoRotateSpeed={0.5}
          target={[0, chartSize[1] / 3, 0]}
        />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />

        {/* Grid background */}
        <ChartGrid size={chartSize} />

        {/* Bars */}
        <group>
          {normalizedData.map((item, index) => (
            <Bar
              key={`bar-${index}`}
              position={item.position}
              size={item.size}
              color={item.color}
              label={item.label}
              value={item.value}
            />
          ))}
        </group>
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

export default BarChart3D;
