import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

interface JobBoard {
  Category: string;
  Name: string;
  URL: string;
  Notes?: string;
}

// Function to read and parse the CSV data (runs server-side)
async function getJobBoards(): Promise<JobBoard[]> {
  const csvFilePath = path.join(process.cwd(), 'src', 'data', 'job_boards.csv');
  try {
    const fileContent = fs.readFileSync(csvFilePath, 'utf8');
    const parsedData = Papa.parse<JobBoard>(fileContent, {
      header: true, // Use the first row as headers
      skipEmptyLines: true,
    });

    if (parsedData.errors.length > 0) {
      console.error("CSV Parsing Errors:", parsedData.errors);
      return [];
    }
    // Filter out any potential rows that didn't parse correctly into the expected structure
    return parsedData.data.filter(item => item.Category && item.Name && item.URL);
  } catch (error) {
    console.error("Error reading or parsing CSV file:", error);
    return [];
  }
}

// Helper component for rendering links with higher contrast hover and active states
const LinkItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    // Changed text colors for default, hover, and active states
    className="text-blue-600 hover:text-blue-800 active:text-blue-900 hover:underline font-medium break-words transition-colors duration-150"
  >
    {children}
  </a>
);

export default async function Home() {
  const jobBoards = await getJobBoards();

  // Group job boards by category
  const groupedBoards: { [key: string]: JobBoard[] } = {};
  jobBoards.forEach(board => {
    const category = board.Category.trim(); // Trim whitespace from category
    if (!groupedBoards[category]) {
      groupedBoards[category] = [];
    }
    groupedBoards[category].push(board);
  });

  // Define the order of categories for the main list
  const categoryOrder = [
    "General Job Boards",
    "Industry-Specific Boards (Advertising/Marketing/Creative)",
    "Additional Resources", // Includes tech, remote, startup, non-profit, gov
    "International / Regional Boards"
 ];

 // Get sorted category keys based on the defined order
 const sortedCategories = Object.keys(groupedBoards).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
 });

 // Identify Priority Job Boards for the Action Plan section
 const priorityBoardNames = [
    "LinkedIn",
    "Mediabistro",
    "Campaign Jobs", // Example, adjust based on actual plan emphasis
    "MarketingHire",
    "The Creative Ham",
    "AMA Job Board",
    "ilovecreatives",
    "Major Players",
    "Krop",
    "TalentZoo",
    "Ad Age Jobs"
 ];
 const priorityBoards = jobBoards.filter(board => priorityBoardNames.includes(board.Name));


  return (
    // Use white background and dark grey text for the main container
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-16 bg-white text-gray-800">
      <div className="w-full max-w-5xl">
        {/* Dark grey heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center text-gray-900">
          Job Search Resources & Action Plan
        </h1>

        {/* Encouraging Note - subtle grey background */}
        <div className="mb-8 p-4 bg-gray-100 border-l-4 border-gray-400 text-gray-700 rounded-md shadow-sm">
          <p className="font-semibold">A Note for Ella:</p>
          <p className="mt-1">
            Finding the right opportunity takes time and effort, but your skills and creativity in Advertising are valuable! Use these resources, stay persistent, tailor your applications, and believe in yourself. You've got this! ✨
          </p>
        </div>

        {/* Action Plan Section */}
        <section className="mb-8 md:mb-12 bg-gray-50 p-5 md:p-6 rounded-lg shadow-md border border-gray-200">
           <h2 className="text-2xl md:text-3xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800">Ella's Job Search Action Plan</h2>
           <div className="space-y-4 text-sm md:text-base text-gray-700">
              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-700">Phase 1: Foundation & Profile Enhancement</h3>
              <ul className="list-disc list-outside pl-5 space-y-1">
                 <li>**Refine LinkedIn:** Optimize headline, summary (link portfolio!), skills, and project descriptions (use STAR method).</li>
                 <li>**Optimize Resume:** Mirror LinkedIn, tailor summaries, use action verbs, quantify results, ensure clean design, include portfolio link.</li>
                 <li>**Polish Portfolio:** Curate best work, add context (objective, role, process, results), check links & mobile view.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-700">Phase 2: Skill Development & Trend Alignment</h3>
               <ul className="list-disc list-outside pl-5 space-y-1">
                 <li>**AI Awareness:** Understand AI's impact (see trends doc), discuss familiarity, consider adding an AI-assisted project to portfolio.</li>
                 <li>**Emphasize Human Skills:** Focus applications/interviews on creativity, strategy, storytelling, adaptability.</li>
                 <li>**Data Literacy Basics:** Learn key marketing metrics (CTR, engagement) and how creative work impacts them.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-700">Phase 3: Targeted Job Search & Application</h3>
               <ul className="list-disc list-outside pl-5 space-y-1">
                 <li>
                    **Job Board Strategy:** Focus on primary boards, supplement with others.
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                       <p className="font-semibold text-gray-600 mb-1">Priority Links:</p>
                       <ul className="list-disc list-outside pl-5 space-y-1 text-sm">
                          {priorityBoards.map(board => (
                             <li key={`priority-${board.Name}`}>
                                <LinkItem href={board.URL}>{board.Name}</LinkItem>
                                {board.Notes && board.Notes.trim() && <span className="ml-2 text-gray-500 italic">({board.Notes.trim()})</span>}
                             </li>
                          ))}
                          <li><span className="font-medium">JMU Career Services:</span> (Remember to check their specific portal!)</li>
                       </ul>
                    </div>
                 </li>
                 <li>**Target Roles:** Junior Art Director, Creative Assistant, Marketing Coordinator, etc.</li>
                 <li>**Company Research:** Identify & follow target companies/agencies on LinkedIn.</li>
                 <li>**Tailor Applications:** Customize resume/cover letter for EACH application, use keywords.</li>
                 <li>**Track Progress:** Use a spreadsheet or tool.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-700">Phase 4: Networking</h3>
               <ul className="list-disc list-outside pl-5 space-y-1">
                 <li>**Active LinkedIn Use:** Connect with recruiters, alumni, professionals; engage with content.</li>
                 <li>**Informational Interviews:** Request brief chats to learn, not ask for jobs directly; send thank-yous.</li>
                 <li>**University Resources:** Leverage JMU career fairs, alumni networks, advisors.</li>
              </ul>
           </div>
        </section>

        {/* Job Search Tips Section */}
        <section className="mb-8 md:mb-12 bg-gray-50 p-5 md:p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800">Helpful Job Search Tips for Creatives (like Ella!)</h2>
          <div className="space-y-6 text-sm md:text-base text-gray-700">

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Your Resume & Cover Letter: Tell Your Story</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li><strong>Think Visually (Resume):</strong> As a creative, your resume's design matters! Keep it clean, professional, and easy to read, but don't be afraid to let a touch of your personal style show (subtly!). Ensure it highlights skills relevant to *visual communication* and *advertising*.</li>
                <li><strong>Keywords are Key:</strong> Look at job descriptions for roles like 'Creative Assistant', 'Junior Art Director', or 'Marketing Coordinator'. Note the common skills and requirements (e.g., "campaign development", "social media content", "Adobe Creative Suite", "brand storytelling") and weave those keywords naturally into your resume and LinkedIn profile.</li>
                <li><strong>Quantify When Possible:</strong> Did a class project increase engagement? Did you manage a small budget for an event? Adding numbers (even estimates) makes your accomplishments more concrete.</li>
                <li><strong>Cover Letter = Connection:</strong> Don't just repeat your resume! Your cover letter is your chance to show personality, passion, and *why* you're excited about *this specific* role and company. Mention a campaign of theirs you admired or how their values align with yours. Explain how your creative skills can help *them*.</li>
                <li><strong>Proofread. Then Proofread Again:</strong> Typos or grammatical errors can undermine your professionalism, especially in communication-focused roles. Ask a friend or use a tool to double-check!</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Your Portfolio: Show, Don't Just Tell</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li><strong>Curate Ruthlessly:</strong> Only include your absolute best work that's relevant to the jobs you want. It's better to have 3-5 strong, well-explained projects than 10 mediocre ones. Quality over quantity!</li>
                <li>**Context is Crucial:** For each piece, briefly explain the 'brief' or objective, your thought process, the tools you used, and (if possible) the results or impact. Let them see *how* you think creatively.</li>
                <li>**Show Your Process (Optional but Great):** Consider including sketches, early drafts, or mood boards for one or two projects to demonstrate your creative development process.</li>
                <li>**Keep it Updated:** As you complete new projects (even personal ones or AI experiments!), add them to keep your portfolio fresh.</li>
              </ul>
            </div>

             <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Interviews: Shine with Strategy & Personality</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>**Research the Company & Role:** Understand their recent work, their target audience, their brand voice, and the specific requirements of the job.</li>
                <li>**Prepare Your Story:** Practice talking about your projects using the STAR method (Situation, Task, Action, Result). Be ready to explain your creative choices and how they solved the problem.</li>
                <li>**Ask Insightful Questions:** Prepare 2-3 thoughtful questions about the role, the team, the company culture, or recent campaigns. This shows genuine interest.</li>
                <li>**Discuss Trends (Like AI):** Be ready to talk briefly about how you see trends like AI impacting the creative field and how you're prepared to adapt and learn (reference the trends doc!).</li>
                <li>**Let Your Passion Show:** They're hiring a creative person! Be enthusiastic, share your ideas (appropriately), and let your personality come through.</li>
              </ul>
            </div>

             <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Networking: Build Your Circle</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>**LinkedIn is Your Friend:** Connect strategically (alumni, recruiters, people in roles you admire). Personalize connection requests. Engage thoughtfully with posts.</li>
                <li>**Informational Interviews:** These are gold! Ask for brief chats to learn, not to ask for a job. People often enjoy sharing their experiences.</li>
                <li>**University Resources:** Don't underestimate JMU's career services, alumni network, and events.</li>
              </ul>
            </div>

             <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Mindset: Stay Positive & Persistent</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>**It's a Process:** Job searching takes time. Don't get discouraged by rejections – they happen to everyone. Learn from each application and interview.</li>
                <li>**Track Your Efforts:** Keeping a simple log helps you stay organized and see your progress.</li>
                <li>**Celebrate Small Wins:** Got an interview? Finished tailoring an application? Acknowledge your effort!</li>
                <li>**You Have Value:** Remember your unique creative perspective, your skills, and your passion. You bring value!</li>
              </ul>
            </div>

          </div>
        </section>


        {/* Full Job Board List Section */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center text-gray-800 pt-4">Full Job Board List</h2>
        <div className="space-y-6 md:space-y-8">
          {sortedCategories.map((category) => (
            // Section with white background, subtle border and shadow
            <section key={category} className="bg-white p-5 md:p-6 rounded-lg shadow-md border border-gray-200">
              {/* Dark grey category heading, lighter grey border */}
              <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-700">{category}</h2>
              <ul className="space-y-3">
                {groupedBoards[category].map((board, index) => (
                  // Lighter grey border between list items
                  <li key={`${category}-${index}-${board.Name}`} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    {/* Use LinkItem component for consistent styling */}
                     <LinkItem href={board.URL}>{board.Name}</LinkItem>
                    {/* Lighter grey notes text */}
                    {board.Notes && board.Notes.trim() && (
                       <span className="text-xs md:text-sm text-gray-500 mt-1 sm:mt-0 sm:ml-4 italic text-right">({board.Notes.trim()})</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Lighter grey footer text */}
        <footer className="mt-10 md:mt-16 text-center text-gray-500 text-xs md:text-sm">
          Data sourced from job_boards.csv
        </footer>
      </div>
    </main>
  );
}
