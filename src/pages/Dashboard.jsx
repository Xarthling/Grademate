import React from 'react';
import Layout from '../components/ui/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, description, trend, trendValue }) => (
  <Card className="h-full hover:shadow-medium transition-shadow duration-200" hoverable>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-600">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-neutral-900">{value}</p>
        {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
        {trend && (
          <div className={`mt-2 flex items-center text-sm ${
            trend === 'up' ? 'text-success-600' : 'text-danger-600'
          }`}>
            <span className="mr-1">{trend === 'up' ? '↑' : '↓'}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="text-3xl text-neutral-400">{icon}</div>
    </div>
  </Card>
);

const RecentActivity = ({ activities }) => (
  <Card title="Recent Activities" className="h-full">
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
          <div className="text-xl p-2 bg-neutral-100 rounded-md">{activity.icon}</div>
          <div>
            <h4 className="font-medium text-neutral-800">{activity.title}</h4>
            <p className="text-sm text-neutral-500">{activity.description}</p>
            <p className="text-xs text-neutral-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { 
      title: 'Total Quizzes', 
      value: '24', 
      icon: '📚', 
      description: '6 this month', 
      trend: 'up', 
      trendValue: '15% from last month'
    },
    { 
      title: 'Graded', 
      value: '18', 
      icon: '✅', 
      description: '75% completion',
      trend: 'up', 
      trendValue: '12% from last month'
    },
    { 
      title: 'Pending', 
      value: '6', 
      icon: '⏱️', 
      description: 'Need attention',
      trend: 'down', 
      trendValue: '3 less than last month'
    },
    { 
      title: 'Plagiarism Detected', 
      value: '3', 
      icon: '🔍', 
      description: 'Across 2 quizzes',
      trend: 'down', 
      trendValue: '2 less than last month'
    },
  ];

  const recentActivities = [
    {
      icon: '📝',
      title: 'Math Quiz 101 - Grade Updated',
      description: 'You updated grades for 12 students.',
      time: '2 hours ago'
    },
    {
      icon: '🔍',
      title: 'Plagiarism Check Complete',
      description: 'History Quiz: 2 instances of plagiarism detected',
      time: '1 day ago'
    },
    {
      icon: '🔄',
      title: 'Solution Updated',
      description: 'Physics Quiz: Updated solution key for question #5',
      time: '2 days ago'
    },
  ];

  const recentQuizzes = [
    { title: 'Math Quiz 101', date: 'Apr 10, 2025', students: 24, graded: 24, plagiarism: 0 },
    { title: 'History Essay', date: 'Apr 5, 2025', students: 22, graded: 22, plagiarism: 2 },
    { title: 'Physics Midterm', date: 'Mar 28, 2025', students: 26, graded: 26, plagiarism: 1 },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">Welcome back! Here's what's happening with your classes.</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Quizzes */}
          <div className="lg:col-span-2">
            <Card title="Recent Quizzes" className="h-full">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Quiz</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Students</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {recentQuizzes.map((quiz, index) => (
                      <tr key={index} className="hover:bg-neutral-50 transition-colors duration-150">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-neutral-800">{quiz.title}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-500">{quiz.date}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-800">{quiz.students}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {quiz.graded === quiz.students ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">Completed</span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-800">In Progress</span>
                          )}
                          {quiz.plagiarism > 0 && (
                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-danger-100 text-danger-800">{quiz.plagiarism} Plagiarism</span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to="/grading" className="text-primary-600 hover:text-primary-700 mr-3">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 text-right">
                <Button variant="outline" onClick={() => {}}>View All Quizzes</Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-medium transition-shadow duration-200" hoverable>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">Grade New Quiz</h3>
                <p className="mt-1 text-sm text-neutral-500">Upload student submissions and a solution key to grade a new quiz.</p>
              </div>
              <Link to="/grading">
                <Button variant="primary">Grade Now</Button>
              </Link>
            </div>
          </Card>
          
          <Card className="hover:shadow-medium transition-shadow duration-200" hoverable>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">Plagiarism Check</h3>
                <p className="mt-1 text-sm text-neutral-500">Check for similarities between student submissions.</p>
              </div>
              <Link to="/plagiarism">
                <Button variant="primary">Check Now</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;