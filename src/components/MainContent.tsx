import React from "react"; // Import React

// Define the JobBoard interface (copied from page.tsx)
interface JobBoard {
  Category: string;
  Name: string;
  URL: string;
  Notes?: string;
}

// Helper component for rendering links with dark theme styling
const LinkItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    // Adjusted colors for dark theme readability
    className="text-cyan-400 hover:text-cyan-300 active:text-cyan-500 hover:underline font-medium break-words transition-colors duration-150"
  >
    {children}
  </a>
);


// Update MainContent props to accept jobBoards
export default function MainContent({ jobBoards }: { jobBoards: JobBoard[] }) {

  // Group job boards by category (logic moved from page.tsx)
  const groupedBoards: { [key: string]: JobBoard[] } = {};
  jobBoards.forEach(board => {
    const category = board.Category.trim();
    if (!groupedBoards[category]) {
      groupedBoards[category] = [];
    }
    groupedBoards[category].push(board);
  });

  // Define the order of categories, prioritizing Industry-Specific
  const categoryOrder = [
    "Industry-Specific Boards (Advertising/Marketing/Creative)",
    "General Job Boards",
    "Additional Resources",
    "International / Regional Boards"
 ];

  // Get sorted category keys
  const sortedCategories = Object.keys(groupedBoards).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });


  return (
    // Main content container: flex-1 to take remaining space, flex column layout, padding, overflow-y-auto for scrolling
    <div className="flex-1 flex flex-col bg-gray-950 text-gray-100 overflow-y-auto">
      <div className="flex-1 p-6">
        {/* Header, Metrics, Tabs sections removed */}

        {/* Job Search Tips Section - Moved to top, added ID */}
        <section id="helpful-tips" className="mb-8 bg-gray-900/50 p-5 md:p-6 rounded-lg shadow-md border border-gray-700 scroll-mt-16"> {/* Added scroll-mt for sticky header offset */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 border-b border-gray-600 pb-2 text-gray-200">Helpful Job Search Tips for Creatives (like Ella!)</h2>
          <div className="space-y-6 text-sm md:text-base text-gray-300">

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Your Resume & Cover Letter: Tell Your Story</h3>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">Think Visually (Resume):</strong> As a creative, your resume's design matters! Keep it clean, professional, and easy to read, but don't be afraid to let a touch of your personal style show (subtly!). Ensure it highlights skills relevant to *visual communication* and *advertising*.</li>
                <li><strong className="text-gray-300">Keywords are Key:</strong> Look at job descriptions for roles like 'Creative Assistant', 'Junior Art Director', or 'Marketing Coordinator'. Note the common skills and requirements (e.g., "campaign development", "social media content", "Adobe Creative Suite", "brand storytelling") and weave those keywords naturally into your resume and LinkedIn profile.</li>
                <li><strong className="text-gray-300">Quantify When Possible:</strong> Did a class project increase engagement? Did you manage a small budget for an event? Adding numbers (even estimates) makes your accomplishments more concrete.</li>
                <li><strong className="text-gray-300">Cover Letter = Connection:</strong> Don't just repeat your resume! Your cover letter is your chance to show personality, passion, and *why* you're excited about *this specific* role and company. Mention a campaign of theirs you admired or how their values align with yours. Explain how your creative skills can help *them*.</li>
                <li><strong className="text-gray-300">Proofread. Then Proofread Again:</strong> Typos or grammatical errors can undermine your professionalism, especially in communication-focused roles. Ask a friend or use a tool to double-check!</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Your Portfolio: Show, Don't Just Tell</h3>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">Curate Ruthlessly:</strong> Only include your absolute best work that's relevant to the jobs you want. It's better to have 3-5 strong, well-explained projects than 10 mediocre ones. Quality over quantity!</li>
                <li><strong className="text-gray-300">Context is Crucial:</strong> For each piece, briefly explain the 'brief' or objective, your thought process, the tools you used, and (if possible) the results or impact. Let them see *how* you think creatively.</li>
                <li><strong className="text-gray-300">Show Your Process (Optional but Great):</strong> Consider including sketches, early drafts, or mood boards for one or two projects to demonstrate your creative development process.</li>
                <li><strong className="text-gray-300">Keep it Updated:</strong> As you complete new projects (even personal ones or AI experiments!), add them to keep your portfolio fresh.</li>
              </ul>
            </div>

             <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Interviews: Shine with Strategy & Personality</h3>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">Research the Company & Role:</strong> Understand their recent work, their target audience, their brand voice, and the specific requirements of the job.</li>
                <li><strong className="text-gray-300">Prepare Your Story:</strong> Practice talking about your projects using the STAR method (Situation, Task, Action, Result). Be ready to explain your creative choices and how they solved the problem.</li>
                <li><strong className="text-gray-300">Ask Insightful Questions:</strong> Prepare 2-3 thoughtful questions about the role, the team, the company culture, or recent campaigns. This shows genuine interest.</li>
                <li><strong className="text-gray-300">Discuss Trends (Like AI):</strong> Be ready to talk briefly about how you see trends like AI impacting the creative field and how you're prepared to adapt and learn (reference the trends doc!).</li>
                <li><strong className="text-gray-300">Let Your Passion Show:</strong> They're hiring a creative person! Be enthusiastic, share your ideas (appropriately), and let your personality come through.</li>
              </ul>
            </div>

             <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Networking: Build Your Circle</h3>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">LinkedIn is Your Friend:</strong> Connect strategically (alumni, recruiters, people in roles you admire). Personalize connection requests. Engage thoughtfully with posts.</li>
                <li><strong className="text-gray-300">Informational Interviews:</strong> These are gold! Ask for brief chats to learn, not to ask for a job. People often enjoy sharing their experiences.</li>
                <li><strong className="text-gray-300">University Resources:</strong> Don't underestimate JMU's career services, alumni network, and events.</li>
              </ul>
            </div>

             <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Mindset: Stay Positive & Persistent</h3>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">It's a Process:</strong> Job searching takes time. Don't get discouraged by rejections – they happen to everyone. Learn from each application and interview.</li>
                <li><strong className="text-gray-300">Track Your Efforts:</strong> Keeping a simple log helps you stay organized and see your progress.</li>
                <li><strong className="text-gray-300">Celebrate Small Wins:</strong> Got an interview? Finished tailoring an application? Acknowledge your effort!</li>
                <li><strong className="text-gray-300">You Have Value:</strong> Remember your unique creative perspective, your skills, and your passion. You bring value!</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Action Plan Section - Now below Tips, added ID */}
        <section id="action-plan" className="mb-8 bg-gray-900/50 p-5 md:p-6 rounded-lg shadow-md border border-gray-700 scroll-mt-16"> {/* Added scroll-mt */}
           <h2 className="text-2xl md:text-3xl font-semibold mb-4 border-b border-gray-600 pb-2 text-gray-200">Ella's Job Search Action Plan</h2>
           <div className="space-y-4 text-sm md:text-base text-gray-300">
              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-200">Phase 1: Foundation & Profile Enhancement</h3>
              <ul className="list-disc list-outside pl-5 space-y-1 text-gray-400">
                 <li><strong className="text-gray-300">Refine LinkedIn:</strong> Optimize headline, summary (link portfolio!), skills, and project descriptions (use STAR method).</li>
                 <li><strong className="text-gray-300">Optimize Resume:</strong> Mirror LinkedIn, tailor summaries, use action verbs, quantify results, ensure clean design, include portfolio link.</li>
                 <li><strong className="text-gray-300">Polish Portfolio:</strong> Curate best work, add context (objective, role, process, results), check links & mobile view.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-200">Phase 2: Skill Development & Trend Alignment</h3>
               <ul className="list-disc list-outside pl-5 space-y-1 text-gray-400">
                 <li><strong className="text-gray-300">AI Awareness:</strong> Understand AI's impact (see trends doc), discuss familiarity, consider adding an AI-assisted project to portfolio.</li>
                 <li><strong className="text-gray-300">Emphasize Human Skills:</strong> Focus applications/interviews on creativity, strategy, storytelling, adaptability.</li>
                 <li><strong className="text-gray-300">Data Literacy Basics:</strong> Learn key marketing metrics (CTR, engagement) and how creative work impacts them.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-200">Phase 3: Targeted Job Search & Application</h3>
               <ul className="list-disc list-outside pl-5 space-y-1 text-gray-400">
                 <li>
                    <strong className="text-gray-300">Job Board Strategy:</strong> Focus on primary boards, supplement with others.
                    {/* Note: Priority Links display logic was removed previously, keep it removed or pass priorityBoards prop if needed */}
                 </li>
                 <li><strong className="text-gray-300">Target Roles:</strong> Junior Art Director, Creative Assistant, Marketing Coordinator, etc.</li>
                 <li><strong className="text-gray-300">Company Research:</strong> Identify & follow target companies/agencies on LinkedIn.</li>
                 <li><strong className="text-gray-300">Tailor Applications:</strong> Customize resume/cover letter for EACH application, use keywords.</li>
                 <li><strong className="text-gray-300">Track Progress:</strong> Use a spreadsheet or tool.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-200">Phase 4: Networking</h3>
               <ul className="list-disc list-outside pl-5 space-y-1 text-gray-400">
                 <li><strong className="text-gray-300">Active LinkedIn Use:</strong> Connect with recruiters, alumni, professionals; engage with content.</li>
                 <li><strong className="text-gray-300">Informational Interviews:</strong> Request brief chats to learn, not ask for jobs directly; send thank-yous.</li>
                 <li><strong className="text-gray-300">University Resources:</strong> Leverage JMU career fairs, alumni networks, advisors.</li>
              </ul>
           </div>
        </section>

        {/* Job Board List Section */}
        <div className="mt-8"> {/* Added margin-top */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center text-gray-200">Job Board List</h2>
          <div className="space-y-6 md:space-y-8">
            {sortedCategories.map((category) => {
              // Generate a URL-friendly ID for the category
              const categoryId = `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
              return (
                // Section styling for dark theme, added ID
                <section key={category} id={categoryId} className="bg-gray-900/50 p-5 md:p-6 rounded-lg shadow-md border border-gray-700 scroll-mt-16"> {/* Added scroll-mt */}
                  {/* Category heading styling */}
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 border-b border-gray-600 pb-2 text-gray-300">{category}</h3>
                  <ul className="space-y-3">
                  {groupedBoards[category].map((board, index) => (
                    // List item styling
                    <li key={`${category}-${index}-${board.Name}`} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                      <LinkItem href={board.URL}>{board.Name}</LinkItem>
                      {/* Notes styling */}
                      {board.Notes && board.Notes.trim() && (
                         <span className="text-xs md:text-sm text-gray-500 mt-1 sm:mt-0 sm:ml-4 italic text-right">({board.Notes.trim()})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
              ); // Added missing closing parenthesis and semicolon here
            })}
          </div>
        </div>

      </div>
       {/* Footer */}
       <footer className="mt-auto p-4 text-center text-gray-500 text-xs md:text-sm">
          Data sourced from job_boards.csv
       </footer>
    </div>
  );
}
