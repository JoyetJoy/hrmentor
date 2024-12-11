import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "@/lib/slices/auth.slice";
import SetUpHeader from "@/components/common/SetupMenuHeader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EMAIL_TEMPLATE } from "@/api/setup";
import { newRequest } from "@/api";

export default function EmailTemplete() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { user } = useUserStore((state) => ({ user: state.user }));

  const { data: emailTemplate } = useQuery({
    queryKey: ["emailTemplate", user?.id, id],
    queryFn: () =>
      newRequest
        .get(`${EMAIL_TEMPLATE}/${id}/edit`, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id && !!id,
  });

  return (
    <>
      <SetUpHeader menu="Menu" currentpath="Folder" page={1} />
      <div className="mx-auto mb-3 flex h-full w-[98%] items-center justify-between">
        <label>
          <b>Email Template</b>
        </label>
      </div>
      {emailTemplate ? (
        <>
          <div className="mx-auto h-full w-[98%] rounded-md bg-white px-3 py-4">
            <form className="grid w-full max-w-5xl grid-cols-12 gap-16 p-3">
              <div className="col-span-8 grid w-full grid-cols-1 gap-3">
                {/* Template Name Input */}
                <div
                  className="group flex w-full flex-col space-y-1"
                  style={{ width: "300px" }}
                >
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Template Name
                  </label>
                  <input
                    value={emailTemplate.templete_name}
                    name="templete_name"
                    type="text"
                    placeholder="Template Name"
                    className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                  />
                </div>

                {/* Subject Input */}
                <div className="group flex w-full flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={emailTemplate.subject}
                    type="text"
                    placeholder="Subject"
                    className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                  />
                </div>

                <div className="group flex w-full flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Email Type
                  </label>
                  <input
                    name="subject"
                    value={emailTemplate?.email_type_id?.value}
                    type="text"
                    placeholder="Subject"
                    className="input-box h-10 w-full rounded border border-black/10 px-2 text-sm"
                  />
                </div>

                {/* Toggle Switch for Default Option */}
                <div className="flex items-center space-x-2">
                  <h1 className="text-sm">Is Default</h1>
                  <div
                    className={`h-5 w-10 rounded-full p-[1px] ${
                      emailTemplate.is_default === 1
                        ? "bg-[#8be691]"
                        : "border border-[#888888] bg-white"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 transform rounded-full transition-transform ${
                        emailTemplate.is_default === 1
                          ? "translate-x-5 bg-[#00b448]"
                          : "translate-x-0 bg-black"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Content Note (ReactQuill Editor) */}
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    maxWidth: "700px",
                  }}
                >
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A]">
                    Content Note
                  </label>
                  <ReactQuill
                    value={emailTemplate.content}
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        [{ header: [1, 2, false] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ align: [] }],
                        [{ color: [] }, { background: [] }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                    placeholder="Type your content here..."
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
