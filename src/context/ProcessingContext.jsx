import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  mockQuizzes, 
  getMockPlagiarismData, 
  getMockComparisonData, 
  getMockGradingResults, 
  getMockReportData,
  getMockExtractedText,
  mockDashboardStats,
  mockRecentActivities,
  getMockQuizDetailsWithGrades
} from '../data/mockData';

// Create context
const ProcessingContext = createContext(null);

// Custom hook for using the context
export const useProcessing = () => {
  const context = useContext(ProcessingContext);
  if (!context) {
    throw new Error('useProcessing must be used within a ProcessingProvider');
  }
  return context;
};

// Provider component
export const ProcessingProvider = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  // Grade a quiz
  const gradeQuiz = useCallback(async (values) => {
    console.log('Grading quiz with values:', values);
    setIsProcessing(true);
    setError(null);
    
    try {
      // In a real app, this would call an API
      // For now, simulate API call with timeout
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockResults = getMockGradingResults(values);
          resolve(mockResults);
          setIsProcessing(false);
        }, 2000);
      });
    } catch (err) {
      setError(err.message || 'An error occurred during grading');
      setIsProcessing(false);
      throw err;
    }
  }, []);
  
  // Analyze plagiarism for a quiz
  const analyzePlagiarism = useCallback(async (quizId) => {
    console.log('Analyzing plagiarism for quiz ID:', quizId);
    setIsProcessing(true);
    setError(null);
    
    try {
      // In a real app, this would call an API
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockPlagiarismData = getMockPlagiarismData(quizId);
          resolve(mockPlagiarismData);
          setIsProcessing(false);
        }, 1000);
      });
    } catch (err) {
      setError(err.message || 'An error occurred during plagiarism analysis');
      setIsProcessing(false);
      throw err;
    }
  }, []);
  
  // Compare two submissions for detailed plagiarism analysis
  const compareSubmissions = useCallback(async (student1, matchName) => {
    console.log('Comparing submissions for:', student1, matchName);
    setIsProcessing(true);
    setError(null);
    
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const comparisonResult = getMockComparisonData(student1, matchName);
          resolve(comparisonResult);
          setIsProcessing(false);
        }, 800);
      });
    } catch (err) {
      setError(err.message || 'An error occurred during comparison');
      setIsProcessing(false);
      throw err;
    }
  }, []);
  
  // Extract text from an image (OCR)
  const extractTextFromImage = useCallback(async (image) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // In a real app, this would call an OCR API
      return new Promise((resolve) => {
        setTimeout(() => {
          const extractedText = getMockExtractedText();
          resolve(extractedText);
          setIsProcessing(false);
        }, 1000);
      });
    } catch (err) {
      setError(err.message || 'An error occurred during text extraction');
      setIsProcessing(false);
      throw err;
    }
  }, []);
  
  // Generate a report for grading or plagiarism
  const generateReport = useCallback(async (data, reportType) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const reportData = getMockReportData(data, reportType);
          resolve(reportData);
          setIsProcessing(false);
        }, 1500);
      });
    } catch (err) {
      setError(err.message || 'An error occurred while generating the report');
      setIsProcessing(false);
      throw err;
    }
  }, []);

  // Get quiz list
  const getQuizzes = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockQuizzes);
          setIsProcessing(false);
        }, 800);
      });
    } catch (err) {
      setError(err.message || 'Failed to load quizzes');
      setIsProcessing(false);
      throw err;
    }
  }, []);

  // Get dashboard stats
  const getStats = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockDashboardStats);
          setIsProcessing(false);
        }, 800);
      });
    } catch (err) {
      setError(err.message || 'Failed to load stats');
      setIsProcessing(false);
      throw err;
    }
  }, []);

  // Get recent activities
  const getActivities = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockRecentActivities);
          setIsProcessing(false);
        }, 800);
      });
    } catch (err) {
      setError(err.message || 'Failed to load activities');
      setIsProcessing(false);
      throw err;
    }
  }, []);

  // Get quiz details with grades
  const getQuizDetailsWithGrades = useCallback(async (quizId) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const details = getMockQuizDetailsWithGrades(quizId);
          resolve(details);
          setIsProcessing(false);
        }, 800);
      });
    } catch (err) {
      setError(err.message || 'Failed to load quiz details');
      setIsProcessing(false);
      throw err;
    }
  }, []);

  // Provide context value
  const contextValue = {
    isProcessing,
    error,
    gradeQuiz,
    analyzePlagiarism,
    compareSubmissions,
    extractTextFromImage,
    generateReport,
    getQuizzes,
    getStats,
    getActivities,
    getQuizDetailsWithGrades,
    clearError: () => setError(null)
  };

  return (
    <ProcessingContext.Provider value={contextValue}>
      {children}
    </ProcessingContext.Provider>
  );
};

export default ProcessingProvider;
