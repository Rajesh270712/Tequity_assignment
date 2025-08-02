export const AutoCompleteInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search Github users"
    className="autocomplete-input"
  />
);