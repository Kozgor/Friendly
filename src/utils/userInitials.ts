export const getInitials = (fullName: string) => {
  const words = fullName.split(' ');
  const firstNameInitial = words[0].charAt(0);
  let lastNameInitial = words[words.length - 1].charAt(0);

  if (words.length >= 2) {
    return `${firstNameInitial} ${lastNameInitial}`.toUpperCase();
  } else if (words.length === 1) {
    lastNameInitial = words[0].charAt(1);
    return `${firstNameInitial.toUpperCase()}${lastNameInitial.toLowerCase()}`;
  } else {
    return 'N/A';
  }
};
