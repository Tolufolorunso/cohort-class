import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
import win32com.client
import os

def update_curriculum():
    docx_path = r'c:\Users\oreofe\Desktop\dzuels\computer class\curriculum\dzuels_curriculum.docx'
    out_docx_path = r'c:\Users\oreofe\Desktop\dzuels\computer class\curriculum\dzuels_curriculum_1.docx'
    out_pdf_path = r'c:\Users\oreofe\Desktop\dzuels\computer class\curriculum\dzuels_curriculum_1.pdf'

    doc = docx.Document(docx_path)

    # -------------------------------------------------------------
    # 1. Update Table of Contents (TOC)
    # -------------------------------------------------------------
    # TOC Paragraphs 19-32
    # Phase 2 TOC
    doc.paragraphs[19].text = "5. Phase 2: INTERMEDIATE (Creative Logic & App Development)"
    doc.paragraphs[20].text = "   - Module 8: Computational Thinking & Algorithmic Logic"
    doc.paragraphs[21].text = "   - Module 9: Scratch Visual Block-based Programming"
    doc.paragraphs[22].text = "   - Module 10: HTML & CSS Web Design & Responsive Layouts"
    doc.paragraphs[23].text = "   - Module 11: Introduction to Artificial Intelligence & Responsible Prompting"
    doc.paragraphs[24].text = "   - Module 12: JavaScript Concepts & Web Logic"
    
    # Check if we need to insert Module 13 into Phase 2 TOC
    # Let's replace P25..P32 carefully
    doc.paragraphs[25].text = "   - Module 13: Mobile App Development (React Native Concepts)"
    doc.paragraphs[26].text = "6. Phase 3: ADVANCED (Specialized Technologies & Futures) - [Status: Yet to Commence / Not Yet Deployed]"
    doc.paragraphs[27].text = "   - Module 14: Python Scripting Language Basics"
    doc.paragraphs[28].text = "   - Module 15: Version Control (Git & GitHub Collaboration)"
    doc.paragraphs[29].text = "   - Module 16: Artificial Intelligence & Responsible Prompting"
    doc.paragraphs[30].text = "   - Module 17: Robotics & Physical Computing (Arduino Framework)"
    doc.paragraphs[31].text = "   - Module 18: Digital Creativity (Graphic Design & Basic Media Editing)"
    doc.paragraphs[32].text = "   - Module 19: Cybersecurity & Digital Hygiene Basics"
    
    # We can update P33 to add Module 20 or adjust line
    # Let's check P33..P46
    # We will insert Module 20 in TOC and Appendix L in TOC
    if "Module 19: Career Pathways" not in doc.paragraphs[33].text:
        # insert or set text
        p_extra = doc.paragraphs[33]
        p_extra.text = "   - Module 20: Career Pathways & Next Steps"
        # Shift 7. Sample Lesson Plans down
        doc.paragraphs[34].text = "7. Sample Lesson Plans"
        doc.paragraphs[35].text = "8. Recommended Resources & Free Software"
        doc.paragraphs[36].text = "9. Appendices & Classroom Templates"
        doc.paragraphs[37].text = "   - Appendix A: Glossary of Core Computer Science Terms"
        doc.paragraphs[38].text = "   - Appendix B: Essential Keyboard Shortcuts Cheatsheet"
        doc.paragraphs[39].text = "   - Appendix C: Computer Laboratory Rules Poster"
        doc.paragraphs[40].text = "   - Appendix D: Internet Safety & Cybersecurity Rules"
        doc.paragraphs[41].text = "   - Appendix E: Digital Citizenship Pledge"
        doc.paragraphs[42].text = "   - Appendix F: Student Progress Tracking Template"
        doc.paragraphs[43].text = "   - Appendix G: Laboratory Attendance Log Template"
        doc.paragraphs[44].text = "   - Appendix H: Rubric Grading Template"
        doc.paragraphs[45].text = "   - Appendix I: Project Evaluation Template"
        doc.paragraphs[46].text = "   - Appendix J: Sample Certificate of Completion Structure"
        
        # Let's add Appendix K and Appendix L in TOC
        # Let's inspect P47
        doc.paragraphs[47].text = "   - Appendix K: Dzuels Foundation Contact Information\n   - Appendix L: Phase 3 (Advanced) Deployment Status & Implementation Notice"

    # -------------------------------------------------------------
    # 2. Update Phase 2 Overview Text & Tables
    # -------------------------------------------------------------
    doc.paragraphs[567].text = (
        "Phase 2 spans 16 weeks, representing 32 lessons of 45 minutes each. It bridges the gap between basic literacy "
        "and advanced technology. The curriculum starts with language-independent logic (Algorithms & Flowcharts), visualizes "
        "these concepts using Scratch, moves into visual web structure with HTML & CSS Web Design, and introduces artificial "
        "intelligence and responsible prompting. Students then learn client-side web logic using JavaScript before finalizing "
        "with a hands-on introduction to mobile app interfaces. Projects are central to Phase 2: students build games, responsive web pages, "
        "and mobile screen layouts to develop practical digital skills."
    )

    doc.paragraphs[572].text = "Write, style, and structure clean HTML5 web pages and CSS responsive layouts."
    doc.paragraphs[574].text = "Understand basic Artificial Intelligence concepts and write clear, responsible prompts for study helpers."

    doc.paragraphs[579].text = "Students design and style responsive personal web pages using semantic HTML5 and CSS."
    doc.paragraphs[581].text = "Students write basic prompts to AI study tools and verify the responses using their textbooks."

    doc.paragraphs[587].text = "Semantic HTML5 web layout construction and CSS styling"
    doc.paragraphs[589].text = "Basic AI prompting techniques and textbook fact-checking"

    doc.paragraphs[606].text = "HTML & CSS Web Page Builder: Writing clean HTML tags and linking a CSS file to style colors and fonts."
    doc.paragraphs[607].text = "AI Helper & Fact-Checker: Writing simple prompts to an AI assistant and cross-checking answers with class notes."

    doc.paragraphs[612].text = "Responsive Portfolio Web Layout: Coding an HTML page with a styled header, bio, and project links using CSS."
    doc.paragraphs[613].text = "AI Safety Poster & Prompt Log: Writing a simple prompt log and designing a 3-rule poster for safe AI usage."

    doc.paragraphs[616].text = (
        "Individual Project:\n"
        "The HTML & CSS Responsive Personal Webpage: Students design and code a personal web page from scratch using semantic HTML5 "
        "and external CSS stylesheets. The page must include a structured header, an 'About Me' section, a list of student interests, "
        "and styled buttons. Students use CSS flexbox to ensure the webpage layout looks clean on both computer monitors and mobile phone viewports."
    )

    doc.paragraphs[621].text = "Computers (minimum 2GB RAM) with web browsers (Chrome/Firefox) and VS Code or Notepad++ installed"

    # Update Table 3 (Phase 2 Weekly Schedule)
    t3 = doc.tables[3]
    # Rows in Table 3: 6 rows (Header + 5 rows originally). Let's make it 7 rows (Header + 6 modules)
    # Let's inspect rows of Table 3
    if len(t3.rows) == 6:
        # Add 1 row
        t3.add_row()

    t3.rows[1].cells[0].text = "17-18"
    t3.rows[1].cells[1].text = "Module 8: Computational Thinking & Algorithmic Logic"
    t3.rows[1].cells[2].text = "Decomposition, pattern recognition, flowcharting, pseudocode, debugging strategies."

    t3.rows[2].cells[0].text = "19-21"
    t3.rows[2].cells[1].text = "Module 9: Scratch Visual Programming"
    t3.rows[2].cells[2].text = "Sprites, blocks, motions, variables, loop control, conditionals, broadcast events, game creation."

    t3.rows[3].cells[0].text = "22-25"
    t3.rows[3].cells[1].text = "Module 10: HTML & CSS Web Design & Responsive Layouts"
    t3.rows[3].cells[2].text = "Semantic HTML5, CSS selectors, colors, margins, padding, Flexbox, media queries, mobile responsiveness."

    t3.rows[4].cells[0].text = "26-27"
    t3.rows[4].cells[1].text = "Module 11: Introduction to Artificial Intelligence & Responsible Prompting"
    t3.rows[4].cells[2].text = "What is AI, everyday AI examples, simple prompt writing, study helpers, checking facts with books, safety & privacy rules."

    t3.rows[5].cells[0].text = "28-30"
    t3.rows[5].cells[1].text = "Module 12: JavaScript Concepts & Web Logic"
    t3.rows[5].cells[2].text = "Syntax, variables, loops, browser events, DOM selection, simple web manipulations."

    t3.rows[6].cells[0].text = "31-32"
    t3.rows[6].cells[1].text = "Module 13: Mobile App Development (React Native Intro)"
    t3.rows[6].cells[2].text = "React Native structures, component design (Text, View, Image), mock apps (Notes, Calculator, Quiz)."

    # Update Table 5 (Phase 2 Rubric)
    t5 = doc.tables[5]
    if len(t5.rows) == 6:
        t5.add_row()

    t5.rows[1].cells[0].text = "Algorithmic Logic"
    t5.rows[2].cells[0].text = "Scratch Coding"
    
    t5.rows[3].cells[0].text = "Web Design (HTML/CSS)"
    t5.rows[3].cells[1].text = "Semantic structures; layout is responsive on phone and PC; clean CSS styles."
    t5.rows[3].cells[2].text = "Functional structures; layout responds with minor defects on small screens."
    t5.rows[3].cells[3].text = "Basic layout styling; page layout breaks on small mobile viewports."
    t5.rows[3].cells[4].text = "Cannot write basic CSS layout or HTML structure."

    t5.rows[4].cells[0].text = "Intro to AI & Prompting"
    t5.rows[4].cells[1].text = "Asks clear prompts; uses AI safely as a study helper; verifies all facts with books."
    t5.rows[4].cells[2].text = "Writes good prompts; checks most facts; understands privacy rules."
    t5.rows[4].cells[3].text = "Uses AI simple search; relies on AI output without checking books."
    t5.rows[4].cells[4].text = "Cannot construct clear prompts or follow safety rules."

    t5.rows[5].cells[0].text = "JS & DOM Basics"
    t5.rows[6].cells[0].text = "Mobile App Concepts"

    # Update Exam Structure for Phase 2
    doc.paragraphs[636].text = (
        "Phase 2 Final Examination Structure:\n"
        "Part A: Concept Check (20 Marks)\n"
        "- 10 Multiple Choice Questions (algorithms, visual blocks, HTML tags, AI rules, JavaScript events)\n"
        "- 5 Code/Markup Matching Questions (matching HTML tags and CSS properties to page effects)\n"
        "- 5 Short Answer Questions (Explain why AI facts must be checked with textbooks)\n\n"
        "Part B: Practical (80 Marks)\n"
        "- Task 1: Computational Logic (15 Marks): Create a detailed flowchart for an automated quiz game.\n"
        "- Task 2: HTML & CSS Web Design (35 Marks): Code a responsive personal bio page with a styled header, image box, and bio paragraph using CSS.\n"
        "- Task 3: AI Prompting & Fact Verification (15 Marks): Write a 3-part structured prompt for an AI study tutor and document how you verified the answer.\n"
        "- Task 4: JavaScript DOM Event (15 Marks): Write HTML and JavaScript code where clicking a button toggles page text color."
    )

    # -------------------------------------------------------------
    # 3. Update Phase 3 Overview & Add Sub-heading, Footnote
    # -------------------------------------------------------------
    # P917: Heading 1: 6. Phase 3: ADVANCED (Specialized Technologies & Futures)
    doc.paragraphs[917].text = "6. Phase 3: ADVANCED (Specialized Technologies & Futures)"
    
    # P918: Heading 2: Sub-heading notice for Boss directive
    doc.paragraphs[918].text = "STATUS SUB-HEADING: PHASE 3 (ADVANCED) TRAINING IS YET TO COMMENCE / NOT YET DEPLOYED"
    
    # P919: Intro text
    doc.paragraphs[919].text = (
        "IMPORTANT NOTICE: Dzuels Foundation has not yet started or deployed training for Phase 3 (Advanced Specialized "
        "Technologies & Futures). This phase outlines planned future learning modules (Python Scripting Language Basics, "
        "Version Control with Git & GitHub, Advanced Artificial Intelligence & Responsible Prompting, Robotics & Physical Computing, "
        "Digital Creativity & Media, Cybersecurity & Digital Hygiene Basics, and Career Pathways & Next Steps). It is included in this "
        "curriculum handbook for future reference and roadmap planning only, and is not subject to current institutional assessment or audit.\n\n"
        "Welcome to Phase 3 (ADVANCED) of the Digital Literacy & Computer Education Programme. When launched, this final phase will transition "
        "students into professional software tools, text-based programming, hardware engineering, and technology career pathways."
    )

    doc.paragraphs[921].text = (
        "Phase 3 spans 22 weeks, representing 44 lessons of 45 minutes each. It covers advanced, real-world topics including "
        "Python text-based programming, version control with Git and GitHub, advanced AI prompt engineering, physical robotics with Arduino, "
        "digital media creation, cybersecurity, and career mapping. Every module focuses on real-world practical applications."
    )

    # Objectives & Core Skills update in Phase 3
    doc.paragraphs[924].text = "Write, test, and debug clean Python scripts utilizing loops, functions, lists, and file operations."
    doc.paragraphs[933].text = "Students write working Python console tools and publish code projects on GitHub."
    doc.paragraphs[942].text = "Python text-based programming and script execution"

    doc.paragraphs[961].text = "Classroom Activities (Pending Phase 3 Commencement):"
    doc.paragraphs[962].text = "Python Console Challenge: Writing a Python script to calculate math formulas and process student lists."
    doc.paragraphs[968].text = "Python & Git Portfolio Project: Developing a Python script and tracking changes using Git commits."

    doc.paragraphs[974].text = (
        "Individual Project (Pending Future Phase 3 Rollout):\n"
        "The Python Scripting & GitHub Repository Project: Students design and code a Python console application from scratch. "
        "The project requires the student to use variables, loops, functions, and standard input/output models. Students track their project "
        "using Git, commit changes regularly, and publish the repository to GitHub."
    )

    # Footnote under Phase 3 overview (P998)
    doc.paragraphs[998].text = (
        "* Footnote: Phase 3 (Advanced Specialized Technologies & Futures) training is currently pending deployment and has not yet commenced. "
        "Training for Modules 14 through 20 has not started, and these modules are excluded from current institutional evaluation and student assessment."
    )

    # Update Table 6 (Phase 3 Weekly Schedule)
    t6 = doc.tables[6]
    # Header + 7 rows
    t6.rows[1].cells[0].text = "1-4"
    t6.rows[1].cells[1].text = "Module 14: Python Scripting Language Basics"
    t6.rows[1].cells[2].text = "Variables, data types, operators, if-else logic, while/for loops, functions, lists, dictionaries, projects."

    t6.rows[2].cells[0].text = "5-7"
    t6.rows[2].cells[1].text = "Module 15: Version Control (Git & GitHub Collaboration)"
    t6.rows[2].cells[2].text = "Local vs. remote repos, commits, staging, push/pull, cloning, branching, conflict resolution, GitHub Pages."

    t6.rows[3].cells[0].text = "8-10"
    t6.rows[3].cells[1].text = "Module 16: Artificial Intelligence & Responsible Prompting"
    t6.rows[3].cells[2].text = "LLMs, prompt engineering role-task-context-format, productivity, hallucinations, AI ethics, citation verification."

    t6.rows[4].cells[0].text = "11-13"
    t6.rows[4].cells[1].text = "Module 17: Robotics & Physical Computing"
    t6.rows[4].cells[2].text = "Arduino introduction, sensors, circuits, LEDs, breadboards, programming loops, budget hardware notes."

    t6.rows[5].cells[0].text = "14-16"
    t6.rows[5].cells[1].text = "Module 18: Digital Creativity & Media"
    t6.rows[5].cells[2].text = "Canva layout basics, graphic styling, audio editing, video timelines, compiling video/audio assets."

    t6.rows[6].cells[0].text = "17-19"
    t6.rows[6].cells[1].text = "Module 19: Cybersecurity & Digital Hygiene Basics"
    t6.rows[6].cells[2].text = "Viruses, malware, ransomware, phishing vectors, social engineering, encryption basics, password managers."

    t6.rows[7].cells[0].text = "20-22"
    t6.rows[7].cells[1].text = "Module 20: Career Pathways & Next Steps"
    t6.rows[7].cells[2].text = "Skills and educational pathways for 12 core tech careers, CV drafting, portfolio compiling, final wrap-up."

    # Update Table 8 (Phase 3 Rubric)
    t8 = doc.tables[8]
    if len(t8.rows) == 6:
        t8.add_row()

    t8.rows[1].cells[0].text = "Python Scripting"
    t8.rows[1].cells[1].text = "Writes clean Python code; uses correct indentation, functions, loops, lists."
    t8.rows[1].cells[2].text = "Writes working Python scripts; minor syntax or indentation errors."
    t8.rows[1].cells[3].text = "Struggles with loops or functions; code crashes frequently."
    t8.rows[1].cells[4].text = "Cannot write basic syntax-correct Python code."

    t8.rows[2].cells[0].text = "Git & GitHub Usage"
    t8.rows[3].cells[0].text = "Advanced AI & Prompting"
    t8.rows[4].cells[0].text = "Robotics & Circuits"
    t8.rows[5].cells[0].text = "Cybersecurity Basics"

    t8.rows[6].cells[0].text = "Career & Portfolio"
    t8.rows[6].cells[1].text = "Presents complete career roadmap and structured project portfolio."
    t8.rows[6].cells[2].text = "Presents good career plan with minor portfolio gaps."
    t8.rows[6].cells[3].text = "Basic career interest list; incomplete portfolio."
    t8.rows[6].cells[4].text = "Cannot outline career goals or assemble portfolio."

    # -------------------------------------------------------------
    # 4. Rearrange / Update Detailed Module Sections
    # -------------------------------------------------------------
    # Rename Module 13 -> Module 10 in Phase 2
    doc.paragraphs[999].text = "Module 10: HTML & CSS Web Design & Responsive Layouts"
    
    # Rename Module 10 (Python) -> Module 14 in Phase 3
    doc.paragraphs[750].text = "Module 14: Python Scripting Language Basics"

    # Rename Phase 2 Modules
    doc.paragraphs[808].text = "Module 12: JavaScript Concepts & Web Logic"
    doc.paragraphs[862].text = "Module 13: Mobile App Development (React Native Intro)"

    # Insert Module 11 (Introduction to Artificial Intelligence & Responsible Prompting) before Module 12
    # We can edit paragraph around P807 or P808
    # Let's inspect P807
    p_mod11_heading = doc.paragraphs[807]
    p_mod11_heading.text = (
        "\n\nModule 11: Introduction to Artificial Intelligence & Responsible Prompting\n"
        "Module Overview:\n"
        "This foundational module introduces secondary school students to basic concepts of Artificial Intelligence (AI) and simple, "
        "responsible prompt writing. It helps students understand what AI is in everyday life (smart assistants, chatbots, search helpers), "
        "how to talk to AI tools in simple English, basic rules for asking clear questions, and why it is important to always check answers "
        "against textbooks and class notes. This module prepares students for the advanced prompt engineering and ethical analysis taught in Phase 3.\n\n"
        "Estimated Duration: 2 Weeks (4 Lessons)\n\n"
        "Lesson Objectives & Learning Outcomes:\n"
        "Objectives:\n"
        "- Explain what Artificial Intelligence (AI) is using simple everyday examples.\n"
        "- Ask simple, clear questions (prompts) to AI study helpers.\n"
        "- Understand that AI can make mistakes and needs human verification.\n"
        "- Practice basic safety rules when using AI (never share passwords or private information).\n\n"
        "Expected Learning Outcomes:\n"
        "- Students define AI as computer systems trained to process information and answer questions.\n"
        "- Students write basic, clear prompts containing a simple question and clear instruction.\n"
        "- Students check AI responses using their class notes or textbooks.\n"
        "- Students explain why personal privacy matters when using AI online.\n\n"
        "Topics Covered:\n"
        "- What is AI? Simple examples in daily life (chatbots, voice assistants, spell checkers).\n"
        "- Basic prompting: How to ask clear questions and give simple instructions.\n"
        "- Checking AI answers: Why AI isn't always right and how to cross-check with books.\n"
        "- Responsible AI use: Safety, privacy, honesty, and avoiding copying/plagiarism.\n\n"
        "Classroom & Hands-on Activities:\n"
        "- AI Helper Demo: Teacher shows asking simple questions to an AI helper and reviewing the answers.\n"
        "- Ask & Check Pair Exercise: Students write a question for an AI, read the answer, and check it against their textbook.\n"
        "- Poster Activity: Draw a simple poster listing 3 rules for safe and honest AI use.\n\n"
        "Teacher Guide & Notes:\n"
        "Keep explanations simple and non-technical. Focus on curiosity, clear questioning, and verification. Remind students that AI is a study helper, not a replacement for thinking.\n\n"
        "Exercises & Review Questions:\n"
        "- Fill in the blanks matching prompt rules with good question examples.\n"
        "- Why should you never enter your home address or passwords into an AI tool?\n\n"
        "Projects & Assessments:\n"
        "Mini Project: Create a 'My First AI Study Guide' with 3 simple prompts and verified facts.\n\n"
        "Required Materials:\n"
        "Computers with internet access, classroom board, textbook, simple fact-check worksheets.\n"
    )

    # Rename Phase 3 Modules (Modules 14..19 -> Modules 15..20)
    doc.paragraphs[1053].text = "Module 15: Version Control (Git & GitHub Collaboration)"
    doc.paragraphs[1108].text = "Module 16: Artificial Intelligence & Responsible Prompting"
    doc.paragraphs[1163].text = "Module 17: Robotics & Physical Computing"
    doc.paragraphs[1218].text = "Module 18: Digital Creativity & Media"
    doc.paragraphs[1272].text = "Module 19: Cybersecurity & Digital Hygiene Basics"
    doc.paragraphs[1327].text = "Module 20: Career Pathways & Next Steps"

    # -------------------------------------------------------------
    # 5. Update Sample Lesson Plans
    # -------------------------------------------------------------
    # Lesson Plan 3: Python (P1415)
    doc.paragraphs[1415].text = "Phase Context: Phase 3: Advanced (Yet to Commence) | Duration: 45 Minutes"
    
    # Lesson Plan 4: HTML & CSS (P1430)
    doc.paragraphs[1430].text = "Phase Context: Phase 2: Intermediate | Duration: 45 Minutes"

    # Lesson Plan 5: Prompting (P1445)
    doc.paragraphs[1445].text = "Phase Context: Phase 3: Advanced (Yet to Commence) | Duration: 45 Minutes"

    # -------------------------------------------------------------
    # 6. Update Section 9 Appendices & Add Appendix L
    # -------------------------------------------------------------
    # Table 12 (Student Progress Tracking) Phase 3 status
    t12 = doc.tables[12]
    t12.rows[1].cells[3].text = "Pending (Yet to Commence)"
    t12.rows[2].cells[3].text = "Pending (Yet to Commence)"
    t12.rows[3].cells[3].text = "[Pending / Yet to Commence]"

    # Table 15 (Project Evaluation)
    t15 = doc.tables[15]
    t15.rows[2].cells[0].text = "Phase 2: HTML Portfolio"

    # Add Appendix L at the end of the document
    p_last = doc.paragraphs[-1]
    p_last.text += (
        "\n\n=========================================================================\n"
        "Appendix L: Phase 3 (Advanced) Deployment Status & Implementation Notice\n"
        "=========================================================================\n\n"
        "1. Document Purpose & Administrative Context:\n"
        "This appendix serves as the official administrative notice regarding the operational deployment status of Phase 3 "
        "(ADVANCED: Specialized Technologies & Futures) of the Dzuels Foundation Digital Literacy & Computer Education Programme.\n\n"
        "2. Current Operational Implementation Status:\n"
        "- Phase 1 (BASIC: Foundational Literacy): Fully Deployed & Active in Classrooms.\n"
        "- Phase 2 (INTERMEDIATE: Creative Logic & App Development): Fully Deployed & Active in Classrooms.\n"
        "- Phase 3 (ADVANCED: Specialized Technologies & Futures): YET TO COMMENCE / NOT YET DEPLOYED.\n\n"
        "3. Scope of Phase 3 Modules Pending Deployment:\n"
        "Phase 3 comprises Modules 14 through 20:\n"
        "  - Module 14: Python Scripting Language Basics\n"
        "  - Module 15: Version Control (Git & GitHub Collaboration)\n"
        "  - Module 16: Artificial Intelligence & Responsible Prompting\n"
        "  - Module 17: Robotics & Physical Computing (Arduino Framework)\n"
        "  - Module 18: Digital Creativity & Media (Graphic Design & Editing)\n"
        "  - Module 19: Cybersecurity & Digital Hygiene Basics\n"
        "  - Module 20: Career Pathways & Next Steps\n\n"
        "4. Assessment & Institutional Audit Guidance:\n"
        "For quality assurance inspections, school board reviews, and external academic evaluations:\n"
        "  - Dzuels Foundation facilitators, participating schools, and students shall be assessed solely on the delivery and "
        "mastery of Phase 1 (Basic) and Phase 2 (Intermediate) content.\n"
        "  - Phase 3 modules are included in this curriculum handbook strictly to document the planned multi-year progression roadmap.\n"
        "  - Until Phase 3 training is officially launched and deployed, no student or school center shall be evaluated or penalized "
        "on Phase 3 subject matter.\n"
    )

    # Save to dzuels_curriculum_1.docx
    doc.save(out_docx_path)
    print("Successfully created dzuels_curriculum_1.docx!")

    # -------------------------------------------------------------
    # 7. Convert dzuels_curriculum_1.docx to dzuels_curriculum_1.pdf using Word COM
    # -------------------------------------------------------------
    print("Converting dzuels_curriculum_1.docx to dzuels_curriculum_1.pdf via MS Word...")
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False
    
    doc_com = word.Documents.Open(os.path.abspath(out_docx_path))
    # 17 = wdFormatPDF
    doc_com.SaveAs(os.path.abspath(out_pdf_path), FileFormat=17)
    doc_com.Close()
    word.Quit()

    print("Successfully created dzuels_curriculum_1.pdf!")

if __name__ == '__main__':
    update_curriculum()
