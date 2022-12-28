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

export const updateDocument = async (req, res) => {
   try {
      const {Model, body} = req;
      const {id} = req.params;
      const updatedDoc = await Model.findByIdAndUpdate({_id: id}, {...body});
      if (!updatedDoc) throw new Error("Document Not Found");
      res.status(202).send(updatedDoc);
   } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
   }
};

export const getDocument = async (req, res) => {
   try {
      const {Model} = req;
      const _id = req.params.id;
      const document = await Model.findById({_id});
      if (!document) throw new Error("Document Not Found");
      res.status(200).send(document);
   } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
   }
};
