export const createDocument = async (req, res) => {
   try {
      const {Model, body, user, collection} = req;
      const newDoc = await Model.create(body);
      console.dir(Model);
      user.collections.forEach((cc) => {
         if (cc.name === collection.name) {
            cc.documentCount += 1;
         }
      });
      await user.save();
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
      const updatedDocument = await Model.findByIdAndUpdate(
         {_id: id},
         {...body}
      );
      if (!updatedDocument) throw new Error("Document Not Found");
      res.status(202).send(updatedDocument);
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

export const deleteDocument = async (req, res) => {
   try {
      const {Model, user, collection} = req;
      const _id = req.params.id;
      const deletedDocument = await Model.findByIdAndDelete({_id});
      if (!deletedDocument) throw new Error("Document Not Found");
      user.collections.forEach((cc) => {
         if (cc.name === collection.name) {
            cc.documentCount -= 1;
         }
      });
      await user.save();
      res.status(200).send(deletedDocument);
   } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
   }
};
