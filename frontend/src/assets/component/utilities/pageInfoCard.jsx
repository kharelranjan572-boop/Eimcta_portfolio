import React from "react";
import { ClipboardList } from "lucide-react";
import { UploadFbPost } from "../utilities/SocialMedia/AllApi"; // ✅ Correct import

export default function PageInfoCard({ platformKey, page }) {
    if (!page) return null;

    const handleFetchPosts = async () => {
        console.log(`Fetching posts for ${platformKey}:`, page.id);
        try {
            const message = "Your post message here"; // You can later connect this to a textarea input
            const res = await UploadFbPost(page.id, page.access_token, message);
            console.log("Post uploaded:", res);
        } catch (error) {
            console.error(`Error uploading post for ${platformKey}:`, error);
        }
    };

    return (
        <div className="border p-6 rounded shadow-md bg-white mt-4 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Page Info ({platformKey.toUpperCase()})
            </h2>

            <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Page ID:</span> {page.id}</p>
                <p><span className="font-semibold">Page Name:</span> {page.name}</p>
                {page.category && <p><span className="font-semibold">Category:</span> {page.category}</p>}
                {page.username && <p><span className="font-semibold">Username:</span> {page.username}</p>}
                {page.access_token && (
                    <p className="break-all">
                        <span className="font-semibold">Access Token:</span> {page.access_token}
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            {page.access_token && (
                <div className="mt-6 flex flex-wrap gap-4">
                    <button
                        onClick={handleFetchPosts}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                    >
                        <ClipboardList className="mr-2" size={18} />
                        Upload Post
                    </button>
                </div>
            )}
        </div>
    );
}
