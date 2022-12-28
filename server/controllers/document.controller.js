export const createDocument = async (req, res) => {
   try {
      const {Model, body} = req;
      const newDoc = await Model.create(body);
      res.status(201).send(newDoc);
   } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
   }
};
