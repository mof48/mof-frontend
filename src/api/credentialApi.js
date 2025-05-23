export const uploadCredential = async (file) => {
    const formData = new FormData();
    formData.append("credential", file);
    const res = await fetch("/api/credentials/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  };
  
  export const getCredentialStatus = async () => {
    const res = await fetch("/api/credentials/status");
    if (!res.ok) throw new Error("Status fetch failed");
    return res.json();
  };
  
  export const getCredentialRequests = async () => {
    const res = await fetch("/api/credentials/requests");
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  };
  
  export const verifyCredential = async (id) => {
    const res = await fetch(`/api/credentials/verify/${id}`, { method: "POST" });
    if (!res.ok) throw new Error("Verify failed");
  };
  
  export const rejectCredential = async (id) => {
    const res = await fetch(`/api/credentials/reject/${id}`, { method: "POST" });
    if (!res.ok) throw new Error("Reject failed");
  };
  