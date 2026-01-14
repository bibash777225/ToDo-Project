const Filters: React.FC<{
  filters: { search?: string };
  onChange: (filters: Partial<{ search?: string }>) => void;
}> = ({ filters, onChange }) => {
  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Filters;
