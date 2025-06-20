import { useState } from "react";
import { BriefcaseIcon } from "lucide-react";
import { JobCard, JobDetails } from "../../components/index.js";

function Vacancy() {
  const [isRegistered] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      description:
        "Join our dynamic team building next-generation web applications.",
      posted: "2 days ago",
      logo: "https://images.unsplash.com/photo-1549421263-6064833b071b?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 2,
      title: "Product Design Lead",
      company: "Creative Minds Inc",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $140k",
      description:
        "Lead our product design team and shape the future of our digital products.",
      posted: "1 day ago",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $170k",
      description:
        "Manage and improve our cloud infrastructure and deployment pipelines.",
      posted: "3 days ago",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 4,
      title: "AI Research Scientist",
      company: "Future AI",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140k - $180k",
      description: "Research and develop cutting-edge AI solutions.",
      posted: "1 week ago",
      logo: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppWorks",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100k - $130k",
      description: "Create innovative mobile applications for iOS and Android.",
      posted: "4 days ago",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 6,
      title: "Data Engineer",
      company: "DataFlow Analytics",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$115k - $145k",
      description: "Build and maintain our data infrastructure and pipelines.",
      posted: "2 weeks ago",
      logo: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 7,
      title: "UX Researcher",
      company: "User First Design",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Conduct user research to improve our product experience.",
      posted: "5 days ago",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 8,
      title: "Backend Engineer",
      company: "ServerPro",
      location: "Denver, CO",
      type: "Full-time",
      salary: "$125k - $155k",
      description: "Develop and scale our backend services.",
      posted: "1 week ago",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 9,
      title: "Security Engineer",
      company: "SecureNet",
      location: "Washington, DC",
      type: "Full-time",
      salary: "$135k - $165k",
      description: "Protect our systems and implement security best practices.",
      posted: "3 days ago",
      logo: "https://images.unsplash.com/photo-1550177997-598e3c059d31?auto=format&fit=crop&w=64&h=64",
    },
    {
      id: 10,
      title: "Frontend Developer",
      company: "WebCraft",
      location: "Portland, OR",
      type: "Full-time",
      salary: "$95k - $125k",
      description: "Create beautiful and responsive user interfaces.",
      posted: "6 days ago",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=64&h=64",
    },
  ];

  const handleViewDetails = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Featured Jobs</h1>
          {isRegistered && (
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <BriefcaseIcon className="h-5 w-5 mr-2" />
              Post a Job
            </button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
          ))}
        </div>
      </div>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          isRegistered={isRegistered}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}

export default Vacancy;
