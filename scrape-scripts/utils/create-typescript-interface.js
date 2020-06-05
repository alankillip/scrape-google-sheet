const prefix = (name) => `export interface ${name} {`;
const entry = (fieldName, propType) => ` ${fieldName}: ${propType};`;
const end = `}`;


module.exports = (name, fieldNames) => {
  let interfaceString = prefix(name);
  const addField = (fieldName) => {
    interfaceString = `${interfaceString}
    ${entry(fieldName, 'string')}`
  };
  fieldNames.map(addField);
  interfaceString = `${interfaceString}
${end}
`;
  return interfaceString;
};
