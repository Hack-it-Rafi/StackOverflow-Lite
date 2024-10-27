import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../redux/features/user/userAccess.api";

const PostDetails = () => {
    const {id} = useParams();
    const { data } = useGetSinglePostQuery(id as string);
    console.log(data);

    return (
        <div>
            Hello
        </div>
    );
};

export default PostDetails;