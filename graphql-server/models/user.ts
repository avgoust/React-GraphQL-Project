import { model,Schema } from "mongoose"

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email_address: String,
    username: String,
  },
  {collection: "Users"});
  
export default model('User' , userSchema);