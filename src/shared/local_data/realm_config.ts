import {createRealmContext} from '@realm/react'; // Importing createRealmContext function from @realm/react
import PostSchema from './collections/post/post_schema'; // Importing PostSchema from post_schema file

// Creating a Realm context with specified schema
// Whenever the Schema is created be should add below. Otherwise that schema will not be published and accessible

export const RealmContext = createRealmContext({
  schema: [PostSchema], // Passing an array of schema objects to the createRealmContext function
});
