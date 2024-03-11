import { createRealmContext } from "@realm/react";
import UserSchema from "./user/UserSchema";

export const RealmContext = createRealmContext({
    schema: [UserSchema]
});