# Resume Analyzer Documentation

### Overview
The Resume Analyzer tool allows users to upload their resumes and job descriptions to receive personalized feedback on how well the resume matches the job description. It calculates a "match score," identifies keywords found in the resume, lists missing skills, and suggests improvements. Additionally, the user can download an optimized resume as a PDF.

### Usage
1. Download [`resume.pdf`](https://github.com/Espacio-root/Resume-Analyser/blob/master/resume.pdf) from this repository.
2. Copy the following text and paste it under "Job Description"
```
    Childcare Program Coordinator

    Job Summary:
    Seeking a dedicated and experienced professional to manage and coordinate childcare and special needs programs. The ideal candidate will have a strong background in early childhood development, with experience in managing staff, coordinating activities, and assisting families with specialized needs.

    Key Responsibilities:

        Develop and oversee daily programs and activities for children, including special needs clients.
        Coordinate service assignments for counselors and ensure effective client-family interactions.
        Manage volunteer staff and provide support to educators in classroom environments.
        Assist families in accessing financial and healthcare resources for special needs care.
        Maintain detailed client records and databases, ensuring regular communication with healthcare professionals.
        Plan and implement outings and special events tailored to client needs.

    Qualifications:

        Bachelor’s degree in Early Childhood Development, Elementary Education, or a related field.
        Minimum of 3-4 years of experience in childcare or special needs care management.
        Strong organizational and leadership skills, with experience supervising teams.
        Excellent communication and interpersonal skills to work with families, staff, and external professionals.
        Proficiency in maintaining client records and coordinating multi-agency support.

    Preferred Qualifications:

        Experience working in counseling or client management roles.
        Demonstrated ability to manage a diverse group of clients and staff.
        Familiarity with financial aid and healthcare resources for special needs families.

    Work Environment:
    This role requires the ability to work in both office and classroom settings and may involve occasional evening or weekend hours for special events or family meetings.
```
3. Click on "Analyze Resume"
4. Optionally, download the optimized resume as pdf.

### How it works?
1. Uploading Resume:

    The user uploads a resume (PDF, DOC, DOCX format) by either dragging and dropping the file or selecting it from the file input. The content of the resume is extracted and stored.

2. Inputting Job Description:

    The user pastes the job description in a text box.

3. Analyzing Resume:

    Upon clicking the "Analyze Resume" button, the content of the resume and job description is sent to the Google Generative AI model for analysis.

4. Displaying Results:

    The analysis results include:
        Match Score
        Keywords Found and Missing
        Suggested Improvements
    These results are displayed in a results section.

5. Downloading Optimized Resume:

    The user can download an optimized resume with improvements suggested by the AI. The optimized resume is converted to a PDF file.
