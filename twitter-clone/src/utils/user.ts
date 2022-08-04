export const getAbbr = (name: string) => {  
  const words = name.split(' ');
  const abbr = words.map(word => word[0].toUpperCase()).join('');
  return abbr || 'N/A';
};
