export const reverseGeneratedName = (name) => {
   const newName = name.substr(name.lastIndexOf("_") + 1);
   return newName;
};
