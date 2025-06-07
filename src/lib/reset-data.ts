// Utility to reset portfolio data
export const resetPortfolioData = () => {
  localStorage.removeItem("portfolioData");
  localStorage.removeItem("portfolioDataVersion");
  window.location.reload();
};

// Auto-reset on first load if data is old or missing important fields
export const checkAndResetData = () => {
  try {
    const data = localStorage.getItem("portfolioData");
    if (data) {
      const parsed = JSON.parse(data);
      // Check if it has the new dummy data structure
      if (
        !parsed.personalInfo?.name?.includes("Darshan") ||
        !parsed.projects?.length
      ) {
        resetPortfolioData();
      }
    }
  } catch (error) {
    resetPortfolioData();
  }
};

export default { resetPortfolioData, checkAndResetData };
