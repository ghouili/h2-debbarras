import { Input } from './ui/input'
import { Select } from './ui/select'

type FilterBarProps = {
  search: string
  onSearchChange: (value: string) => void
  filters?: Array<{ label: string; value: string }>
  filterValue?: string
  onFilterChange?: (value: string) => void
  placeholder?: string
}

export const FilterBar = ({
  search,
  onSearchChange,
  filters,
  filterValue,
  onFilterChange,
  placeholder = 'Rechercher...'
}: FilterBarProps) => (
  <div className="flex flex-wrap items-center gap-3">
    <div className="min-w-[220px] flex-1">
      <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder={placeholder} />
    </div>
    {filters && onFilterChange ? (
      <div className="min-w-[180px]">
        <Select value={filterValue} onChange={(event) => onFilterChange(event.target.value)}>
          {filters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </Select>
      </div>
    ) : null}
  </div>
)
