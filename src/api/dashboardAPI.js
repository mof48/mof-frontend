// Simulated API helpers — replace with real fetch/axios if connecting to backend

export const fetchDashboardStats = async () => {
    // Simulate API response
    return {
      totalMembers: 312,
      pendingApprovals: 12,
      revenue: 89000,
    };
  };
  
  export const fetchWeeklySignups = async () => {
    return [3, 5, 8, 6, 7, 4, 9];
  };
  
  export const fetchPendingMembers = async () => {
    return [
      { id: 1, name: 'Jane Doe', tier: 'Diamond Orchid' },
      { id: 2, name: 'Sarah Lee', tier: 'Platinum Lily' },
    ];
  };
  
  export const approveMember = async (id) => {
    console.log(`✅ Approved member with ID ${id}`);
    return { success: true };
  };
  
  export const rejectMember = async (id) => {
    console.log(`❌ Rejected member with ID ${id}`);
    return { success: true };
  };
  