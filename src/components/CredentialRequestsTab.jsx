import React, { useEffect, useState } from "react";
import {
  getCredentialRequests,
  verifyCredential,
  rejectCredential,
} from "../api/credentialApi";

const CredentialRequestsTab = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  const loadRequests = () => {
    getCredentialRequests()
      .then(setRequests)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      action === "verify"
        ? await verifyCredential(id)
        : await rejectCredential(id);
      loadRequests();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="px-8 py-6 bg-[#f9f8f6] min-h-screen font-serif">
      <h2 className="text-3xl font-bold mb-6">🧾 Credential Verification</h2>

      {error && <p className="text-red-600">{error}</p>}

      {requests.length === 0 ? (
        <p className="text-gray-500 italic">No pending credentials.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-xl shadow border border-gray-200 p-5"
            >
              <div className="mb-3">
                <strong className="text-lg">{req.doctor.name}</strong>{" "}
                <span className="text-gray-600 text-sm">
                  ({req.doctor.email})
                </span>
              </div>

              <div className="mb-2 text-sm text-gray-700">
                Uploaded:{" "}
                {new Date(req.uploadedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              <div className="mb-4">
                <a
                  href={req.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Document
                </a>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAction(req._id, "verify")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleAction(req._id, "reject")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredentialRequestsTab;
