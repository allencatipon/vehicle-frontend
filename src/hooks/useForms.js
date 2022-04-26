import { useState, useCallback, useMemo, useEffect } from 'react';

const getInitialTouchedFields = (initialValue) => {
  if (typeof initialValue !== 'object') {
    return {};
  }
  return Object.keys(initialValue).reduce((acc, curr) => ({ ...acc, [curr]: false }), {});
};

const useForms = (initialValue = {}) => {
  const [formData, setFormData] = useState(initialValue);
  const [touchedFields, setTouchedFields] = useState(() => {
    return getInitialTouchedFields(initialValue);
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    return setFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleBlur = useCallback((name) => {
    return setTouchedFields((prevState) => ({ ...prevState, [name]: true }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialValue);
    setTouchedFields(getInitialTouchedFields(initialValue));
  }, [initialValue]);

  const formErrors = useMemo(() => {
    return Object.entries(formData).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: value?.trim?.() === '',
      };
    }, []);
  }, [formData]);

  const hasErrors = useMemo(() => {
    return Object.values(formErrors).some((value) => Boolean(value));
  }, [formErrors]);

  return {
    formErrors,
    formData,
    hasErrors,
    touchedFields,
    handleChange,
    handleBlur,
    resetForm,
  };
};

export default useForms;
