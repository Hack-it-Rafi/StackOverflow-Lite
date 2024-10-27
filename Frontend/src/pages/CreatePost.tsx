import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../redux/features/user/userAccess.api";
import { Button, message, Spin, Select } from "antd";
import { useState } from "react";
import { primaryButton } from "../config/themeConfig";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [createPost] = useCreatePostMutation();
  const [uploadMode, setUploadMode] = useState("file");
  const [language, setLanguage] = useState("c");

  const handleCreatePost = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    const form = e.target;
  
    try {
      const headLine = form.headLine.value;
      const content = form.content.value;
      let file;

      if (uploadMode === "file") {
        file = form.file.files[0];
      } else {
        const codeContent = form.codeSnippet.value;
        const fileExtension = language === "c" ? ".c" : language === "java" ? ".java" : ".py";
        file = new File([codeContent], `snippet${fileExtension}`, { type: "text/plain" });
      }

      const formData = new FormData();
      formData.append("headLine", headLine);
      formData.append("content", content);
      formData.append("file", file);
      formData.append("userEmail", "rafi@gmail.com");
      formData.append("userId", "67193289b5c586eb7a18a8d3");

      const result = await createPost(formData);
      if (result?.data.success) {
        message.success("Post created successfully!");
        navigate("/");
      } else {
        message.error("Failed to create Post.");
      }
    } catch (error) {
      message.error("Failed to create Post.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className=" mx-auto px-4 lg:px-0 mt-10 font-frank">
      <div>
        <button onClick={handleBack}>
          <IoArrowBackCircleOutline size={50} />
        </button>
      </div>
      <form onSubmit={handleCreatePost} className="px-5 md:px-20 pb-20">
        <div className="border-[3px] p-4">
          <div className="text-center pt-3 pb-3">
            <h2 className="text-xl md:text-2xl font-semibold">Create Post</h2>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-medium text-gray-600">
                Head Line
              </span>
            </label>
            <input
              type="text"
              required
              placeholder="Type here"
              name="headLine"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-medium text-gray-600">
                Your Question
              </span>
            </label>
            <textarea
              required
              placeholder="Type here"
              name="content"
              rows={4}
              className="input input-bordered w-full"
            />
          </div>

          {/* Upload Mode Toggle */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-medium text-gray-600">
                Upload Mode
              </span>
            </label>
            <Select
              defaultValue="file"
              onChange={setUploadMode}
              className="w-full"
            >
              <Select.Option value="file">Upload File</Select.Option>
              <Select.Option value="snippet">Write Code Snippet</Select.Option>
            </Select>
          </div>

          {uploadMode === "file" ? (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-medium text-gray-600">
                  File
                </span>
              </label>
              <input
                type="file"
                required
                name="file"
                className="input input-bordered w-full"
              />
            </div>
          ) : (
            <>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium text-gray-600">
                    Code Language
                  </span>
                </label>
                <Select
                  defaultValue="c"
                  onChange={setLanguage}
                  className="w-full"
                >
                  <Select.Option value="c">C</Select.Option>
                  <Select.Option value="java">Java</Select.Option>
                  <Select.Option value="python">Python</Select.Option>
                </Select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium text-gray-600">
                    Code Snippet
                  </span>
                </label>
                <textarea
                  required
                  name="codeSnippet"
                  rows={12}
                  placeholder="Type your code here"
                  className="input input-bordered w-full"
                />
              </div>
            </>
          )}
        </div>

        {/* Submit */}
        <div className="form-control mt-6">
          <Button
            type="primary"
            style={primaryButton}
            htmlType="submit"
            disabled={loading}
          >
            {loading ? <Spin /> : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
