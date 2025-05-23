import React, { useEffect, useState } from "react";
import { getUserRequests, acceptContactRequest, declineContactRequest } from "../api/contactApi";
import { Dialog } from "@headlessui/react";
import { Calendar, Mail, User, CheckCircle, XCircle } from "lucide-react";

const ContactRequestsTab = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);

  const loadRequests = () => {
    getUserRequests()
      .then(setRequests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const openModal = (req, type) => {
    setSelectedRequest(req);
    setActionType(type);
    setModalOpen(true);
  };

  const handleAction = async () => {
    try {
      if (actionType === "accept") {
        await acceptContactRequest(selectedRequest._id);
      } else {
        await declineContactRequest(selectedRequest._id);
      }
      setModalOpen(false);
      loadRequests();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="px-8 py-6 bg-[#f9f8f6] min-h-screen font-serif">
      <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] mb-6 border-b pb-2">
        📨 My Contact Requests
      </h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {requests.length === 0 ? (
        <p className="text-gray-500 italic">No contact requests at this time.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="rounded-2xl shadow-md border border-gray-200 bg-white p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-[#1c1c1c]">
                  {req.from?.name || "—"}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${
                    req.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <div className="text-sm text-gray-700 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{req.from?.name || "—"}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{req.from?.email || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>
                    {new Date(req.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-800 italic leading-relaxed mb-4">
                {req.message || "—"}
              </div>

              {req.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => openModal(req, "accept")}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept
                  </button>
                  <button
                    onClick={() => openModal(req, "decline")}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-2">
              Confirm {actionType === "accept" ? "Acceptance" : "Decline"}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 mb-4">
              Are you sure you want to {actionType} this request from{" "}
              <strong>{selectedRequest?.from?.name}</strong>?
            </Dialog.Description>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  actionType === "accept"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={handleAction}
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ContactRequestsTab;
