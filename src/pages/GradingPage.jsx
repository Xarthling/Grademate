import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/ui/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

const GradingSchema = Yup.object().shape({
  quizName: Yup.string().required('Quiz name is required'),
  logicWeight: Yup.number()
    .min(0, 'Weight must be at least 0')
    .max(1, 'Weight must be at most 1')
    .required('Logic weight is required'),
  similarityThreshold: Yup.number()
    .min(0, 'Threshold must be at least 0')
    .max(1, 'Threshold must be at most 1')
    .required('Similarity threshold is required'),
  solutionImage: Yup.mixed().required('Solution image is required'),
  studentSubmissions: Yup.array().of(
    Yup.object().shape({
      studentName: Yup.string().required('Student name is required'),
      image: Yup.mixed().required('Student submission image is required'),
    })
  ).min(1, 'At least one student submission is required'),
});

const GradingPage = () => {
  const [gradingResults, setGradingResults] = useState(null);
  const [isGrading, setIsGrading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsGrading(true);
    console.log('Grading values:', values);
    
    setTimeout(() => {
      const mockResults = {
        quizName: values.quizName,
        totalStudents: values.studentSubmissions.length,
        averageScore: 82.5,
        solutionImage: values.solutionImage,
        solutionImageText: 'Mock extracted text from solution image',
        students: values.studentSubmissions.map((submission, index) => ({
          id: index + 1,
          name: submission.studentName,
          image: submission.image,
          score: Math.floor(Math.random() * 31) + 70,
          similarity: Math.random().toFixed(2),
          plagiarismFlag: Math.random() > 0.8,
          extractedText: 'Mock extracted text from student submission',
          feedback: [
            { question: 1, correct: true, points: 10, feedback: 'Correct solution' },
            { question: 2, correct: Math.random() > 0.5, points: Math.random() > 0.5 ? 10 : 5, feedback: 'Partial credit given' },
            { question: 3, correct: Math.random() > 0.5, points: Math.random() > 0.5 ? 10 : 0, feedback: 'Incorrect approach' },
          ]
        })),
      };
      
      setGradingResults(mockResults);
      setSelectedStudent(mockResults.students[0]);
      setIsGrading(false);
      setSubmitting(false);
    }, 2000);
  };

  const renderGradingResults = () => {
    if (!gradingResults) return null;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">Grading Results: {gradingResults.quizName}</h2>
          <p className="mt-1 text-sm text-neutral-500">
            {gradingResults.totalStudents} submissions graded • Average score: {gradingResults.averageScore.toFixed(1)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Student Results" className="lg:col-span-1">
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {gradingResults.students.map((student) => (
                <div 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedStudent?.id === student.id 
                      ? 'bg-primary-50 border-l-4 border-primary-500' 
                      : 'hover:bg-neutral-50 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-neutral-800 truncate">{student.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-neutral-500 mr-3">Score: {student.score}/100</span>
                        {student.plagiarismFlag && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-danger-100 text-danger-800 inline-block">
                            Plagiarism
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-2xl flex-shrink-0 ml-2">{student.score >= 90 ? '🌟' : student.score >= 80 ? '👍' : '🔄'}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {selectedStudent && (
            <div className="lg:col-span-2 space-y-6">
              <Card title="Grading Preview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-neutral-700 mb-2">Solution</h3>
                    <div className="border border-neutral-200 rounded-md overflow-hidden bg-neutral-50 p-4 h-[300px] flex items-center justify-center">
                      {gradingResults.solutionImage ? (
                        <div className="text-center w-full h-full flex flex-col items-center justify-center">
                          <div className="bg-neutral-100 rounded-md p-6 w-full h-full flex flex-col items-center justify-center">
                            <p className="text-neutral-600 text-sm">Solution Image Preview</p>
                            <p className="text-xs text-neutral-500 mt-1">(Image would be displayed here)</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-neutral-500">No solution image available</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium text-primary-700">OCR Extracted Text (Solution)</h4>
                      <div className="p-3 border border-primary-200 rounded-md bg-primary-50">
                        <p className="text-sm text-neutral-600 break-words">
                          {gradingResults.solutionImageText || 'No text extracted from the solution image.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-neutral-700 mb-2">Student Submission</h3>
                    <div className="border border-neutral-200 rounded-md overflow-hidden bg-neutral-50 p-4 h-[300px] flex items-center justify-center">
                      {selectedStudent.image ? (
                        <div className="text-center w-full h-full flex flex-col items-center justify-center">
                          <div className="bg-neutral-100 rounded-md p-6 w-full h-full flex flex-col items-center justify-center">
                            <p className="text-neutral-600 text-sm">Student Submission Preview</p>
                            <p className="text-xs text-neutral-500 mt-1">(Image would be displayed here)</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-neutral-500">No submission image available</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium text-primary-700">OCR Extracted Text (Submission)</h4>
                      <div className="p-3 border border-primary-200 rounded-md bg-primary-50">
                        <p className="text-sm text-neutral-600 break-words">
                          {selectedStudent.extractedText || 'No text extracted from the student submission.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-neutral-100 pt-4">
                  <h3 className="font-medium text-neutral-700 mb-3">Detailed Feedback</h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {selectedStudent.feedback.map((item, index) => (
                      <div key={index} className="flex items-start p-3 border border-neutral-100 rounded-md">
                        <div className={`mr-3 p-1 rounded-full flex-shrink-0 ${item.correct ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'}`}>
                          {item.correct ? '✓' : '✗'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h4 className="font-medium text-neutral-800">Question {item.question}</h4>
                            <span className="ml-3 text-sm text-neutral-500">{item.points} points</span>
                          </div>
                          <p className="text-sm text-neutral-600 mt-1 break-words">{item.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Clear Selection
                </Button>
                <Button variant="primary" onClick={() => {}}>
                  Edit Grading
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="secondary" onClick={() => setGradingResults(null)}>
            Grade Another Quiz
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Export Results
          </Button>
        </div>
      </div>
    );
  };

  const renderGradingForm = () => (
    <Card title="Grade a New Quiz">
      <Formik
        initialValues={{
          quizName: '',
          logicWeight: 0.7,
          similarityThreshold: 0.8,
          solutionImage: null,
          studentSubmissions: [],
        }}
        validationSchema={GradingSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="quizName"
                name="quizName"
                label="Quiz Name"
                placeholder="e.g., Math Quiz 101"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quizName}
                error={errors.quizName}
                touched={touched.quizName}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="logicWeight"
                name="logicWeight"
                type="slider"
                label="Logic Weight"
                helperText="How much weight to give to logical structure vs. exact wording (0-1)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.logicWeight}
                error={errors.logicWeight}
                touched={touched.logicWeight}
                required
                min="0"
                max="1"
                step="0.1"
              />

              <InputField
                id="similarityThreshold"
                name="similarityThreshold"
                type="slider"
                label="Similarity Threshold"
                helperText="Threshold for flagging potential plagiarism (0-1)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.similarityThreshold}
                error={errors.similarityThreshold}
                touched={touched.similarityThreshold}
                required
                min="0"
                max="1"
                step="0.1"
              />
            </div>

            <div>
              <InputField
                id="solutionImage"
                name="solutionImage"
                type="file"
                label="Solution Image"
                helperText="Upload an image of the quiz solution"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue('solutionImage', event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                error={errors.solutionImage}
                touched={touched.solutionImage}
                value={values.solutionImage}
                required
              />
              
              {values.solutionImage && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Solution Preview
                  </label>
                  <div className="border border-neutral-200 rounded-md overflow-hidden bg-neutral-50 p-4 h-[200px] flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(values.solutionImage)}
                      alt="Solution Preview"
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 text-red-400"
                    onClick={() => setFieldValue('solutionImage', null)}
                  >
                    X Remove Solution Image
                  </Button>
                </div>
              )}
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <h3 className="text-lg font-medium text-neutral-800 mb-4">Student Submissions</h3>

              <div className="space-y-4">
                <InputField
                  id="batchUpload"
                  name="batchUpload"
                  type="file"
                  label="Batch Upload Images"
                  helperText="Upload all student submission images at once"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.currentTarget.files);
                    const submissions = files.map((file) => ({
                      studentName: '',
                      image: file,
                    }));
                    setFieldValue('studentSubmissions', submissions);
                  }}
                />

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {values.studentSubmissions.map((submission, index) => (
                    <div key={index} className="p-4 border border-neutral-200 rounded-md bg-neutral-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          id={`studentSubmissions.${index}.studentName`}
                          name={`studentSubmissions.${index}.studentName`}
                          label="Student Name"
                          placeholder="e.g., John Doe"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.studentSubmissions[index].studentName}
                          error={
                            errors.studentSubmissions &&
                            errors.studentSubmissions[index] &&
                            errors.studentSubmissions[index].studentName
                          }
                          touched={
                            touched.studentSubmissions &&
                            touched.studentSubmissions[index] &&
                            touched.studentSubmissions[index].studentName
                          }
                          required
                        />

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Uploaded Image
                          </label>
                          <div className="border border-neutral-200 rounded-md overflow-hidden bg-neutral-50 p-4 h-[150px] flex items-center justify-center">
                            <img
                              src={URL.createObjectURL(submission.image)}
                              alt={`Student Submission ${index + 1}`}
                              className="max-h-full max-w-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-2  text-red-400"
                            onClick={() => {
                              const updatedSubmissions = [...values.studentSubmissions];
                              updatedSubmissions.splice(index, 1);
                              setFieldValue('studentSubmissions', updatedSubmissions);
                            }}
                          >
                            Remove Student Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || isGrading}
              >
                {isGrading ? 'Grading...' : 'Start Grading'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800">Quiz Grading</h1>
          <p className="mt-1 text-sm text-neutral-500">Upload student submissions and a solution to grade quizzes automatically.</p>
        </div>
        
        {gradingResults ? renderGradingResults() : renderGradingForm()}
      </div>
    </Layout>
  );
};

export default GradingPage;