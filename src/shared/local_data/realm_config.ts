import { createRealmContext } from "@realm/react";
import UserSchema from "./user/user_schema";

export const RealmContext = createRealmContext({
    schema: [UserSchema]
});