import { createRealmContext } from "@realm/react";
import UserSchema from "./collections/user/user_schema";

export const RealmContext = createRealmContext({
    schema: [UserSchema]
});