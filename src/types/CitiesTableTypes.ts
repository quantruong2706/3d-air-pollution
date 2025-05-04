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
  readonly sortBy: SortOption;
  readonly onToggleSort: () => void;
}

/**
 * Interface for table body props
 */
export interface TableBodyProps {
  readonly cities: ReadonlyArray<PollutionDataPoint>;
  readonly activeLayer: PollutionType;
}
