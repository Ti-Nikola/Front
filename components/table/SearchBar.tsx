import { Input } from '../ui/input';

interface ISearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: ISearchBarProps) => {
  return (
    <Input
      placeholder="Buscar..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-96 flex-grow"
    />
  );
};
