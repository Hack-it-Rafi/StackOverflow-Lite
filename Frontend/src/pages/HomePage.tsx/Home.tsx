import { useCallback, useEffect, useState } from "react";
import { useGetAllPostsQuery } from "../../redux/features/user/userAccess.api";
import { debounce } from "lodash";
import PostCard from "../../components/ui/PostCard";
import { Input } from "antd";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const queryParams = [
    { name: "page", value: 1 },
    { name: "limit", value: 9 },
    { name: "searchTerm", value: debouncedSearch },
  ].filter((item) => item.value !== undefined);

  const { data, refetch } = useGetAllPostsQuery(queryParams);

  // Debounce the refetch call to limit how often it gets called
  const debouncedFetch = useCallback(
    debounce(() => {
      setDebouncedSearch(search); // Update debouncedSearch before fetching
      refetch();
    }, 1000),
    [search, refetch]
  );

  // Trigger the debounced fetch whenever search input changes
  useEffect(() => {
    debouncedFetch();
    // Cleanup debounce effect
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, search]);


  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <Input
          className="input input-bordered w-24 md:w-96 h-10 mx-auto"
          placeholder="Search posts"
          value={search}
          size="middle"
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
      </div>
      <div className="flex flex-col gap-10 max-w-4xl mx-auto">
        {data?.data?.map((item) => (
          <PostCard key={item._id} item={item}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
