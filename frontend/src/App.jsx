import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Loading from './components/Loading'
import NotesSection from './components/NotesSection'
import { checkServerStatus, wakeUpServer } from './services/api'
import config from './config/config'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [serverStatus, setServerStatus] = useState('checking') // 'checking', 'active', 'inactive', 'failed'
  const [retryCount, setRetryCount] = useState(0)
  const [retryAttempts, setRetryAttempts] = useState(0)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        // First check if server is responding
        const isActive = await checkServerStatus()
        
        if (isActive) {
          setServerStatus('active')
          setIsLoading(false)
          return
        }

        // If not active, try to wake it up
        setServerStatus('inactive')
        setRetryAttempts(prev => prev + 1)

        // Send wake-up ping
        const wakeupSuccess = await wakeUpServer()

        // Try checking again after a delay to give server time to start
        setTimeout(async () => {
          const isNowActive = await checkServerStatus()
          
          if (isNowActive) {
            setServerStatus('active')
            setIsLoading(false)
          } else {
            // If we haven't exceeded max retries, try again automatically
            if (retryAttempts < config.server.maxRetries) {
              setRetryCount(prev => prev + 1) // This will trigger useEffect again
            } else {
              setServerStatus('failed')
              // Keep loading screen on with manual retry option
            }
          }
        }, config.server.retryInterval) 
        
      } catch (error) {
        console.error('Error checking backend status:', error)
        setServerStatus('failed')
      }
    }

    checkBackendStatus()
  }, [retryCount, retryAttempts]) 

  const handleRetryConnect = () => {
    setServerStatus('checking')
    setRetryAttempts(0)
    setRetryCount(prev => prev + 1) 
  }

  const handleSubjectClick = (subject, year, semester) => {
    setSelectedSubject(subject)
    setSelectedYear(year)
    setSelectedSemester(semester)
    // Wait for state update and DOM to render before scrolling
    setTimeout(() => {
      const notesSection = document.getElementById('notes-section')
      if (notesSection) {
        notesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Loading 
        isLoading={isLoading} 
        serverStatus={serverStatus} 
        onRetryConnect={handleRetryConnect}
        retryAttempts={retryAttempts}
        maxRetries={config.server.maxRetries}
      />
      
      {/* Hero Section */}
      <section id="home" className="hello">
        <div className="hello-content">
          <h1>Welcome to Notely <span className="emoji">📚</span></h1>
          <p>
            Notely is a simple, easy notes app for KTU Students. <br />
            Students can access their engineering notes semester-wise, <br />
            department-wise, and also previous year & internal exam question papers.
          </p>
          <button 
            onClick={() => scrollToSection('year-section')} 
            className="btn primary-btn"
          >
            Explore Notes <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="hello-image">
          <div className="floating-emoji">🧠</div>
          <div className="floating-emoji">💻</div>
          <div className="floating-emoji">🗒️</div>
          <div className="floating-emoji">🎓</div>
        </div>
      </section>

      {/* Year Section */}
      <section id="year-section" className="year-section">
        <h2>Select Your Year</h2>
        <div className="card-container">
          {[1, 2, 3, 4].map((year) => (
            <button 
              key={year} 
              className="year-card"
              onClick={() => scrollToSection(`year-${year}-subjects`)}
            >
              {year}{getOrdinalSuffix(year)} Year
            </button>
          ))}
        </div>
      </section>

      {/* 1st Year Notes Section */}
      <section id="year-1-subjects" className="notes-section">
        <h2>1st Year Subjects 📁</h2>
        <div className="notes-container">
          {['Physics', 'Chemistry', 'Mathematics', 'Basics of Electrical', 'Engineering Graphics', 'Basics of Civil/Mechanical'].map((subject) => (
            <div 
              key={subject} 
              className="notes-card clickable"
              onClick={() => handleSubjectClick(subject, 1, 1)}
            >
              {subject}
            </div>
          ))}
        </div>
      </section>

      {/* 2nd Year Notes Section */}
      <section id="year-2-subjects" className="notes-section">
        <h2>2nd Year Subjects 📁</h2>
        
        {/* Common Subjects */}
        <div className="semester-section">
          <h3>Common Subjects (S3 & S4)</h3>
          <div className="notes-container">
            {['Design and Engineering', 'Professional Ethics'].map((subject) => (
              <div 
                key={subject} 
                className="notes-card clickable"
                onClick={() => handleSubjectClick(subject, 2, 3)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>

        {/* Semester 3 */}
        <div className="semester-section">
          <h3>Semester 3 (S3)</h3>
          <div className="notes-container">
            {[
              'Discrete Mathematical Structures (DMS)',
              'Data Strcutures',
              'Logic System Design',
              'OOPS in JAVA',
              'Sustainable Engineering'
            ].map((subject) => (
              <div 
                key={subject} 
                className="notes-card clickable"
                onClick={() => handleSubjectClick(subject, 2, 3)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
          
        {/* Semester 4 */}
        <div className="semester-section">
          <h3>Semester 4 (S4)</h3>
          <div className="notes-container">
            {[
              'Computer Organization & Architecture (COA)',
              'Graph Theory',
              'DBMS',
              'Operating Systems (OS)',
              'Constitution of India'
            ].map((subject) => (
              <div 
                key={subject} 
                className="notes-card clickable"
                onClick={() => handleSubjectClick(subject, 2, 4)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3rd Year Notes Section */}
      <section id="year-3-subjects" className="notes-section">
        <h2>3rd Year Subjects 📁</h2>
        
        {/* Semester 5 */}
        <div className="semester-section">
          <h3>Semester 5 (S5)</h3>
          <div className="notes-container">
            {[
              'Formal Languages and Automata Theory',
              'Computer Networks',
              'System Software',
              'Microprocessors and Microcontrollers	',
              'Management of Software Systems',
              'Disaster Management'
            ].map((subject) => (
              <div 
                key={subject} 
                className="notes-card clickable"
                onClick={() => handleSubjectClick(subject, 3, 5)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>

        {/* Semester 6 */}
        <div className="semester-section">
          <h3>Semester 6 (S6)</h3>
          <div className="notes-container">
            {[
              'Compiler Design',
              'Computer Graphics And Image Processing',
              'Algorithm Analysis And Design',
              'Elective - I',
              'Industrial Economics And Foreign Trade'
            ].map((subject) => (
              <div 
                key={subject} 
                className="notes-card clickable"
                onClick={() => handleSubjectClick(subject, 3, 6)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4th Year Notes Section */}
      <section id="year-4-subjects" className="notes-section">
        <h2>4th Year Subjects 📁</h2>
        
        {/* Semester 7 */}
        <div className="semester-section">
          <h3>Semester 7 (S7)</h3>
          <div className="notes-container">
            {[
              'Artificial Intelligence',
              'Compiler Lab',
              'Program Elective II',
              'Open Elective',
              'VAC S7'
            ].map((subject) => (
              <div 
                key={subject} 
                className="notes-card clickable"
                onClick={() => handleSubjectClick(subject, 4, 7)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>

        {/* Semester 8 */}
        <div className="semester-section">
          <h3>Semester 8 (S8)</h3>
          <div className="notes-container">
            {[
              'DISTRIBUTED COMPUTING',
              'Project Phare II',
              'PROGRAM ELECTIVE III',
              'PROGRAM ELECTIVE IV',
              'PROGRAM ELECTIVE V'
            ].map((subject) => (
              <div 
                key={subject} 
                className="notes-card clickable"
                onClick={() => handleSubjectClick(subject, 4, 8)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes Section */}
      {selectedSubject && (
        <section id="notes-section" className="notes-section">
          <NotesSection 
            subject={selectedSubject}
            year={selectedYear}
            semester={selectedSemester}
          />
        </section>
      )}
    </>
  )
}

function getOrdinalSuffix(num) {
  const j = num % 10,
        k = num % 100;
  if (j == 1 && k != 11) {
    return "st";
  }
  if (j == 2 && k != 12) {
    return "nd";
  }
  if (j == 3 && k != 13) {
    return "rd";
  }
  return "th";
}

export default App
