export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validateRegister = ({ name, email, password }) => {
  if (!name.trim()) return "Name is required";
  if (!validateEmail(email)) return "Enter a valid email";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const validateBookingDates = ({ startDate, endDate }) => {
  if (!startDate || !endDate) return "Start and end dates are required";
  if (new Date(endDate) < new Date(startDate)) return "End date must be after the start date";
  return "";
};
