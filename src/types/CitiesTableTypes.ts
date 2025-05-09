import { PollutionDataPoint, PollutionType } from './3dVisualization';

/**
 * Type for sort options
 */
export type SortOption = 'name' | 'id';

/**
 * Interface for table header props
 */
export interface TableHeaderProps {
  readonly activeLayerLabel: string;
}

/**
 * Interface for cities table props
 */
export interface CitiesTableProps {
  readonly data: ReadonlyArray<PollutionDataPoint>;
  readonly activeLayer: PollutionType;
}

/**
 * Interface for table body props
 */
export interface TableBodyProps {
  readonly cities: ReadonlyArray<PollutionDataPoint>;
  readonly activeLayer: PollutionType;
  readonly isTopCities?: boolean;
}

export interface AirQualityLevel {
  readonly key: string;
  readonly label: string;
  readonly color: string;
}
