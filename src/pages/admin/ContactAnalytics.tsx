import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ExternalLink,
  Download,
  Trash2,
  Star,
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  Eye,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import PortfolioManager from "@/lib/portfolio-manager";
import { PersonalInfo, SocialLinks } from "@/types/portfolio";

// Mock contact data - In a real app, this would come from a database
const mockContactData = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subject: "Collaboration Opportunity",
    message:
      "Hi Darshan, I came across your portfolio and was impressed by your projects. Would you be interested in collaborating on a web development project?",
    timestamp: "2024-06-07T10:30:00Z",
    source: "portfolio",
    read: true,
  },
  {
    id: "2",
    name: "Tech Recruiter",
    email: "recruiting@techcorp.com",
    subject: "Internship Opportunity",
    message:
      "Hello, we have an exciting internship opportunity for talented developers like you. Are you open to discussing this further?",
    timestamp: "2024-06-06T14:15:00Z",
    source: "portfolio",
    read: false,
  },
  {
    id: "3",
    name: "John Smith",
    email: "john.smith@startup.io",
    subject: "Freelance Project",
    message:
      "Looking for a skilled React developer for a short-term project. Your portfolio shows exactly what we need!",
    timestamp: "2024-06-05T09:45:00Z",
    source: "portfolio",
    read: true,
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@university.edu",
    subject: "Study Group Invitation",
    message:
      "Fellow CS student here! Would you like to join our coding study group?",
    timestamp: "2024-06-04T16:20:00Z",
    source: "linkedin",
    read: true,
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex.chen@devcompany.com",
    subject: "Open Source Contribution",
    message:
      "Saw your GitHub profile. Interested in contributing to our open source project?",
    timestamp: "2024-06-03T11:10:00Z",
    source: "github",
    read: false,
  },
];

const ContactAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [contacts] = useState(mockContactData);
  const [selectedTimeRange, setSelectedTimeRange] = useState("7");

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setPersonalInfo(manager.getPersonalInfo());
    setSocialLinks(manager.getSocialLinks());
  }, []);

  // Analytics calculations
  const totalContacts = contacts.length;
  const unreadContacts = contacts.filter((c) => !c.read).length;
  const thisWeekContacts = contacts.filter((c) => {
    const contactDate = new Date(c.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return contactDate >= weekAgo;
  }).length;

  const contactSources = contacts.reduce(
    (acc, contact) => {
      acc[contact.source] = (acc[contact.source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const timeRanges = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 3 months" },
    { value: "all", label: "All time" },
  ];

  const getFilteredContacts = () => {
    if (selectedTimeRange === "all") return contacts;

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(selectedTimeRange));

    return contacts.filter((c) => new Date(c.timestamp) >= daysAgo);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "portfolio":
        return Mail;
      case "linkedin":
        return Users;
      case "github":
        return ExternalLink;
      default:
        return MessageSquare;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "portfolio":
        return "from-blue-400 to-cyan-400";
      case "linkedin":
        return "from-blue-600 to-blue-400";
      case "github":
        return "from-gray-600 to-gray-400";
      default:
        return "from-purple-400 to-pink-400";
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Contact Analytics
          </h1>
          <p className="text-gray-400">
            Track visitor engagement and contact inquiries
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Mail className="text-black" size={24} />
              </div>
              <TrendingUp className="text-green-400" size={20} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {totalContacts}
            </div>
            <div className="text-sm text-gray-400">Total Contacts</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <MessageSquare className="text-black" size={24} />
              </div>
              {unreadContacts > 0 && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {unreadContacts}
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {unreadContacts}
            </div>
            <div className="text-sm text-gray-400">Unread Messages</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                <Calendar className="text-black" size={24} />
              </div>
              <TrendingUp className="text-green-400" size={20} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {thisWeekContacts}
            </div>
            <div className="text-sm text-gray-400">This Week</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Eye className="text-black" size={24} />
              </div>
              <TrendingUp className="text-green-400" size={20} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">1,247</div>
            <div className="text-sm text-gray-400">Portfolio Views</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Contact Sources
            </h3>
            <div className="space-y-4">
              {Object.entries(contactSources).map(([source, count]) => {
                const IconComponent = getSourceIcon(source);
                const percentage = Math.round((count / totalContacts) * 100);

                return (
                  <div
                    key={source}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${getSourceColor(source)} rounded-lg flex items-center justify-center`}
                      >
                        <IconComponent className="text-black" size={16} />
                      </div>
                      <span className="text-gray-300 capitalize">{source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{count}</div>
                      <div className="text-xs text-gray-400">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Your Contact Information
              </h3>
              <button
                onClick={() => navigate("/admin/about")}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
              >
                <span>Edit</span>
                <ExternalLink size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                  <Mail className="text-blue-400" size={20} />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400 text-sm">
                      {personalInfo?.email}
                    </div>
                  </div>
                </div>

                {personalInfo?.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                    <Phone className="text-green-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Phone</div>
                      <div className="text-gray-400 text-sm">
                        {personalInfo.phone}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-medium">Social Links</h4>
                {socialLinks?.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>GitHub</span>
                  </a>
                )}
                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Users size={16} />
                    <span>LinkedIn</span>
                  </a>
                )}
                {socialLinks?.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <MessageSquare size={16} />
                    <span>Twitter</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">
              Recent Messages
            </h3>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50 transition-colors"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {getFilteredContacts().map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  contact.read
                    ? "bg-gray-900/30 border-gray-700/50"
                    : "bg-blue-600/10 border-blue-600/30"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-white font-medium">{contact.name}</h4>
                      {!contact.read && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      )}
                      <div
                        className={`px-2 py-1 rounded text-xs ${getSourceColor(contact.source)} bg-gradient-to-r text-black font-medium`}
                      >
                        {contact.source}
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      {contact.email}
                    </div>
                    <div className="text-white font-medium mb-2">
                      {contact.subject}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {contact.message}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs flex items-center space-x-1">
                    <Clock size={12} />
                    <span>
                      {new Date(contact.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {getFilteredContacts().length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
              <p>No messages in this time period</p>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default ContactAnalytics;
