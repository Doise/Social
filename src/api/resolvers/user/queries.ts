import User from "../../../models/user";
import { IUser } from "../../../interfaces/IUser";

const queries = {
    user: async (_: void, { userId }: { userId: string }): Promise<IUser> => {
        try {
            return (await User.findById(userId)) as IUser;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default queries;
