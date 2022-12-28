export const generateCollectionName = (name, id) => {
   const newname = `${id}_${name}`;
   return newname;
};

export const reverseGeneratedName = (name) => {
   const newName = name.substr(name.lastIndexOf("_") + 1);
   return newName;
};
