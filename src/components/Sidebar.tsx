import React from "react"; // Import React
import { Briefcase, List, BookOpen, Globe, HelpCircle, Target } from "lucide-react"; // Added HelpCircle, Target

// Define the structure for each link item
interface SidebarLink {
  label: string;
  targetId: string;
}

// Define props for Sidebar component, now accepting 'links'
interface SidebarProps {
  links: SidebarLink[];
}

// Helper function to get an icon based on label name
const getLinkIcon = (label: string) => {
  const lowerCaseLabel = label.toLowerCase();
  if (lowerCaseLabel.includes("helpful tips")) {
    return <HelpCircle className="h-5 w-5" />;
  }
  if (lowerCaseLabel.includes("action plan")) {
    return <Target className="h-5 w-5" />;
  }
  if (lowerCaseLabel.includes("industry-specific") || lowerCaseLabel.includes("advertising")) {
    return <Briefcase className="h-5 w-5" />;
  }
  if (lowerCaseLabel.includes("general")) {
    return <List className="h-5 w-5" />;
  }
  if (lowerCaseLabel.includes("international") || lowerCaseLabel.includes("regional")) {
    return <Globe className="h-5 w-5" />;
  }
  // Default icon for other categories like "Additional Resources"
  return <BookOpen className="h-5 w-5" />;
};

export default function Sidebar({ links }: SidebarProps) {
  return (
    // Sidebar container styling
    <div className="w-60 border-r border-gray-800 p-4 flex flex-col bg-gray-950 text-gray-100">
      <div className="space-y-1 flex-1">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sections</div>
        {links.map((link) => (
          // Render each item as an anchor link
          <a
            key={link.targetId}
            href={`#${link.targetId}`} // Standard HTML anchor link
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800/50`}
            // Add smooth scrolling behavior via CSS if desired (in globals.css: html { scroll-behavior: smooth; })
          >
            {getLinkIcon(link.label)}
            <span className="text-sm">{link.label}</span>
          </a>
        ))}
      </div>
      {/* Can add back System Status or other elements here if needed */}
    </div>
  );
}
