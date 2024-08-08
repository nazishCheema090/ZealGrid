import PropTypes from 'prop-types';
import { useId } from 'react';

export default function CheckBox({ label, value, onChange, name }) {
  const featureInputID = useId();

  return (
    <div className="flex items-center ps-3">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        name={name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        id={featureInputID}
      />
      <label htmlFor={featureInputID} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
}

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
