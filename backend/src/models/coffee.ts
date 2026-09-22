import mongoose, { Schema, Document } from 'mongoose';

interface ICoffee extends Document {
  name: String;
  img_uri: String,
  description: String;
  ingredients: String;
  steps: String; 
}

const CoffeeSchema: Schema = new Schema<ICoffee>({
  name: {
     type: String,
     unique: true,
     required: true 
    },
  img_uri: {
     type: String,
     required: true 
    },
  description: {
    type: String,
    required: true
  },
  ingredients:{
    type: String,
    required: true
  },
  steps: {
    type: String,
    required: true
  } 
});

const Coffee = mongoose.model<ICoffee>('Coffee', CoffeeSchema);
export default Coffee;