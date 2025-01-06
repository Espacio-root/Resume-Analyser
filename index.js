import { GoogleGenerativeAI } from 'https://cdn.skypack.dev/@google/generative-ai';

// DOM Elements
const dropZone = document.getElementById('dropZone')
const fileInput = document.getElementById('fileInput')
const descriptionInput = document.getElementById('jobDescription')
const analyzeBtn = document.getElementById('analyzeBtn')
const loadingSection = document.getElementById('loading')
const resultsSection = document.getElementById('results')
const matchScore = document.getElementById('matchScore')
const keywordsFound = document.getElementById('keywordsFound')
const missingSkills = document.getElementById('missingSkills')
const improvementsList = document.getElementById('improvementsList')
const downloadBtn = document.getElementById('downloadBtn')

const genAI = new GoogleGenerativeAI("AIzaSyCg1LHlrp-WRB96WaZ-xDfnTU4t8DE-Yxc");

// Mock data for demonstration
let resumeContent = ''
let jobDescContent = ''

// Event Listeners
dropZone.addEventListener('click', () => fileInput.click())
dropZone.addEventListener('dragover', handleDragOver)
dropZone.addEventListener('dragleave', handleDragLeave)
dropZone.addEventListener('drop', handleDrop)
fileInput.addEventListener('change', handleFileSelect)
descriptionInput.addEventListener('input', handleDescription)
analyzeBtn.addEventListener('click', analyzeResume)
downloadBtn.addEventListener('click', downloadOptimizedResume)


function handleDescription(e) {
    jobDescContent = e.target.value
}

// Drag and Drop Handlers
function handleDragOver(e) {
    e.preventDefault()
    dropZone.classList.add('dragover')
}

function handleDragLeave(e) {
    e.preventDefault()
    dropZone.classList.remove('dragover')
}

function handleDrop(e) {
    e.preventDefault()
    dropZone.classList.remove('dragover')

    const files = e.dataTransfer.files
    if (files.length) {
        handleFile(files[0])
    }
}

function handleFileSelect(e) {
    const files = e.target.files
    if (files.length) {
        handleFile(files[0])
    }
}

// Function to load and parse PDF files
function handleFile(file) {
    if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const pdfData = new Uint8Array(e.target.result);

            try {
                // Load the PDF document
                const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

                let content = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item) => item.str).join(" ");
                    content += pageText + "\n";
                }
                resumeContent = content;

                dropZone.innerHTML = `<p>File loaded: ${file.name}</p>`;
            } catch (error) {
                console.error("Error reading PDF file:", error);
                dropZone.innerHTML = `<p>Failed to load PDF file.</p>`;
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        dropZone.innerHTML = `<p>Unsupported file type: ${file.name}</p>`;
    }
}

// Analysis Functions
async function analyzeResume() {
    if (!resumeContent || !jobDescContent) {
        console.log(resumeContent)
        alert('Please upload a resume and provide a job description')
        return
    }

    loadingSection.style.display = 'block'
    resultsSection.style.display = 'none'

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
        })
        const prompt = `Analyze this resume and job description. Provide output in the following JSON format:
        {
            "matchScore": <number 0-100>,
            "keywordsFound": {
                "found": <number>,
                "total": <number>
            },
            "missingSkills": <number>,
            "improvements": [<array of 3 specific improvements>],
            "optimizedResume": <rewritten resume text>
        }

        Resume:
        ${resumeContent}

        Job Description:
        ${jobDescContent}`

        const result = await model.generateContent(prompt)

        let responseText = result.response.text();
        // const responseText = '```json\n{"matchScore": 100, "keywordsFound": {"found": 10, "total": 20}}'
        let jsonString = responseText.split('{').slice(1).join('{').split('}').slice(0, -1).join('}');
        const analysis = JSON.parse('{' + jsonString + '}');

        displayResults(analysis)
    } catch (error) {
        console.error('Analysis failed:', error)
        alert('Analysis failed. Please try again.')
    } finally {
        loadingSection.style.display = 'none'
    }
}

function displayResults(analysis) {
    matchScore.textContent = `${analysis.matchScore}%`
    keywordsFound.textContent = `${analysis.keywordsFound.found}/${analysis.keywordsFound.total}`
    missingSkills.textContent = analysis.missingSkills

    improvementsList.innerHTML = analysis.improvements
        .map(
            (improvement) => `
            <div class="improvement-item">
                <p>${improvement}</p>
            </div>
        `,
        )
        .join('')

    // Store optimized resume for download
    window.optimizedResumeContent = analysis.optimizedResume
    resultsSection.style.display = 'block'
}

function downloadOptimizedResume() {
    const htmlContent = marked.parse(window.optimizedResumeContent)

    const { jsPDF } = window.jspdf
    const pdf = new jsPDF('p', 'pt', 'a4')

    const sanitizedHtml = DOMPurify.sanitize(htmlContent)
    const finalHtml = `<div style="width:600px">${sanitizedHtml}</div>`
    console.log(finalHtml)
    pdf.html(finalHtml, {
        callback: function(doc) {
            doc.save('optimized-resume.pdf')
        },
        x: 20,
        y: 20,
        width: 190,
    })
}
