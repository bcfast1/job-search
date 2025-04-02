import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import RightSidebar from "@/components/RightSidebar";
// Import the JSON data directly
import jobBoardsData from '@/data/job_boards.json';

// Define the JobBoard interface (can be moved to a types file later)
interface JobBoard {
  Category: string;
  Name: string;
  URL: string;
  Notes?: string;
}

// Removed getJobBoards function

// Component is no longer async as data is imported directly
export default function Home() {
  // Use imported JSON data directly, ensuring type safety
  const jobBoards: JobBoard[] = jobBoardsData;

  // --- Logic to get sorted categories (moved/duplicated from MainContent for passing to Sidebar) ---
  const groupedBoards: { [key: string]: JobBoard[] } = {};
  jobBoards.forEach(board => {
    const category = board.Category.trim();
    if (!groupedBoards[category]) {
      groupedBoards[category] = [];
    }
    groupedBoards[category].push(board);
  });

  const categoryOrder = [
    "Industry-Specific Boards (Advertising/Marketing/Creative)",
    "General Job Boards",
    "Additional Resources",
    "International / Regional Boards"
  ];

  const sortedCategories = Object.keys(groupedBoards).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
  // --- End of category logic ---

  // --- Prepare data for Sidebar links ---
  const sidebarLinks = [
    { label: "Helpful Tips", targetId: "helpful-tips" },
    { label: "Action Plan", targetId: "action-plan" },
    // Add job categories with generated IDs
    ...sortedCategories.map(category => ({
      label: category,
      targetId: `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
    }))
  ];
  // --- End of Sidebar data prep ---


  // The main layout is a flex container spanning the screen height
  return (
    <div className="flex h-screen">
      {/* Pass structured link data to Sidebar */}
      <Sidebar links={sidebarLinks} />
      {/* Pass fetched data to MainContent */}
      <MainContent jobBoards={jobBoards} />
      <RightSidebar />
    </div>
  );
}
