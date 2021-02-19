import User from "../../../models/user";
import { IUser } from "../../../interfaces/IUser";

const queries = {
    user: async (_: void, { userId }: { userId: string }, { user }: { user: IUser}): Promise<IUser> => {
        if(!user) {
            throw new Error("This option is valid only for authenticated users.");
        }

        try {
            return (await User.findById(userId)) as IUser;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default queries;
