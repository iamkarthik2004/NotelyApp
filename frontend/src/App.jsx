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

  {/* Common Themes */}
  <div className="semester-section">
    <h3>Common Themes (S5 & S6)</h3>
    <div className="notes-container">
      <div className="notes-card">Core Computing Subjects</div>
      <div className="notes-card">Project & Assessment Work</div>
      <div className="notes-card">Managerial / Soft Skills Subjects</div>
    </div>
  </div>

  {/* Semester 5 */}
  <div className="semester-section">
    <h3>Semester 5 (S5)</h3>
    <div className="notes-container">
      <div className="notes-card">Formal Languages and Automata Theory (CST301)</div>
      <div className="notes-card">Computer Networks (CST303)</div>
      <div className="notes-card">System Software (CST305)</div>
      <div className="notes-card">Microprocessors and Microcontrollers (CST307)</div>
      <div className="notes-card">Management of Software Systems (CST309)</div>
      <div className="notes-card">Disaster Management (MCN301)</div>
      <div className="notes-card">System Software and Microprocessors Lab (CSL331)</div>
      <div className="notes-card">Database Management Systems Lab (CSL333)</div>
      <div className="notes-card">Remedial/Minor/Honors Course - VAC (S5)</div>
    </div>
  </div>

  {/* Semester 6 */}
  <div className="semester-section">
    <h3>Semester 6 (S6)</h3>
    <div className="notes-container">
      <div className="notes-card">Compiler Design (CST302)</div>
      <div className="notes-card">Computer Graphics and Image Processing (CST304)</div>
      <div className="notes-card">Algorithm Analysis and Design (CST306)</div>
      <div className="notes-card">Elective - I</div>
      <div className="notes-card">Industrial Economics and Foreign Trade (HUT300)</div>
      <div className="notes-card">Comprehensive Course Work (CST308)</div>
      <div className="notes-card">Networking Lab (CSL332)</div>
      <div className="notes-card">Miniproject (CSD334)</div>
      <div className="notes-card">Remedial/Minor/Honors Course - VAC (S6)</div>
    </div>
  </div>
</section>






    </>
  )
}

export default App
