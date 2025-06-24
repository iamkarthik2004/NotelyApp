import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hello">
        <div className="hello-content">
          <h1>Welcome to Notely <span className="emoji">📚</span></h1>
          <p>
            Notely is a simple, easy notes app for KTU Students. <br />
            Students can access their engineering notes semester-wise, <br />
            department-wise, and also previous year & internal exam question papers.
          </p>
          <a href="#notes" className="btn primary-btn">
            Explore Notes <i className="fas fa-arrow-right"></i>
          </a>
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
          <a href="#first-year" className="year-card">1st Year</a>
          <a href="#second-year" className="year-card">2nd Year</a>
          <a href="#third-year" className="year-card">3rd Year</a>
          <a href="#fourth-year" className="year-card">4th Year</a>
        </div>
      </section>

      {/* 1st Year Notes Section */}
      <section id="first-year" className="notes-section">
        <h2>1st Year Subjects 📁</h2>
        <div className="notes-container">
          <div className="notes-card">Physics</div>
          <div className="notes-card">Chemistry</div>
          <div className="notes-card">Mathematics</div>
          <div className="notes-card">Basics of Electrical</div>
          <div className="notes-card">Engineering Graphics</div>
          <div className="notes-card">Basics of Civil/Mechanical</div>
        </div>
      </section>

      {/* 2nd Year Notes Section */}
      <section id="second-year" className="notes-section">
        <h2>2nd Year Subjects 📁</h2>
        
        {/* Common Subjects */}
        <div className="semester-section">
          <h3>Common Subjects (S3 & S4)</h3>
          <div className="notes-container">
            <div className="notes-card">Design and Engineering</div>
            <div className="notes-card">Professional Ethics</div>
          </div>
        </div>

        {/* Semester 3 */}
        <div className="semester-section">
          <h3>Semester 3 (S3)</h3>
            <div className="notes-container">
              <div className="notes-card">Graph Theory</div>
              <div className="notes-card">Computer Organization & Architecture (COA)</div>
              <div className="notes-card">Database Management Systems (DBMS)</div>
              <div className="notes-card">Operating Systems (OS)</div>
              <div className="notes-card">Constitution of India</div>
            </div>
          </div>
          
          {/* Semester 4 */}
          <div className="semester-section">
            <h3>Semester 4 (S4)</h3>
            <div className="notes-container">
              <div className="notes-card">Theory of Computation</div>
              <div className="notes-card">Microprocessors</div>
              <div className="notes-card">Compiler Design</div>
              <div className="notes-card">Computer Networks</div>
              <div className="notes-card">Software Engineering</div>
              <div className="notes-card">Environmental Science</div>
            </div>
          </div>
        </section>

        {/* 3rd Year Notes Section */}
      <section id="third-year" className="notes-section">
        <h2>3rd Year Subjects 📁</h2>
        
        {/* Common Subjects */}
        <div className="semester-section">
          <h3>Common Subjects (S3 & S4)</h3>
          <div className="notes-container">
            <div className="notes-card">Design and Engineering</div>
            <div className="notes-card">Professional Ethics</div>
          </div>
        </div>

        {/* Semester 3 */}
        <div className="semester-section">
          <h3>Semester 3 (S3)</h3>
            <div className="notes-container">
              <div className="notes-card">Graph Theory</div>
              <div className="notes-card">Computer Organization & Architecture (COA)</div>
              <div className="notes-card">Database Management Systems (DBMS)</div>
              <div className="notes-card">Operating Systems (OS)</div>
              <div className="notes-card">Constitution of India</div>
            </div>
          </div>

          {/* Semester 4 */}
          <div className="semester-section">
            <h3>Semester 4 (S4)</h3>
            <div className="notes-container">
              <div className="notes-card">Theory of Computation</div>
              <div className="notes-card">Microprocessors</div>
              <div className="notes-card">Compiler Design</div>
              <div className="notes-card">Computer Networks</div>
              <div className="notes-card">Software Engineering</div>
              <div className="notes-card">Environmental Science</div>
            </div>
          </div>
        </section>

        {/* 4th Year Notes Section */}
<section id="fourth-year" className="notes-section">
  <h2>4th Year Subjects 📁</h2>

  {/* Common Themes */}
  {/* Semester 7*/}
  <div className="semester-section">
    <h3>Semester 7 (S7)</h3>
    <div className="notes-container">
      <div className="notes-card">Coming Soon</div>
      
    </div>
  </div>

  {/* Semester 6 */}
  <div className="semester-section">
    <h3>Semester 8 (S8)</h3>
    <div className="notes-container">
      <div className="notes-card">Coming Soon</div>
    </div>
  </div>
</section>

    </>
  )
}

export default App
